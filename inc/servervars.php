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
  require_once __DIR__ . '/../_common/KeymanSentry.php';

  use \Keyman\Site\Common\KeymanHosts;

  const SENTRY_DSN = 'https://11f513ea178d438e8f12836de7baa87d@o1005580.ingest.sentry.io/5983523';
  \Keyman\Site\Common\KeymanSentry::init(SENTRY_DSN);

  // latest known version of KeymanWeb
  const FALLBACK_KMW_VERSION = '16.0.143';

  if(file_exists(__DIR__ . '/../cdn/deploy/cdn.php')) {
    require_once __DIR__ . '/../cdn/deploy/cdn.php';
  }

  $site_suffix = KeymanHosts::Instance()->Tier() == KeymanHosts::TIER_DEVELOPMENT ?
    ".localhost" : "";

    // $site_protocol is used only by util.php at this time.
  $TestServer = (KeymanHosts::Instance()->Tier() == KeymanHosts::TIER_DEVELOPMENT) || 
    (KeymanHosts::Instance()->Tier() == KeymanHosts::TIER_TEST) ? true : false;
  $site_protocol = $TestServer ? 'http://' : 'https://';
    
  $url_keymanweb_res = KeymanHosts::Instance()->r_keymanweb_com;
  $staticDomainRoot= KeymanHosts::Instance()->s_keyman_com;  

  $site_keymanwebhelp = KeymanHosts::Instance()->help_keyman_com;
  $site_keymanwebdemo = KeymanHosts::Instance()->keymanweb_com;
  $site_keyman        = KeymanHosts::Instance()->keyman_com;

  $staticDomain= $staticDomainRoot . "/kmw/engine";

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
      $version = FALLBACK_KMW_VERSION;
    }
    return $version;
  }

  function get_keymanweb_versions() {
    $json = @file_get_contents(KeymanHosts::Instance()->api_keyman_com . "/version/web/all");
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
