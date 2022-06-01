$.urlParam = function(name){
  var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (!results) { return 0; }
  return decodeURIComponent(results[1]).replace(/\+/g, ' ') || 0;
}

function getKeymanWeb() {
  if(window.tavultesoft) {
    return window.tavultesoft.keymanweb;
  }
  return keyman;
}

//
// If we detect a rewrite of /go/<lang>/<keyboard>, remap that to the new #-based model.
// This will force a reload so the /return/ statement isn't really necessary...
//

function setCookie(c_name,value,exdays){
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}

var locationmatch = location.pathname.match(/^\/go\/([^/]+)\/([^/]+)/);
if(locationmatch) {

  location.href = '/#'+locationmatch[1]+',Keyboard_'+locationmatch[2];
}

// Perform all page-load init that is NOT dependent on KeymanWeb.
// That script may not load in time for this method.
$(document).ready(function() {
  // Font size function
  $( "#slider" ).slider({
      value:16,
      min: 10,
      max: 132,
      step: 2,
      slide: function( event, ui ) {
        $('#message').css('font-size',ui.value);
        $('#message').focus();
      }
  });

  var font = document.getElementById('font');
  var fontIncrease = document.getElementById('mobile-increase');
  var fontDecrease = document.getElementById('mobile-decrease');

  font.addEventListener('touchstart', function(event) {
    $('#mobile-font').show();
    $('#twitter,#search').css('visibility','hidden');
    var r = setTimeout(function(){
      $('#mobile-font').hide();
      setTimeout(function(){
	      $('#twitter,#search').css('visibility','visible');
      },1000);
    },3000);
    var size = Number($('#mobile-font-size1').val());

    fontIncrease.addEventListener('touchstart', function(event) {
      clearInterval(r);
      size = size * 1.2;
      $('#mobile-font-size1').val(size);
      $('textarea').css('font-size',size);
      $('.keymanweb-input').css('font-size',size).focus();
      r = setTimeout(function(){
        $('#mobile-font').hide();
        setTimeout(function(){
          $('#twitter,#search').css('visibility','visible');
        },600);
      },2000);
    });

    fontDecrease.addEventListener('touchstart', function(event) {
      clearInterval(r);
      size = size / 1.2;
      $('#mobile-font-size1').val(size);
      $('textarea').css('font-size',size);
      $('.keymanweb-input').css('font-size',size).focus();
      r = setTimeout(function(){
        $('#mobile-font').hide();
        setTimeout(function(){
          $('#twitter,#search').css('visibility','visible');
        },600);
      },2000);
    });

  });

  setTimeout(function(){
    $('.kmw_button_a').click(function(){
      if ($(this).parent().attr('id') == 'kmw_btn_off') {
        //$('body').removeClass('osk-always-visible');
        $('#message').blur();
      } else {
        //$('body').addClass('osk-always-visible');
      }
    });
  },5000);


  /* Setup the bookmarklet */
  $('#bookmarklet div a').click( function() {
	  alert("Don't click this: drag it to your Bookmarks toolbar.  Then you can click the '" + $(this).text() + "' bookmark on any web page to access your web keyboard on that page!")
    return false;
  });

  /* Keep a static copy of message length */
  window.lastMessageLength=-1;

  // Detect desktop browser height and modify css
  function updateSize(){
    // Set OSK size/position
    p = new Object();

    var height = $(window).height();
    var width = $(window).width();
    var appPos = $('#app').position();
    var appLeft = appPos.left;

    // We can't proceed any further if KMW hasn't loaded yet.
    // No point handling resizes until that's occurred.
    if(!getKeymanWeb()) {
      return;
    }

    // Adjust the message box height only if a desktop browser
    if(!getKeymanWeb().util.isTouchDevice())
    {
      if (height <= 768) {
        // Hide footer
        $('footer').hide();
        $('#message').css('height', '209px');
        p['height'] = 264;
      }
      if(height > 768) {
        $('#message').css('height', '260px');
        if (height < 820) {
          p['height'] = 246;
          $('footer').hide();
        }else if(height < 860){
          p['height'] = 246;
          $('footer').show();
        }else{
          p['height'] = 264;
          $('footer').show();
        }
      }
    }
    p['top'] = $('#app').offset().top + $('#app').outerHeight() + 8;
    p['left'] = appLeft + 15;
    p['width'] = 710;

    // Update keyboard position and size
    getKeymanWeb().osk.setRect(p);
  }

  window.onresize = updateSize;

  //$('#example').css('height','50px');

  /* Check for result for other modules in the query string */
  var result = $.urlParam('result');
  if(result)
  {
    var module = $.urlParam('module');
    var error = $.urlParam('error');
    var data = $.urlParam('data');
    if(result == 'error')
    {
      showError(module, error, redirectHome);
    }
    else if(result == 'success' && module == 'twitter')
    {
      showTwitterSuccess(data, redirectHome);
    }
    return;
  }

  // Check for twitter message from first time app auth
  if (twitterMessage) {
    $('#message').val(twitterMessage);
  }

  $('#twitter').click(function(event){
    event.preventDefault();
    if($('#twitter').attr('disabled') == 'disabled') return;
    var box = showProgress('Posting your message to your Twitter stream');
    $.getJSON('/lib/twitter-ajax.php', {message: $('#message').val()},
      function(data)
      {
        box.remove();
        $('.messageBox').focus();
        if(data['result'] == 'success') showTwitterSuccess(data['data'], focusMessage);
        else if(data['result'] == 'login') location.href = data['login'];
        else showError('twitter', data['error'], focusMessage);
      });
  });

  $('#search').click(function(event){
    event.preventDefault();
    if($('#search').attr('disabled') == 'disabled') return;
    var newURL='http://www.google.com/search?q='+encodeURIComponent($('#message').val());
    window.open(newURL,'_blank');
    //location.href = 'http://www.google.com/search?q='+encodeURIComponent($('#message').val());
  });

  var copy = document.getElementById('copy');
  var clipboard = new ClipboardJS(copy);
  var isSupported = ClipboardJS.isSupported('copy');
  if (isSupported === false) {
    $('#copy').attr('class', 'linksOff');
    $('#copy').attr('disabled', 'disabled');
    $('#copy').hide();
  }


  clipboard.on('success', function(e) {
    //console.log(e);
    $('#copy').children('p').html('Copied');
    e.clearSelection();
    setTimeout(function(){
        $('#copy').children('p').html('Copy');
    },2000);
  });

  clipboard.on('error', function(e) {
    //console.log(e);
    $('#copy').children('p').html('Copy Failed');
    e.clearSelection();
    setTimeout(function(){
        $('#copy').children('p').html('Copy');
    },2000);
  });

  //Cannot detect change of content from KMW, so use a timer instead to refresh button state
  //$('#message').bind("keypress keyup keydown change click focus blur", refreshButtons);
  window.setInterval(refreshButtons,200);
});

// The KeymanWeb script will have loaded by this point, though initialization may be another matter.
// Promises only started being supported in KMW 13 (keymanapp/keyman#1432), but this site supports
// earlier versions, too, so we can't rely on their presence.
$(window).on("load", function() {
  setTimeout(afterInit, 1000);
});

var afterInitRun = false;
function afterInit() {
  if(afterInitRun) {
    return;
  }
  afterInitRun = true;

  // Focus on message box
  if (!!$('.messageBox').length) {
    getKeymanWeb().moveToElement('message');
  }
  // On touch devices, this is necessary (but not sufficient) for ClipboardJS compatibility.
  // Must take affect AFTER KMW has initialized.
  $('#message').removeAttr('disabled');

  getKeymanWeb().util.attachDOMEvent(window,'orientationchange', function() {
    window.scrollTo(0,1);
  },false);

  //getKeymanWeb().addEventListener('keyboardloaded',function(p){changeKeyboard(p['keyboardName']);});
  getKeymanWeb().addEventListener('keyboardchange',function(p){if(!pageLoading) changeKeyboard(p['internalName'],p['languageCode'],p);});
}

function refreshButtons() {
  var len=getKMWInputLength('message'); // returns -1 for desktop page element

  if(len < 0) {
    len=$('#message').val().length;
  }

  // if message length is 0, use white SM buttons
  if(len == 0) {
    $('#buttons').children('div').attr('class','linksOff');
    $('#buttons div').attr('disabled', 'disabled');
  } else {
    $('#buttons').children('div').attr('class','links');
    $('#buttons div').removeAttr('disabled');
  }

  if(len != lastMessageLength) {
    lastMessageLength = len;

    $('#twitter span').text((140 - len).toString()).toggleClass('long', len > 140);
    $('#twitter span').toggle(len > 0);

    if(len > 140) {
      $('#twitter').attr('disabled', 'disabled');
    }
  }
}

function getKMWInputElement(id){
  var i,len;
  try
  {
    var eList=document.getElementsByClassName('KMW_input');
    if(eList && eList.length > 0)
    {
      for(i=0; i<eList.length; i++)
      {
        if(typeof(eList[i].base) != 'undefined' && eList[i].base.id == id) return eList[i];
      }
    }
  }
  catch(ex){}
  return null;
}

function getKMWInputLength(id)
{
  var el=getKMWInputElement(id);
  if(el == null)
    return -1;
  else if('textContent' in el)
    return el.textContent.length;
  else if('innerText' in el)
    return el.innerText.length;
  else
    return -1;
}

function setKMWInputMessage(id,bShow)
{
  var el=getKMWInputElement(id);
  if(el && bShow)
  {
  }
  else
  {
  }
}

function showError(module, message, callback)
{
  showBox(module, message, callback);
}

function showSuccess(module, message, callback)
{
  showBox(module, message, callback);
}

function showProgress(message)
{
  var box = $('<section class="progressBox box"></section>');
  box.append($('<div></div>').append(message));
  $('body').append(box);
  return box;
}

var boxVisible = false;

function showBox(module, message, callback)
{
  boxVisible = true;
  var box = $('<section class="messageBox box"></section>');
  box.append($('<div></div>').append(message));
  box.append($('<button>').append('OK').click(function() {
    box.remove();
    boxVisible = false;
    if(callback) callback();
    }));
  $('body').append(box);
}

function redirectHome() { location.href = '/'; }

function focusMessage()
{
  $('#desktopMessage').focus();
}

function showFacebookSuccess(data, callback)
{
  if(data)
  {
    showSuccess('facebook', "<p>Your message was successfully posted to your Facebook wall.</p><p><a href='http://www.facebook.com/"+data+"' target='_blank'>View your message on Facebook</a></p>", callback);
  }
  else
    showSuccess('facebook', 'Your message was successfully posted to your Facebook wall', callback);
}

function showTwitterSuccess(data, callback)
{
  if(data && data.match(/^.*\/status\/\d+$/))
  {
    showSuccess('twitter', "<p>Your message was successfully posted to your Twitter stream.</p><p><a href='http://www.twitter.com/"+data+"' target='_blank'>View your tweet</a></p>", callback);
  }
  else
    showSuccess('twitter', 'Your message was successfully posted to your Twitter stream', callback);
}

function getTextLength(s)
{
  var urls = twttr.txt.extractUrls(s);
  var len = s.length;
  for(var i = 0; i < urls.length; i++)
    len = len - urls[i].length + Math.min(urls[i].length, 20);

  return len;
}


/* Keyboard Changed - IE font switching and language example */

function changeKeyboard(kbdname,languageCode,p)
{
  if(kbdname == '') {
    location.replace('#');
    $('#message').attr('placeholder', 'Select a keyboard and start typing');
  } else {
    location.replace('#' + languageCode+','+kbdname);
  }

  if(typeof _gaq != 'undefined')
    _gaq.push(['_trackEvent', 'Keyboard', 'Selecting', languageCode+','+kbdname ]);

  var kbd = getKeymanWeb().getKeyboard(kbdname,languageCode);
  if(kbd) {
    $('#message').attr('placeholder', 'The '+kbd.LanguageName+' keyboard is selected.  Just start typing');
  }
  updateExample(kbdname);
  updateLink(kbdname);
  if (navigator.userAgent.indexOf('Windows') != -1) {
    updateDownload(kbd);
  }else{
    $("#keymandesktop").remove();
  }
  updateBookmarklet(kbd);
  if(typeof(KeyboardChange_EmbedFonts) != 'undefined') KeyboardChange_EmbedFonts(kbdname);
}

function updateBookmarklet(kbd) {
  if(!kbd) {
    $('#bookmarklet').hide();
  } else {
    var oskFontInformation = kbd.OskFont ? encodeURIComponent('&oskFont='+JSON.stringify(kbd.OskFont)) : '';
    var fontInformation = kbd.Font ? encodeURIComponent('&font='+JSON.stringify(kbd.Font)) : '';

    var code =
      "javascript:void((function(){try{var%20e=document.createElement('script');e.type='text/javascript';"+
      "e.src='"+resourceDomain+"/code/bml20.php"+
      "?langid="+encodeURIComponent(kbd.LanguageCode)+
      "&keyboard="+encodeURIComponent(kbd.InternalName.substr('Keyboard_'.length))+
      "&lang="+encodeURIComponent(kbd.LanguageName+' '+kbd.Name)+
      oskFontInformation+
      fontInformation+
      "';document.body.appendChild(e);}catch(v){}})())";
    $('#bookmarklet div a').text(kbd.LanguageName+' Keyboard').attr('href', code);
    $('#bookmarklet div a').unbind('mousedown').bind('mousedown',
      function() {
        if(typeof _gaq != 'undefined')
          _gaq.push(['_trackEvent', 'Bookmarklet', 'Installing', kbd.LanguageCode+','+kbd.Name ]);
      });
    $('#bookmarklet').show();
  }
}

function updateDownload(kbd) {
  if (!kbd) {
    $('#keymandesktop').hide();
  }else{
    var kbdname = kbd.InternalName.substr(9);
    var rex = $('#keyman-desktop-download').attr('href');
    var url = rex + kbdname;
    $('#keyman-desktop-download').attr('href', url);
    $('#keyman-desktop-download').unbind('click').click(function() {
      if(typeof _gaq != 'undefined')
	_gaq.push(['_trackPageview', url]);
    });
    $('#desktop-title').text("Use "+kbd.LanguageName+" Keyboard in any Windows app!");
    $("#keymandesktop").show();
  }
}

function updateLink(kbdname)
{
  var e = document.getElementById('bookmarklink');
  if(e)
  {
    kbdname = kbdname.substr(9);
    var re = /^\/(.+)\/(.+)\.php$/;
    var rex = re.exec(location.pathname);

    if(rex != null)
    {
      if(rex[1] != 'en') var lang = '?lang='+rex[1]; else var lang = '';
      e.href = location.protocol + '//' + location.hostname + '/go/'+activeLanguage+'/'+kbdname+'/'+rex[2]+lang;
    }
  }
}

/* Language Examples AJAX */

var langExamples = [];

function updateExample(kbdname) {
  var keymanExample=document.getElementById("example"),
  exampleBox=document.getElementById("exampleBox");
  if (!keymanExample || !exampleBox) return false;

  if(kbdname == '')
  {
    exampleBox.style.visibility='hidden';
    keymanExample.style.visibility='hidden';
    //keymanExample.innerHTML = 'Select a keyboard from the Keyboard Toolbar above';
    return true;
  }

  exampleBox.style.visibility='visible';
  keymanExample.style.visibility='visible';
  var activeLanguage=getKeymanWeb().getActiveLanguage();
  if(langExamples[activeLanguage + '_' + kbdname])
  {
    keymanExample.innerHTML = langExamples[activeLanguage + '_' + kbdname];
    return true;
  }

  langExamples[activeLanguage + '_' + kbdname] = 'Loading...';

	var xmlhttp;
	if(window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
	else if(window.ActiveXObject) xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
	else return false;

  xmlhttp.onreadystatechange = function()
	{
	  if(xmlhttp.readyState == 4)
	  {
      langExamples[activeLanguage + '_' + kbdname] = keymanExample.innerHTML = xmlhttp.responseText;
	  }
	}
	keymanExample.innerHTML = 'Loading...';
	var link = '//'+demoDomain+'/prog/languageexample.php?keyboard='+kbdname+'&language='+activeLanguage;
	xmlhttp.open('GET', link, true);
	xmlhttp.send(null);

	//keymanExample.style.display = 'block';
	//keymanExample.innerHTML = "Example: To enter <span class='highlightExample'>?????</span>, type <span class='highlightExample'>thamiz</span> on your keyboard";
}
