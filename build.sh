#!/usr/bin/env bash
## START STANDARD SITE BUILD SCRIPT INCLUDE
readonly THIS_SCRIPT="$(readlink -f "${BASH_SOURCE[0]}")"
readonly BOOTSTRAP="$(dirname "$THIS_SCRIPT")/resources/bootstrap.inc.sh"
readonly BOOTSTRAP_VERSION=v0.21
[ -f "$BOOTSTRAP" ] && source "$BOOTSTRAP" || source <(curl -H "Cache-Control: no-cache" -fs https://raw.githubusercontent.com/keymanapp/shared-sites/$BOOTSTRAP_VERSION/bootstrap.inc.sh)
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

builder_parse "$@"

function test_docker_container() {
  # Note: ci.yml replicates these
  echo "TIER_TEST" > tier.txt

  # Run unit tests
  docker exec $KEYMANWEB_CONTAINER_DESC sh -c "vendor/bin/phpunit --testdox"

  # Lint .php files for obvious errors
  docker exec $KEYMANWEB_CONTAINER_DESC sh -c "find . -name '*.php' | grep -v '/vendor/' | xargs -n 1 -d '\\n' php -l"

  # Check all internal links
  # NOTE: link checker runs on host rather than in docker image
  npx broken-link-checker http://localhost:${PORT_KEYMANWEB_COM} --ordered --recursive --host-requests 10 -e --filter-level 3

  # Check for errors
  if docker container logs $KEYMANWEB_CONTAINER_DESC 2>&1 | grep -q 'php7'; then
    echo 'PHP reported errors or warnings:'
    docker container logs $KEYMANWEB_CONTAINER_DESC 2>&1 | grep 'php7'
    exit 1
  else
    echo 'No PHP errors found'
    exit 0
  fi
}

builder_run_action configure  bootstrap_configure
builder_run_action clean      clean_docker_container $KEYMANWEB_IMAGE_NAME $KEYMANWEB_CONTAINER_NAME
builder_run_action stop       stop_docker_container  $KEYMANWEB_IMAGE_NAME $KEYMANWEB_CONTAINER_NAME
builder_run_action build      build_docker_container $KEYMANWEB_IMAGE_NAME $KEYMANWEB_CONTAINER_NAME
builder_run_action start      start_docker_container $KEYMANWEB_IMAGE_NAME $KEYMANWEB_CONTAINER_NAME $KEYMANWEB_CONTAINER_DESC $HOST_KEYMANWEB_COM $PORT_KEYMANWEB_COM $BUILDER_CONFIGURATION

builder_run_action test       test_docker_container
