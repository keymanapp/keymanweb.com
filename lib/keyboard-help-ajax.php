<?php /*
  Name:             keyboard-help-ajax.php
  Copyright:        Copyright (C) 2005 Tavultesoft Pty Ltd.
  Documentation:    
  Description:      
  Create Date:      24 Aug 2009

  Modified Date:    20 Aug 2010
  Authors:          mcdurdin, mcdurdin-admin
  Related Files:    
  Dependencies:     

  Bugs:             
  Todo:             
  Notes:            
  History:          24 Aug 2009 - mcdurdin - Fixup text on examples
                    04 Sep 2009 - mcdurdin - Show example text for no keyboards localised
                    17 Oct 2009 - mcdurdin - Fixup translation of no keyboard text
                    21 Dec 2009 - mcdurdin - Fixup reference to guessLanguage
                    25 Jan 2010 - mcdurdin - Tweak display of "no keyboard" text
                    20 Aug 2010 - mcdurdin-admin - Fix non-english requests
*/
  require_once('../inc/servervars.php');
  
  if(isset($_REQUEST['keyboard'])) $keyboard = $_REQUEST['keyboard']; else $keyboard = '';
  if(isset($_REQUEST['language'])) $language = $_REQUEST['language']; else $language = '';
  
  $morehelp = "  <a target='KeymanWebHelp' onclick='javascript:return openALink(this)' href=\"http://$site_keymanwebhelp/go?language=$language&amp;keyboard=$keyboard\">More&nbsp;help</a>";

  require_once($helpbasedir . "php\\languageExamples.php");
  require_once($helpbasedir . "php\\renderLanguageExample.php");
    
  renderLanguageExample($keyboard, $language, $morehelp);
?>
