#!/usr/bin/env bash
## START STANDARD SITE BUILD SCRIPT INCLUDE
readonly THIS_SCRIPT="$(readlink -f "${BASH_SOURCE[0]}")"
readonly BOOTSTRAP="$(dirname "$THIS_SCRIPT")/resources/bootstrap.inc.sh"
readonly BOOTSTRAP_VERSION=chore/v0.4
[ -f "$BOOTSTRAP" ] && source "$BOOTSTRAP" || source <(curl -fs https://raw.githubusercontent.com/keymanapp/shared-sites/$BOOTSTRAP_VERSION/bootstrap.inc.sh)
## END STANDARD SITE BUILD SCRIPT INCLUDE

readonly KEYMANWEB_CONTAINER_NAME=web-keyman-website
readonly KEYMANWEB_CONTAINER_DESC=web-keyman-com-app
readonly KEYMANWEB_IMAGE_NAME=web-keyman-website
readonly HOST_KEYMANWEB_COM=keymanweb.com.localhost

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

builder_parse "$@":

function test_docker_container() {
  # Note: ci.yml replicates these

  # TODO: Run unit tests
  #docker exec $KEYMANWEB_CONTAINER_DESC sh -c "vendor/bin/phpunit --testdox"

  # Lint .php files for obvious errors
  docker exec $KEYMANWEB_CONTAINER_DESC sh -c "find . -name '*.php' | grep -v '/vendor/' | xargs -n 1 -d '\\n' php -l"

  # Check all internal links
  # NOTE: link checker runs on host rather than in docker image
  npx broken-link-checker http://localhost:8057 --ordered --recursive --host-requests 10 -e --filter-level 3
}

builder_run_action configure   bootstrap_configure
builder_run_action clean       clean_docker_container $KEYMANWEB_IMAGE_NAME $KEYMANWEB_CONTAINER_NAME
builder_run_action stop        stop_docker_container  $KEYMANWEB_IMAGE_NAME $KEYMANWEB_CONTAINER_NAME
builder_run_action build       build_docker_container $KEYMANWEB_IMAGE_NAME $KEYMANWEB_CONTAINER_NAME
builder_run_action start       start_docker_container $KEYMANWEB_IMAGE_NAME $KEYMANWEB_CONTAINER_NAME $KEYMANWEB_CONTAINER_DESC $HOST_KEYMANWEB_COM $PORT_KEYMANWEB_COM

builder_run_action test        test_docker_container
