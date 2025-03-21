/* eslint-disable no-await-in-loop */
import { runCommand } from './bridge';
import { DISPLAY_INPUT_MAP, type DisplayInputInfo } from './inputs';

export type DisplayInfo = {
  name: string;
  index: number;
  id: string;
  input: DisplayInputInfo;
};

export type GetDisplaysResponse = {
  displays: DisplayInfo[];
  error?: string;
};

export const getDisplays = async (): Promise<GetDisplaysResponse> => {
  let list: string;
  try {
    list = await runCommand('get-display-list');
  } catch (error) {
    return {
      displays: [],
      error: error instanceof Error ? error.message : String(error),
    };
  }

  const lines = list.split('\n');
  const result: DisplayInfo[] = [];
  if (!lines.length) {
    return { displays: result };
  }

  const displays = lines.reduce<DisplayInfo[]>((acc, line) => {
    const match =
      /(?:\[(?<index>\d+)\]\s*)?(?<name>[^(]+)\s\((?<id>[\w-]+)\)\s\[(?<input>\d+)\]/.exec(
        line,
      );
    if (!match?.groups) {
      return acc;
    }

    const {
      index: indexRaw = 1,
      input: inputIdRaw,
      id = 'Unknown ID',
      name = 'Unknown display',
    } = match.groups;
    const index = Number(indexRaw);
    if (Number.isNaN(index)) {
      return acc;
    }

    const inputId = Number(inputIdRaw);
    if (Number.isNaN(inputId) || !DISPLAY_INPUT_MAP[inputId]) {
      return acc;
    }

    const inputInfo = DISPLAY_INPUT_MAP[inputId];
    acc.push({
      name,
      index,
      id,
      input: inputInfo,
    });

    return acc;
  }, []);

  return { displays };
};

export type SwitchDisplayInputOptions = {
  displayIndex: number;
  inputId: number;
};

export const switchDisplayInput = async ({
  displayIndex,
  inputId,
}: SwitchDisplayInputOptions): Promise<DisplayInputInfo> => {
  const input = DISPLAY_INPUT_MAP[inputId];
  if (!input) {
    throw new Error('Invalid input ID');
  }

  let response: string;
  if (input.alt) {
    response = await runCommand(`set-display-input-alt:${displayIndex}:${inputId}`);
  } else {
    response = await runCommand(`set-display-input:${displayIndex}:${inputId}`);
  }

  if (!response) {
    throw new Error('Failed to switch input');
  }

  const responseInput = Number(response);
  if (Number.isNaN(responseInput) || !DISPLAY_INPUT_MAP[responseInput]) {
    throw new Error('Invalid input ID on response');
  }

  return DISPLAY_INPUT_MAP[responseInput];
};
