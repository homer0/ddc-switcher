/* eslint-disable no-process-env, no-magic-numbers */
import { DISPLAY_INPUT_MAP } from './inputs';

const DEFAULT_PORT = 3000;
const DEFAULT_BRIDGE_PIPE_FILE = './m1ddc-bridge-pipe';
const DEFAULT_PIPE_MAX_READ_ATTEMPTS = 10;
const DEFAULT_ALLOWED_INPUTS = Object.keys(DISPLAY_INPUT_MAP).map(Number);

export const CONFIG = {
  title: 'DDC Switcher',
  port: Number(process.env.PORT) || DEFAULT_PORT,
  pipeFile: process.env.BRIDGE_PIPE_FILE || DEFAULT_BRIDGE_PIPE_FILE,
  allowedInputs: process.env.ALLOWED_INPUTS
    ? process.env.ALLOWED_INPUTS.split(',')
        .map(Number)
        .filter((id) => DISPLAY_INPUT_MAP[id])
    : DEFAULT_ALLOWED_INPUTS,
  stylesheet: './style.css',
  compressCSS: process.env.COMPRESS_CSS !== 'false',
  resPrefix: 'm1ddc-response:',
  resErrorPrefix: 'm1ddc-error:',
  pipeMaxReadAttempts:
    Number(process.env.BRIDGE_PIPE_MAX_READ_ATTEMPTS) || DEFAULT_PIPE_MAX_READ_ATTEMPTS,
};
