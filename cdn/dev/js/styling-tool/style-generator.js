function loaded2(){
    
    var platform;
    var classes;
    var style;
    var value;
    var timer1;
    
    // Output CSS
    function cssFunc(){
        $('#code').html('');
        if ($('#output-desktop').is(':checked')) {
            // Append .desktop to all styles
            platform = '.desktop';
        }else if ($('#output-tablet').is(':checked')) {
            //Append .tablet to all styles
            platform = '.tablet';
        }else if ($('#output-mobile').is(':checked')) {
            //Append .mobile to all styles
            platform = '.phone';
        }else{
            platform = '';
        }
        
        // Keyboard Frame
        
        // Header/Footer Background
            classes =['.kmw-osk-frame','.kmw-title-bar','.kmw-footer'];
            style = ['background'];
            value = $("#header-footer-background").val();
            appendLine(classes,style,value);
        // Keyboard Background
            classes = ['.kmw-osk-inner-frame','.kmw-key-layer-group','#kmw-popup-keys'];
            style = ['background','border'];
            value = $("#keyboard-background").val();
            appendLine(classes,style,value);
        // Popup Keys Border
            classes = ['#kmw-popup-keys'];
            style = ['border'];
            value = $("#header-footer-background").val();
            value = '1px solid '+value;
            appendLine(classes,style,value);
        // Keyboard Radius
            classes = ['.kmw-title-bar'];
            style = ['border-top-left-radius','border-top-right-radius'];
            value = $("#keyboard-border-radius").val();
            appendLine(classes,style,value);
            
            classes = ['.kmw-footer'];
            style = ['border-bottom-left-radius','border-bottom-right-radius'];
            value = $("#keyboard-border-radius").val();
            appendLine(classes,style,value);
            
            classes = ['.kmw-osk-frame'];
            style = ['border-radius'];
            value = $("#keyboard-border-radius").val();
            appendLine(classes,style,value);
        
        // Standard Keys
        
        // Key background
            classes = ['.kmw-key-default'];
	    style = ['background'];
	    value = $('#standard-background').attr('style');
	    value = value.replace("background:","");
            value = value.replace(";","");
            value2 = $('#standard-bg').ClassyGradient().data('ClassyGradient').getCSS();
            appendLine2(classes,style,value,value2);
        // Key background (Selected)
            classes = ['.kmw-key-touched'];
            style = ['background'];
	    value = $('#standard-background-selected').attr('style');
	    value = value.replace("background:","");
            value = value.replace(";","");
            value2 = $('#standard-bg-selected').ClassyGradient().data('ClassyGradient').getCSS();
            appendLine2(classes,style,value,value2);
        // Key click background
            classes = ['.kmw-key-touched'];
            style = ['background'];
            value = $("#standard-background-s").val();
            appendLine(classes,style,value);
        // Key border
            classes = ['.kmw-key-default'];
            style = ['border'];
            value = $("#standard-border").val();
            appendLine(classes,style,value);
        // Key border radius
            classes = ['.kmw-key-default'];
            style = ['border-radius'];
            value = $("#standard-border-radius").val();
            appendLine(classes,style,value);
        // Keycap font
            classes = ['.kmw-key-label'];
            style = ['color'];
            value = $("#standard-keycap-font").val();
            appendLine(classes,style,value);
        // Keycap top
            classes = ['.kmw-key-label'];
            style = ['top'];
            value = $("#standard-keycap-top").val();
            appendLine(classes,style,value);
        // Keycap left
            classes = ['.kmw-key-label'];
            style = ['left'];
            value = $("#standard-keycap-left").val();
            appendLine(classes,style,value);
        // Keytext font
            classes = ['.kmw-key-default .kmw-key-text'];
            style = ['color'];
            value = $("#standard-keytext-font").val();
            appendLine(classes,style,value);
        // Keytext top
            classes = ['.kmw-key-default .kmw-key-text'];
            style = ['top'];
            value = $("#standard-keytext-top").val();
            appendLine(classes,style,value);
        // Keytext left
            classes = ['.kmw-key-default .kmw-key-text'];
            style = ['left'];
            value = $("#standard-keytext-left").val();
            appendLine(classes,style,value);
        
        // Special Keys
        
        // Key background
            classes = ['.kmw-key-shift'];
            style = ['background'];
	    value = $('#special-background').attr('style');
	    value = value.replace("background:","");
            value = value.replace(";","");
            value2 = $('#special-bg').ClassyGradient().data('ClassyGradient').getCSS();
            appendLine2(classes,style,value,value2);
        // Key background (Selected)
            classes = ['.kmw-key-shift-on'];
            style = ['background'];
	    value = $('#special-background-selected').attr('style');
	    value = value.replace("background:","");
            value = value.replace(";","");
            value2 = $('#special-bg-selected').ClassyGradient().data('ClassyGradient').getCSS();
            appendLine2(classes,style,value,value2);
        // Key border
            classes = ['.kmw-key-shift','.kmw-key-shift-on'];
            style = ['border'];
            value = $("#special-border").val();
            appendLine(classes,style,value);
        // Key border radius
            classes =['.kmw-key-shift','.kmw-key-shift-on'];
            style = ['border-radius'];
            value = $("#special-border-radius").val();
            appendLine(classes,style,value);
        // Keytext font
            classes = ['.kmw-key-shift .kmw-key-text'];
            style = ['color'];
            value = $("#special-keytext-font").val();
            appendLine(classes,style,value);
        // Keytext font (Selected)
            classes = ['.kmw-key-shift-on .kmw-key-text'];
            style = ['color'];
            value = $("#special-keytext-font-selected").val();
            appendLine(classes,style,value);
        // Keytext top
            classes = ['.kmw-key-shift .kmw-key-text','.kmw-key-shift-on .kmw-key-text'];
            style = ['top'];
            value = $("#special-keytext-top").val();
            appendLine(classes,style,value);
    }
    

    
    // CSS output / Styling function
    function appendLine(classes,style,value) {
        // Add style to element
        var styling;
        var element;
        for (var i = 0; i < classes.length; i++) {
            element = classes[i];
            for (var a = 0; a < style.length; a++) {
                styling = style[a];
                if (styling == '') {
                    // split by ;
                    styling = value.split(";");
                    for(var b = 0; b<styling.length; b++){
                        //split value by :
                        styling = styling[b].split(":");
                    }
                }
            }
        }
        // Create CSS output
        if (value != '' && value != '0px' && value != '0%' && value!= '1px solid ') {
            var line = '';
	    var line2 = '';
            for (var i = 0; i < classes.length; i++) {
                line = line+platform+' '+classes[i]+', ';
		line2 = line2+' '+classes[i]+', ';
            }
            line = line.slice(0, - 2);
	    line2 = line2.slice(0, -2);
            line = line+' {\n';
	    line2 = line2+' {\n';
            for (var a = 0; a < style.length; a++) {
                if (style[a] == '') {
                    line = line+'  '+value+' !important;';
		    line2 = line2+' '+value+' !important';
                }else{
                    line = line+' '+style[a]+': '+value+' !important;';
		    line2 = line2+' '+style[a]+': '+value+' !important;';
                }
            }
            line = line+'\n}';
	    line2 = line2+'\n}';
	    $('#code2').append(line2);
	    line = line+'\n\n';
            $('#code').append(line);
        }
	// Add style to element
	var styles = $('#code2').val();
	appendStyle(styles);
    }
    function appendLine2(classes,style,value,value2){
	var line = platform+' '+classes[0]+' {\n'+value2+'\n}';
	var line2 = classes[0]+' {\n'+value2+'\n}';
	var match1 = value2.match(/#EEEEEE 0%,#EEEEEE/g);
	if (match1 == null) {
	    $('#code2').append(line2);
	    line = line+'\n\n';
            $('#code').append(line);
	}
	var styles = $('#code2').val();
	appendStyle(styles);
    }
    
    function appendStyle(styles) {
	$('#dynamic-stylesheet').remove();
	var css = document.createElement('style');
	css.type = 'text/css';
	css.id = 'dynamic-stylesheet';
      
	if (css.styleSheet){
	    css.styleSheet.cssText = styles;
	}else{
	    css.appendChild(document.createTextNode(styles));
	}
	document.getElementsByTagName("head")[0].appendChild(css);
    }

    setInterval(function(){
        if ($('.editor').is(":visible")) {
            window.clearInterval(timer1);
            timer1 = setInterval(function(){cssFunc()},1000);
        }else{
            window.clearInterval(timer1);
        }
    },2000);
    
    $('#code').focus(function(){
        window.clearInterval(timer1);
    });
    
    // On output device change, trigger css function
    $('.output-device').click(function(){
	cssFunc();
    });
    
    $(document).keyup(function(e) {
	if (e.keyCode == 27 && $('.editor').is(":visible")) {
	    $('.editor').hide();
	}   // esc
    });
}
window.onload = function(){
   loaded2(); 
}