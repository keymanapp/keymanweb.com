<?php
session_start();
require_once('inc/servervars.php');

  $kmwbuild = @file_get_contents('http://r.keymanweb.com/code/get-version');
  if($kmwbuild === FALSE) {
    $kmwbuild = 376;
  }
?>
<head>
    <title>KeymanWeb Styling Tool</title>
    <link rel="stylesheet" type="text/css" href="<?php echo cdn("css/kmw.css"); ?>" />
<link rel="stylesheet" type="text/css" href="<?php echo cdn("keys/keys.css"); ?>" />
<link rel="stylesheet" type="text/css" href="<?php echo cdn("fonts/fonts.css"); ?>" />

    <script type='text/javascript'>
      //tavultesoft.keymanweb.addKeyboards('us@eng');
        (function() {
        var kmwProtocol = (("https:" == document.location.protocol) ? "https://" : "http://");
        document.writeln(unescape("%3Cscript src='" + kmwProtocol +
        "r.keymanweb.com/code/?domain="+location.hostname+
        "&amp;id=997&amp;page="+encodeURIComponent(location.pathname)+
        "' type='text/javascript' %3E%3C/script%3E"));
        })();
    </script>
    <link rel="stylesheet" type="text/css" href="<?php echo cdn("css/styling-tool.css"); ?>" />
    <link rel="stylesheet" type="text/css" href="<?php echo cdn("css/jquery.colorpicker.css"); ?>" />
    <link rel="stylesheet" type="text/css" href="<?php echo cdn("css/jquery.classygradient.css"); ?>" />
    <script type="text/javascript"  src="<?php echo cdn("js/jquery.min.js"); ?>"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>
    <script type="text/javascript" src="<?php echo cdn("js/styling-tool/jquery.colorpicker.js"); ?>"></script>
    <script type="text/javascript" src="<?php echo cdn("js/styling-tool/jquery.classygradient.js"); ?>"></script>
    <script type="text/javascript" src="<?php echo cdn("js/styling-tool/styling.js"); ?>"></script>
    <script type="text/javascript" src="<?php echo cdn("js/styling-tool/style-generator.js"); ?>"></script>
    
</head>
<body class="osk-always-visible osk-fixed-width">
    <div class="header">
        <a href="/"><img id="logo" src="<?php echo cdn("img/logo1.png"); ?>" alt='Keyman Logo' /></a>
        <img id="header-bottom" src="<?php echo cdn("img/headerbar.png"); ?>" alt='Header bottom' />
    </div>
    <div class="wrapper">
        <h2 id="title">KeymanWeb Styling Tool <span id="title-link"><a href="keyboard-styling-tool-help.php" target="blank">How do I use this?</a></span></h2>
        <div id='KeymanWebControl'></div>
        <div id='messageContainer'>
            <input type="text" id='message' />	
        </div>
        <div class="screener">
            <div class="sc header"></div>
            <div class="sc row1 normal1"></div>
            <div class="sc row1 special1"></div>
            <div class="sc row2 special1"></div>
            <div class="sc row2 normal1"></div>
            <div class="sc row3 special1"></div>
            <div class="sc row3 normal1"></div>
            <div class="sc row3 special2"></div>
            <div class="sc row4 special1"></div>
            <div class="sc row4 normal1"></div>
            <div class="sc row4 special2"></div>
            <div class="sc row5 special1"></div>
            <div class="sc row5 special2"></div>
            <div class="sc row5 normal1"></div>
            <div class="sc row5 special3"></div>
            <div class="sc row5 special4"></div>
            <div class="sc footer"></div>
        </div>
        <div class="spacer"></div>
        <div class="button selected" id="edit-mode"><h2>Edit Mode</h2></div>
        <div class="button" id="test-mode"><h2>Test Mode</h2></div>
        <div class="output-device">
            <h2>Target Device Output</h2>
            <br/>
            <input type="radio" name="output-device" id="output-all" class="kmw-disabled output-check" checked>Desktop, Tablet and Mobile<br/>
            <input type="radio" name="output-device" id="output-desktop"class="kmw-disabled output-check">Desktop Only<br/>
            <input type="radio" name="output-device" id="output-tablet" class="kmw-disabled output-check">Tablet Only<br/>
            <input type="radio" name="output-device" id="output-mobile" class="kmw-disabled output-check">Mobile Only<br/>
        </div>
        <div class="css-output">
            <h2>CSS output</h2>
            <textarea id="code" class="kmw-disabled" wrap='off' spellcheck='false' readonly></textarea>
            <textarea id="code2" class="kmw-disabled" spellcheck='false' readonly></textarea>
        </div>
        <div class="editor">
            <div class="close">x</div>
            <h1>Title</h1>
            <div class="styling-section" id="frame-styling">
                <div class="control-third">
                    <label for="header-footer-background">Header/Footer Background</label>
                    <input type="text" id="header-footer-background" class="kmw-disabled" />
                    <label for="keyboard-background">Keyboard Background</label>
                    <input type="text" id="keyboard-background" class="kmw-disabled" />
                </div>
                <div class="control-third">
                    <label>Keyboard Border Radius</label>
                    <div class="control" id="standard-border-radius-c">
                        <div class="minus-control">-</div>
                        <input type="text" class="control-value kmw-disabled" id="keyboard-border-radius" value="0px" readonly/>
                        <div class="plus-control">+</div>
                    </div>
                </div>
            </div>
            
            
            <div class="styling-section" id="standard-styling">
                <div class="control-third">
                    <label>Background</label>
                    <div class="gradient1" id="standard-background"></div>
                    <div class="gradient2" id="standard-bg"></div>
                    <br/>
                    <label>Selected Background</label>
                    <div class="gradient1" id="standard-background-selected"></div>
                    <div class="gradient2" id="standard-bg-selected"></div>
                    <br/>
                    <label>Border</label>
                    <input type="input" name="standard-border" id="standard-border" class="kmw-disabled" />
                    <label>Border Radius</label>
                    <div class="control" id="standard-border-radius-c">
                        <div class="minus-control">-</div>
                        <input type="text" class="control-value" value="0px" id="standard-border-radius" readonly/>
                        <div class="plus-control">+</div>
                    </div>
                </div>
                <div class="control-third">
                    <label>Keycap Font Color</label>
                    <input type="input" name="standard-keycap-font" id="standard-keycap-font" class="kmw-disabled" />
                    <label>Keycap Position (top)</label>
                    <div class="control percent" id="standard-border-radius-c">
                        <div class="minus-control percent">-</div>
                        <input type="text" class="control-value" value="0%" id="standard-keycap-top" readonly/>
                        <div class="plus-control">+</div>
                    </div>
                    <label>Keycap Position (left)</label>
                    <div class="control percent" id="standard-border-radius-c">
                        <div class="minus-control">-</div>
                        <input type="text" class="control-value" value="0%" id="standard-keycap-left" readonly/>
                        <div class="plus-control">+</div>
                    </div>
                    <label>Keytext Font Color</label>
                    <input type="input" name="standard-keytext-font" id="standard-keytext-font" class="kmw-disabled" />
                    <label>Keytext Position (top)</label>
                    <div class="control percent" id="standard-border-radius-c">
                        <div class="minus-control">-</div>
                        <input type="text" class="control-value" value="0%" id="standard-keytext-top" readonly/>
                        <div class="plus-control">+</div>
                    </div>
                    <label>Keytext Position (left)</label>
                    <div class="control percent" id="standard-border-radius-c">
                        <div class="minus-control">-</div>
                        <input type="text" class="control-value" value="0%" id="standard-keytext-left" readonly/>
                        <div class="plus-control">+</div>
                    </div>
                </div>
            </div>
            
            
            <div class="styling-section" id="special-styling">
                <div class="control-third">
                    <label>Background</label>
                    <div class="gradient1" id="special-background"></div>
                    <div class="gradient2" id="special-bg"></div>
                    <br/>
                    <label>Selected Background</label>
                    <div class="gradient1" id="special-background-selected"></div>
                    <div class="gradient2" id="special-bg-selected"></div>
                    <br/>
                    <label>Border</label>
                    <input type="input" id="special-border" class="kmw-disabled" />
                    <label>Border Radius</label>
                    <div class="control" id="special-border-radius-c">
                        <div class="minus-control">-</div>
                        <input type="text" class="control-value" value="0px" id="special-border-radius" readonly/>
                        <div class="plus-control">+</div>
                    </div>
                </div>
                <div class="control-third">
                    <label>Keytext Font Color</label>
                    <input type="input" name="special-keytext-font" id="special-keytext-font" class="kmw-disabled" />
                    <label>Keytext Font Color (Selected)</label>
                    <input type="input" name="special-keytext-font-selected" id="special-keytext-font-selected" class="kmw-disabled" />
                    <label>Keytext Position (top)</label>
                    <div class="control percent" id="special-border-radius-c">
                        <div class="minus-control">-</div>
                        <input type="text" class="control-value" value="0%" id="special-keytext-top" readonly/>
                        <div class="plus-control">+</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="values">
        <!-- Standard Keys (Shifted) -->
        <input type="hidden" name="standard-background-s" id="standard-background-s" />
        <!-- Special Keys (Shifted) -->
        <input type="hidden" name="special-background-s" id="special-background-s" />
    </div>
    <div class="mode-alert">
        <h2>Mode Selected</h2>
    </div>
</body>
</html>