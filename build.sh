#!/usr/bin/env bash
## START STANDARD SITE BUILD SCRIPT INCLUDE
readonly THIS_SCRIPT="$(readlink -f "${BASH_SOURCE[0]}")"
readonly BOOTSTRAP="$(dirname "$THIS_SCRIPT")/resources/bootstrap.inc.sh"
readonly BOOTSTRAP_VERSION=v1.0.14
if ! [ -f "$BOOTSTRAP" ] || ! source "$BOOTSTRAP"; then
  curl -H "Cache-Control: no-cache" --fail --silent --show-error -w "curl: Finished attempt to download %{url}" "https://raw.githubusercontent.com/keymanapp/shared-sites/$BOOTSTRAP_VERSION/bootstrap.inc.sh" -o "$BOOTSTRAP.tmp" || exit 1
  source "$BOOTSTRAP.tmp"
  rm -f "$BOOTSTRAP.tmp"
fi
## END STANDARD SITE BUILD SCRIPT INCLUDE

# TODO: these should probably all be moved to a common defines script too?
readonly KEYMANWEB_CONTAINER_NAME=web-keyman-website
readonly KEYMANWEB_CONTAINER_DESC=web-keyman-com-app
readonly KEYMANWEB_IMAGE_NAME=web-keyman-website
readonly HOST_KEYMANWEB_COM=web.keyman.com.localhost

source _common/keyman-local-ports.inc.sh
source _common/docker.inc.sh

################################ Main script ################################

builder_describe \
  "Setup keymanweb.com site to run via Docker." \
  configure \
  clean \
  build \
  start \
  stop \
  test \
  "--no-unit-test" \
  "--no-lint" \
  "--no-link-check"

builder_parse "$@"

builder_run_action configure  bootstrap_configure
builder_run_action clean      clean_docker_container $KEYMANWEB_IMAGE_NAME $KEYMANWEB_CONTAINER_NAME
builder_run_action stop       stop_docker_container  $KEYMANWEB_IMAGE_NAME $KEYMANWEB_CONTAINER_NAME
builder_run_action build      build_docker_container $KEYMANWEB_IMAGE_NAME $KEYMANWEB_CONTAINER_NAME
builder_run_action start      start_docker_container $KEYMANWEB_IMAGE_NAME $KEYMANWEB_CONTAINER_NAME $KEYMANWEB_CONTAINER_DESC $HOST_KEYMANWEB_COM $PORT_KEYMANWEB_COM $BUILDER_CONFIGURATION

builder_run_action test       test_docker_container  $KEYMANWEB_CONTAINER_DESC $PORT_KEYMANWEB_COM /
