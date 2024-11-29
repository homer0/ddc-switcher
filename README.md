# DDC Switcher

This is a small app that will allow me to switch the source of my monitors using DDC/CI from other devices.

> ⚠️: This is for personal use, so if you have any issues, you are on your own.

- The app will run inside a container and communicate with the host using a pipe-like approach.
- In the host, we'll have a bash script sending the commands to [m1ddc](https://github.com/waydabber/m1ddc).
- This won't work on windows.
