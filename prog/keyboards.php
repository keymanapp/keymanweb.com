<?php
  require_once __DIR__ . '/../inc/servervars.php';

  use Keyman\Site\Common\KeymanHosts;

  header('Content-Type: application/javascript; charset=utf-8');
  header('Cache-Control: public, max-age=300');

  $tiers = array('alpha','beta','stable');

  if(isset($_REQUEST['cache']) || isset($do_cache)) {
    // This is set for the web job that runs every
    // five minutes
    cache_keyboards($tiers);
    exit;
  }

  if(isset($_REQUEST['tier']) && in_array($_REQUEST['tier'], $tiers, TRUE)) {
    $tier = $_REQUEST['tier'];
  } else {
    $tier = 'stable';
  }

  if(isset($_REQUEST['version']) && preg_match('/^\\d+\\.\\d+$/', $_REQUEST['version'])) {
    $version = $_REQUEST['version'];
  } else {
    $version = get_keymanweb_version($tier);
  }
  $version = get_major_version($version);

  // We will cache this result for 5 minutes locally and allow proxies and clients to cache also for that
  // amount of time, so that we get fast loads.

  define('CACHED_KEYBOARDS', get_cache_file($version));

  $cache = false;
  $current_time = time();
  $expire_time = 300; // 5 minutes
  $cache_detail = '';

  if(file_exists(CACHED_KEYBOARDS) && $current_time - $expire_time < filemtime(CACHED_KEYBOARDS)) {
    $cache_detail = 'cached ' . date('c', filemtime(CACHED_KEYBOARDS));
    $cache = @file_get_contents(CACHED_KEYBOARDS);
  }

  if($cache === false) {
    $cache_detail = 'cache expired or empty, retrieved from cloud';
    $cache = @file_get_contents(get_cache_url($version));
    if($cache === false) {
      die('// unable to load keyboards from cache or from cloud');
    }
  }

  function get_cache_url($version) {
    return KeymanHosts::Instance()->api_keyman_com ."/cloud/4.0/keyboards?jsonp=keyman.register&languageidtype=bcp47&version=$version";
  }

  function get_cache_file($version) {
    return __DIR__ . "/../.data/cached-keyboards-$version.js";
  }
  ///
  /// Caches keyboard registrations for each tier to relevant cache file
  /// Note that at certain times, alpha+beta may be same version, or
  /// beta+stable may be same version. We're not going to worry about
  /// writing the file twice; it won't really hurt.
  ///
  function cache_keyboards($tiers) {
    // Recache alpha beta and stable versions

    @mkdir(__DIR__ . "/../.data");

    foreach($tiers as $tier) {
      $version = get_major_version(get_keymanweb_version($tier));
      $cache_file = get_cache_file($version);
      $cache_url = get_cache_url($version);

      echo "Caching $cache_url to $cache_file\n";
      $cache = @file_get_contents($cache_url);
      if($cache !== false) {
        file_put_contents($cache_file, $cache);
      }
    }
  }
?>
/* tier <?= $tier ?>, version <?= $version ?>, <?= $cache_detail ?> */
function addKeyboards() {
  <?= $cache ?>
}