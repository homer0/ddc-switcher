# DDC Switcher

This is a small app that will allow me to switch the source of my monitors using DDC/CI from other devices.

> ⚠️: This is for personal use, so if you have any issues, you are on your own.

- The app will run inside a container and communicate with the host using a pipe-like approach.
- In the host, we'll have a bash script sending the commands to [m1ddc](https://github.com/waydabber/m1ddc).
- This won't work on windows.

## Usage

First, you need to put the bridge script in a directory that you'll later mount in the container:

```bash
mkdir -p /path/to/bridge
cp ./m1ddc-bridge.sh /path/to/bridge
```

Then, when you start the container (you can build the image with `bun docker:build`), you need to mount the bridge directory and define the env var with its path so the app can communicate using the pipe:

```bash
docker run -it --rm \
  # Mount the bridge directory
  -v /path/to/bridge:/bridge \
  # Tell the app about the pipe file in it
  -e BRIDGE_PIPE_FILE=/bridge/m1ddc-bridge-pipe \
  ddc-switcher
```

Back in the host, you'll navigate to the bridge directory and start it:

```bash
cd /path/to/bridge;
./m1ddc-bridge.sh
```

The bridge will check the pipe file (every 1 second) for commands, execute them, and write the result back for the app to read.

## Configuration

There are a few environment variables that can be set in order to change the app's behavior:

| Variable                        | Default               | Description                                                                                                                                          |
| ------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BRIDGE_PIPE_FILE`              | `./m1ddc-bridge-pipe` | The path to the pipe file that the app will use to communicate with the host. The default is only useful for development, so you should override it. |
| `BRIDGE_PIPE_MAX_READ_ATTEMPTS` | `10`                  | The maximum number of attempts to read a response from the pipe before giving up. After each attempt, it will way for `500ms * [attempt]`            |
| `ALLOWED_INPUTS`                | `-`                   | A comma-separated list of inputs that the app will allow to be switched to. If empty, all inputs will be allowed.                                    |
| `ALT_THEME`                     | `false`               | If set to `true`, the app will use a different theme.                                                                                                |
| `COMPRESS_CSS`                  | `true`                | If set to `false`, the app will not compress the CSS.                                                                                                |
