<?php
  declare(strict_types=1);

  namespace Keyman\Site\com\keyman\web;

  use Keyman\Site\Common\KeymanSentry;
  use Keyman\Site\Common\KeymanHosts;

  require_once(__DIR__ . '/../../_common/KeymanSentry.php');

  const SENTRY_DSN = 'https://11f513ea178d438e8f12836de7baa87d@o1005580.ingest.sentry.io/5983523';

  class WebKeymanComSentry {
    static function init() {
      KeymanSentry::Init(SENTRY_DSN);
    }
    static function GetBrowserHTML($kmwbuild) {
      $tier = KeymanHosts::Instance()->TierName();
      return KeymanSentry::GetBrowserHTML(SENTRY_DSN, $tier == 'stable' ? $kmwbuild : "$kmwbuild-$tier");
    }
  }