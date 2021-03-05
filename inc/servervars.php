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

  require_once __DIR__ . '/../vendor/autoload.php';
  require_once __DIR__ . '/../_include/autoload.php';
  require_once __DIR__ . '/../_common/KeymanSentry.php';

  use \Keyman\Site\Common\KeymanHosts;

  const SENTRY_DSN = 'https://11f513ea178d438e8f12836de7baa87d@sentry.keyman.com/10';
  \Keyman\Site\Common\KeymanSentry::init(SENTRY_DSN);

  if(file_exists(__DIR__ . '/../cdn/deploy/cdn.php')) {
    require_once __DIR__ . '/../cdn/deploy/cdn.php';
  }

  $site_url = 'keymanweb.com';

  // We allow the site to strip off everything post its basic siteurl

  function GetHostSuffix() {
    global $site_url;
    if(!isset($_SERVER['SERVER_NAME'])) return '';

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
    $url_keymanweb_res = "https://r.keymanweb.com"; /// local dev domain is usually not available
    $staticDomainRoot="https://s.keyman.com/";
  }

  $site_keymanwebhelp = "help.keyman.com{$site_suffix}";
  $site_keymanwebdemo = "keymanweb.com{$site_suffix}";
  $site_keyman        = "keyman.com";

  $staticDomain="s.keyman.com/kmw/engine";

  function cdn($file) {
    global $cdn, $staticDomain, $TestServer;
    $use_cdn = !$TestServer || (isset($_REQUEST['cdn']) && $_REQUEST['cdn'] == 'force');
    if($use_cdn && $cdn && array_key_exists('/'.$file, $cdn)) {
      return "/cdn/deploy{$cdn['/'.$file]}";
    }
    return "/cdn/dev/{$file}";
  }


  function get_major_version($version) {
    return preg_replace('/^(\\d+)\\.(\\d+).*$/', '$1.$2', $version);
  }

  // Uses official API for version checking, but is not optimized for
  // version-checking against multiple release tiers.
  function get_keymanweb_version($tier) {
    $json = @file_get_contents(KeymanHosts::Instance()->api_keyman_com . "/version/web/$tier");
    if($json) {
      $json = json_decode($json);
    }

    if($json && property_exists($json, 'version')) {
      $version = $json->version;
    } else {
      // If the get-version API fails, we'll use the latest known version
      $version = "13.0.111";
    }
    return $version;
  }

  function get_keymanweb_versions() {
    // WARNING:  Internal API!  Subject to change.
    $json = @file_get_contents(KeymanHosts::Instance()->downloads_keyman_com . "/api/version/web");
    if($json) {
      $json = json_decode($json);
    }

    $version_map = array();
    if($json && property_exists($json, 'web')) {
      $json = $json->web;
    }

    $fallback_version = "13.0.111";
    
    foreach(array('alpha', 'beta', 'stable') as $tier) {
      if(!property_exists($json, $tier)) {
        $version_map[$tier] = $fallback_version;
      } else if(version_compare($json->{$tier}, "0.0.1") < 0) {
        // The version string didn't properly validate.
        $version_map[$tier] = $fallback_version;
      } else {
        $version_map[$tier] = $json->{$tier};
      }
    }

    return $version_map;
  }

?>
