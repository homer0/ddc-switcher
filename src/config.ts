/* eslint-disable no-process-env, no-magic-numbers */

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
  resPrefix: 'm1ddc-response:',
};

export type DisplayInputName = 'DisplayPort' | 'HDMI' | 'USB-C' | 'USB-C/DP';

export const INPUTS_MAP: Record<
  number,
  [name: DisplayInputName, index: number, alt: boolean]
> = {
  15: ['DisplayPort', 1, false],
  16: ['DisplayPort', 2, false],
  17: ['HDMI', 1, false],
  18: ['HDMI', 2, false],
  27: ['USB-C', 1, false],
  208: ['DisplayPort', 1, true],
  209: ['DisplayPort', 2, true],
  144: ['HDMI', 1, true],
  145: ['HDMI', 2, true],
  210: ['USB-C/DP', 1, true],
};
