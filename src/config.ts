/* eslint-disable no-process-env, no-magic-numbers */
import { DISPLAY_INPUT_MAP } from './inputs';

const DEFAULT_PORT = 3000;
const DEFAULT_BRIDGE_PIPE_FILE = './m1ddc-bridge-pipe';
const DEFAULT_DISPLAY_INPUT_A = 27;
const DEFAULT_DISPLAY_INPUT_B = 17;
const DEFAULT_PIPE_MAX_READ_ATTEMPTS = 10;

const displayInputAId = Number(process.env.DISPLAY_INPUT_A) || DEFAULT_DISPLAY_INPUT_A;
const displayInputA = DISPLAY_INPUT_MAP[displayInputAId];
if (!displayInputA) {
  throw new Error(`Invalid DISPLAY_INPUT_A: ${displayInputAId}`);
}

const displayInputBId = Number(process.env.DISPLAY_INPUT_B) || DEFAULT_DISPLAY_INPUT_B;
const displayInputB = DISPLAY_INPUT_MAP[displayInputBId];
if (!displayInputB) {
  throw new Error(`Invalid DISPLAY_INPUT_B: ${displayInputBId}`);
}

if (displayInputA.id === displayInputB.id) {
  throw new Error('DISPLAY_INPUT_A and DISPLAY_INPUT_B must be different');
}

export const CONFIG = {
  title: 'DDC Switcher',
  port: Number(process.env.PORT) || DEFAULT_PORT,
  pipeFile: process.env.BRIDGE_PIPE_FILE || DEFAULT_BRIDGE_PIPE_FILE,
  displayInputA,
  displayInputB,
  stylesheet: './style.css',
  compressCSS: process.env.COMPRESS_CSS !== 'false',
  resPrefix: 'm1ddc-response:',
  resErrorPrefix: 'm1ddc-error:',
  pipeMaxReadAttempts:
    Number(process.env.BRIDGE_PIPE_MAX_READ_ATTEMPTS) || DEFAULT_PIPE_MAX_READ_ATTEMPTS,
};
