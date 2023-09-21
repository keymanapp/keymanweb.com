#!/usr/bin/env bash
#
# Setup keymanweb.com site to run via Docker.
#
set -eu

## START STANDARD BUILD SCRIPT INCLUDE
# adjust relative paths as necessary
THIS_SCRIPT="$(greadlink -f "${BASH_SOURCE[0]}" 2>/dev/null || readlink -f "${BASH_SOURCE[0]}")"
. "$(dirname "$THIS_SCRIPT")/resources/builder.inc.sh"
## END STANDARD BUILD SCRIPT INCLUDE

################################ Main script ################################

function _get_docker_image_id() {
  echo "$(docker images -q web-keyman-website)"
}

function _get_docker_container_id() {
  echo "$(docker ps -a -q --filter ancestor=web-keyman-website)"
}

function _stop_docker_container() {
  KEYMANWEB_CONTAINER=$(_get_docker_container_id)
  if [ ! -z "$KEYMANWEB_CONTAINER" ]; then
    docker container stop $KEYMANWEB_CONTAINER
  else
    echo "No Docker container to stop"
  fi
}

builder_describe \
  "Setup keymanweb.com site to run via Docker at http://localhost:8057." \
  configure \
  clean \
  build \
  start \
  stop \
  test \

builder_parse "$@"

# This script runs from its own folder
cd "$REPO_ROOT"

if builder_start_action configure; then
  # Nothing to do
  builder_finish_action success configure
fi

if builder_start_action clean; then
  # Stop and cleanup Docker containers and images used for the site
  _stop_docker_container

  KEYMANWEB_CONTAINER=$(_get_docker_container_id)
  if [ ! -z "$KEYMANWEB_CONTAINER" ]; then
    docker container rm $KEYMANWEB_CONTAINER
  else
    echo "No Docker container to clean"
  fi

  KEYMANWEB_IMAGE=$(_get_docker_image_id)
  if [ ! -z "$KEYMANWEB_IMAGE" ]; then
    docker rmi web-keyman-website
  else
    echo "No Docker image to clean"
  fi

  builder_finish_action success clean
fi

if builder_start_action stop; then
  # Stop the Docker container
  _stop_docker_container
  builder_finish_action success stop
fi

if builder_start_action build; then
  # Download docker image. --mount option requires BuildKit
  DOCKER_BUILDKIT=1 docker build -t web-keyman-website .

  builder_finish_action success build
fi

if builder_start_action start; then
  # Start the Docker container
  if [ ! -z $(_get_docker_image_id) ]; then
    if [[ $OSTYPE =~ msys|cygwin ]]; then
      # Windows needs leading slashes for path
      SITE_HTML="//$(pwd):/var/www/html/"
    else
      SITE_HTML="$(pwd):/var/www/html/"
    fi

    docker run --rm -d -p 8057:80 -v ${SITE_HTML} \
        -e S_KEYMAN_COM=localhost:8054 \
        --name keymanweb.com \
        web-keyman-website
  else
    builder_die "ERROR: Docker container doesn't exist. Run ./build.sh build first$"
    builder_finish_action fail start
  fi

  # Skip if link already exists
  if [ -L vendor ]; then
    echo "Link to vendor/ already exists"
  else
    # Create link to vendor/ folder
    KEYMANWEB_CONTAINER=$(_get_docker_container_id)
    if [ ! -z "$KEYMANWEB_CONTAINER" ]; then
      docker exec -i $KEYMANWEB_CONTAINER sh -c "ln -s /var/www/vendor vendor && chown -R www-data:www-data vendor"
    else
      echo "No Docker container running to create link to vendor/"
    fi
  fi

  builder_finish_action success start
fi

if builder_start_action test; then
  # TODO: lint tests

  composer check-docker-links

  builder_finish_action success test
fi
