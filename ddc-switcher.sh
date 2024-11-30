#!/bin/sh -e

# Config

## The current path where this file is located. Needed to create the path to the mount directory.
HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
## The path to the mount directory where the bridge script and the m1ddc binary are located.
MOUNT_PATH="${HERE}/mount"
## The port in the host machine that will show the UI.
HOST_PORT="3759"
## The path to the bridge script in the host machine.
HOST_BRIDGE_FILE="${MOUNT_PATH}/m1ddc-bridge.sh"
## The path to the bridge directory inside the container.
CONTAINER_PATH="/ddc-switcher-bridge"
## The name of the pipe file that will be used to communicate with the bridge script.
CONTAINER_PIPE_FILE="m1ddc-bridge-pipe"
## The name of the Docker container.
CONTAINER_NAME="ddc-switcher"
## The port in the container that will show the UI.
CONTAINER_PORT="3000"
## The name of the Docker image.
IMAGE_NAME="ddc-switcher"

# Stop any existing executions of the bridge
pkill -f "${HOST_BRIDGE_FILE}" >/dev/null 2>&1 || true

# Stop and remove any existing container with the same name
docker stop "${CONTAINER_NAME}" >/dev/null 2>&1 || true
docker rm "${CONTAINER_NAME}" >/dev/null 2>&1 || true

echo "[ddc-switcher] Stopped"

# If the argument is "stop", exit here
if [ "$1" = "stop" ]; then
  exit 0
fi

# Start the bridge
pushd "${MOUNT_PATH}" >/dev/null 2>&1
sh "${HOST_BRIDGE_FILE}" &
popd >/dev/null 2>&1

# Start the container
docker run -d \
  -v "${MOUNT_PATH}:/ddc-switcher-bridge" \
  -e BRIDGE_PIPE_FILE="${CONTAINER_PATH}/${CONTAINER_PIPE_FILE}" \
  -e ALLOWED_INPUTS="17,27" \
  -p "${HOST_PORT}:${CONTAINER_PORT}" \
  --name "${CONTAINER_NAME}" \
  "${IMAGE_NAME}" \
  > /dev/null 2>&1

echo "[ddc-switcher] Started"
