
if("onorientationchange" in window)
  $(window).bind("orientationchange",adjustMessageWidth);

else if("onresize" in window)
  $(window).bind("resize",adjustMessageWidth);

function adjustMessageWidth()
{
  setMessageWidth('5%');
  window.setTimeout(function(){setMessageWidth('100%');},10);
}

function setMessageWidth(pcWidth)
{
  var el=getKMWInputElement('message');
  if(el && el.base)
    el.base.style.width=el.style.width=pcWidth;
}

