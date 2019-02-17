<?php /*
  Name:             servervars
  Copyright:        Copyright (C) 2005 Tavultesoft Pty Ltd.
  Documentation:    
  Description:      
  Create Date:      17 Oct 2009

  Modified Date:    17 Oct 2009
  Authors:          mcdurdin
  Related Files:    
  Dependencies:     

  Bugs:             
  Todo:             
  Notes:            
  History:          17 Oct 2009 - mcdurdin - Alter help base dir
*/
  if(file_exists($_SERVER['DOCUMENT_ROOT'].'/cdn/deploy/cdn.php')) {
    require_once($_SERVER['DOCUMENT_ROOT'].'/cdn/deploy/cdn.php');
  }

  $site_url = 'keymanweb.com';
  
  // We allow the site to strip off everything post its basic siteurl 
  
  function GetHostSuffix() {
    global $site_url;
    $name = $_SERVER['SERVER_NAME'];
    if(stripos($name, $site_url.'.') == 0) {
      return substr($name, strlen($site_url), 1024);
    }
    return '';
  }
  
  $site_suffix = GetHostSuffix();

  // $site_protocol is used only by util.php at this time. 
  $site_protocol = (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443) ? 'https://' : 'http://';
    
  if($site_suffix == '') {
    $TestServer = false;
    $url_keymanweb_res = "https://r.keymanweb.com";
    $staticDomainRoot="https://s.keyman.com/";
  } else {
    $TestServer = true;
    $url_keymanweb_res = "http://r.keymanweb.com{$site_suffix}";
    $staticDomainRoot="http://s.keyman.com{$site_suffix}/";
  }

  $site_keymanwebhelp = "help.keyman.com{$site_suffix}";
  $site_keymanwebdemo = "keymanweb.com{$site_suffix}";
  $site_tavultesoft = "tavultesoft.com{$site_suffix}";
  
  $staticDomain="s.keyman.com{$site_suffix}/kmw/live";

  function cdn($file) {
    global $cdn, $staticDomain, $TestServer;
    $use_cdn = !$TestServer || (isset($_REQUEST['cdn']) && $_REQUEST['cdn'] == 'force');
    if($use_cdn && $cdn && array_key_exists('/'.$file, $cdn)) {
      return "/cdn/deploy{$cdn['/'.$file]}";
    }
    return "/cdn/dev/{$file}";
  }

?>
