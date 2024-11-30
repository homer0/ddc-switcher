/* eslint-disable no-process-env, no-magic-numbers */

const DEFAULT_PORT = 3000;
const DEFAULT_BRIDGE_PIPE_FILE = './m1ddc-bridge-pipe';
const DEFAULT_DISPLAY_INPUT_A = 27;
const DEFAULT_DISPLAY_INPUT_B = 17;
const DEFAULT_PIPE_MAX_READ_ATTEMPTS = 10;

export const CONFIG = {
  title: 'DDC Switcher',
  port: Number(process.env.PORT) || DEFAULT_PORT,
  pipeFile: process.env.BRIDGE_PIPE_FILE || DEFAULT_BRIDGE_PIPE_FILE,
  displayInputA: Number(process.env.DISPLAY_INPUT_A) || DEFAULT_DISPLAY_INPUT_A,
  displayInputB: Number(process.env.DISPLAY_INPUT_B) || DEFAULT_DISPLAY_INPUT_B,
  stylesheet: './style.css',
  compressCSS: process.env.COMPRESS_CSS !== 'false',
  resPrefix: 'm1ddc-response:',
  resErrorPrefix: 'm1ddc-error:',
  pipeMaxReadAttempts:
    Number(process.env.BRIDGE_PIPE_MAX_READ_ATTEMPTS) || DEFAULT_PIPE_MAX_READ_ATTEMPTS,
};

export type DisplayInputName = 'DisplayPort' | 'HDMI' | 'USB-C' | 'USB-C/DP';
export type DisplayInputInfo = {
  name: string;
  shortName?: string;
  index: number;
  id: number;
  alt: boolean;
};

export const INPUTS_MAP: Record<number, DisplayInputInfo> = {
  15: {
    name: 'DisplayPort',
    shortName: 'DP',
    index: 1,
    id: 15,
    alt: false,
  },
  16: {
    name: 'DisplayPort',
    shortName: 'DP',
    index: 2,
    id: 16,
    alt: false,
  },
  17: {
    name: 'HDMI',
    index: 1,
    id: 17,
    alt: false,
  },
  18: {
    name: 'HDMI',
    index: 2,
    id: 18,
    alt: false,
  },
  27: {
    name: 'USB-C',
    shortName: 'USB-C',
    index: 1,
    id: 27,
    alt: false,
  },
  208: {
    name: 'DisplayPort',
    shortName: 'DP',
    index: 1,
    id: 208,
    alt: true,
  },
  209: {
    name: 'DisplayPort',
    shortName: 'DP',
    index: 2,
    id: 209,
    alt: true,
  },
  144: {
    name: 'HDMI',
    index: 1,
    id: 144,
    alt: true,
  },
  145: {
    name: 'HDMI',
    index: 2,
    id: 145,
    alt: true,
  },
  210: {
    name: 'USB-C/DP',
    index: 1,
    id: 210,
    alt: true,
  },
};
