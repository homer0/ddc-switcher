export type DisplayInputName = 'DisplayPort' | 'HDMI' | 'USB-C' | 'USB-C/DP';
export type DisplayInputInfo = {
  name: string;
  shortName?: string;
  index: number;
  id: number;
  alt: boolean;
};

export const DISPLAY_INPUT_MAP: Record<number, DisplayInputInfo> = {
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

export const DISPLAY_INPUTS = Object.values(DISPLAY_INPUT_MAP);
