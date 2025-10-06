<?php /*
  Name:             languageexample
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
  require_once __DIR__ . '/../_includes/autoload.php';
  require_once __DIR__ . '/../inc/servervars.php';

  use \Keyman\Site\Common\KeymanHosts;

  if(isset($_REQUEST['keyboard'])) $keyboard = $_REQUEST['keyboard']; else $keyboard = '';
  if(isset($_REQUEST['language'])) $language = $_REQUEST['language']; else $language = ''; 

  if(empty($keyboard) || empty($language)) {
    $data = FALSE;
  } else {
    require_once("renderLanguageExample.php");
    $data = renderLanguageExample($keyboard, $language);
  }

  function renderHelpIcon($keyboard, $language) {
    if(empty($keyboard)) return '';
    $site = KeymanHosts::Instance()->help_keyman_com;
    $morehelp =
      "<a target='KeymanWebHelp' " .
      "title='Keyboard help'" .
      "href='$site/go?" .
      (empty($language) ? "" : "language=$language&amp;") .
      "keyboard=$keyboard'> <img src='".cdn("img/helpIcon.png")."'> </a>";
    return $morehelp;
  }

  if($data !== FALSE) {
    echo $data;
  } else {
    echo "No example is available";
  }

  // echo renderHelpIcon($keyboard, $language);
?>
