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
  require_once __DIR__ . '/../_includes/autoload.php';

  use \Keyman\Site\Common\KeymanHosts;
  use \Keyman\Site\com\keyman\web\WebKeymanComSentry;

  WebKeymanComSentry::init();

  // latest known version of KeymanWeb
  const FALLBACK_KMW_VERSION = '16.0.143';

  if(file_exists(__DIR__ . '/../cdn/deploy/cdn.php')) {
    require_once __DIR__ . '/../cdn/deploy/cdn.php';
  }

  $url_keymanweb_res = KeymanHosts::Instance()->r_keymanweb_com;
  $staticDomainRoot= KeymanHosts::Instance()->s_keyman_com;


  function cdn($file) {
    global $cdn;
    $use_cdn =
      KeymanHosts::Instance()->Tier() == KeymanHosts::TIER_PRODUCTION ||
      KeymanHosts::Instance()->Tier() == KeymanHosts::TIER_STAGING ||
      (isset($_REQUEST['cdn']) && $_REQUEST['cdn'] == 'force');
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
    $json = @file_get_contents(KeymanHosts::Instance()->SERVER_api_keyman_com . "/version/web/$tier");
    if($json) {
      $json = json_decode($json);
    }

    if($json && property_exists($json, 'version')) {
      $version = $json->version;
    } else {
      // If the get-version API fails, we'll use the latest known version
      $version = FALLBACK_KMW_VERSION;
    }
    return $version;
  }

  function get_keymanweb_versions() {
    $json = @file_get_contents(KeymanHosts::Instance()->SERVER_api_keyman_com . "/version/web/all");
    if($json) {
      $json = json_decode($json);
    }

    $fallback_version = FALLBACK_KMW_VERSION;

    foreach(array('alpha', 'beta', 'stable') as $tier) {
      if(!$json || !property_exists($json, $tier)) {
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
