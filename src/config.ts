/* eslint-disable no-process-env */

const DEFAULT_PORT = 3000;
const DEFAULT_BRIDGE_PIPE_FILE = './m1ddc-bridge-pipe';
const DEFAULT_DISPLAY_INPUT_A = 27;
const DEFAULT_DISPLAY_INPUT_B = 17;

export const CONFIG = {
  title: 'DDC Switcher',
  port: Number(process.env.PORT) || DEFAULT_PORT,
  pipeFile: process.env.BRIDGE_PIPE_FILE || DEFAULT_BRIDGE_PIPE_FILE,
  displayInputA: Number(process.env.DISPLAY_INPUT_A) || DEFAULT_DISPLAY_INPUT_A,
  displayInputB: Number(process.env.DISPLAY_INPUT_B) || DEFAULT_DISPLAY_INPUT_B,
  stylesheet: './style.css',
  compressCSS: process.env.COMPRESS_CSS !== 'false',
};
