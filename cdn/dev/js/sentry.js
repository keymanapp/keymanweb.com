(function initializeSentry() {
  if(!window.Sentry) {
    // Sentry scripts may have been blocked by client browser;
    // we won't be reporting errors to Sentry, but we don't
    // want to throw other errors
    return;
  }

  //
  // Tags all exceptions with the active KMW instance's metadata.
  // Compare against the definition in the main repo:
  // - keymanapp/keyman/common/core/web/tools/sentry-manager/src/index.ts
  //
  // Currently separate in part b/c we can't guarantee 14.0+ in order to use
  // the generalized sentry-manager module yet; we allow users to specify older
  // versions of KMW for use.  Also in part b/c keymanweb.com itself may produce errors.
  //

  const prepareEvent = function(event) {
    // Make sure the metadata-generation function actually exists... (14.0+)
    try {
      if(window.keyman.getDebugInfo) {
        event.extra = event.extra || {};
        event.extra.keymanState = window.keyman.getDebugInfo();
        event.extra.keymanHostPlatform = 'keymanweb.com';
      }
    } catch (ex) { /* Swallow any errors produced here */ }

    return event;
  };

  //
  // Initialize Sentry for this site
  //

  Sentry.init({
    beforeSend: prepareEvent,
    dsn: "https://11f513ea178d438e8f12836de7baa87d@o1005580.ingest.us.sentry.io/5983523",
    release: sentryEnvironment.release,
    integrations: [
      Sentry.httpClientIntegration(),
      Sentry.captureConsoleIntegration({
        levels: ['error', 'warning']
      })
    ],
    environment: sentryEnvironment.tier,
  });

  //
  // Capture resource load errors
  // per https://docs.sentry.io/platforms/javascript/troubleshooting/#capturing-resource-404s
  //

  window.addEventListener(
    "error",
    (event) => {
      if (!event.target) return;

      if (event.target.tagName === "IMG") {
        Sentry.captureException(
          new Error(`Failed to load image: ${event.target.src}`),
        );
      } else if (event.target.tagName === "LINK" && event.target.rel === "stylesheet") {
        Sentry.captureException(
          new Error(`Failed to load external stylesheet: ${event.target.href}`),
        );
      } else if (event.target.tagName === "SCRIPT") {
        Sentry.captureException(
          new Error(`Failed to load external script: ${event.target.src}`),
        );
      }
    },
    true, // useCapture - necessary for resource loading errors
  );
  console.log(`Sentry initialization complete: tier=${sentryEnvironment.tier}; release=${sentryEnvironment.release}`);
})();
