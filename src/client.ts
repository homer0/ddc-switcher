/* eslint-disable no-await-in-loop */
import { runCommand } from './bridge';
import { DISPLAY_INPUT_MAP, type DisplayInputInfo } from './inputs';

export type DisplayInfo = {
  name: string;
  index: number;
  id: string;
  input: DisplayInputInfo;
};

export const getDisplays = async (): Promise<DisplayInfo[]> => {
  const list = await runCommand('get-display-list');
  const lines = list.split('\n');
  const result: DisplayInfo[] = [];
  if (!lines.length) {
    return result;
  }

  return lines.reduce<DisplayInfo[]>((acc, line) => {
    const match =
      /(?:\[(?<index>\d+)\]\s*)?(?<name>[^(]+)\s\((?<id>[\w-]+)\)\s\[(?<input>\d+)\]/.exec(
        line,
      );
    if (!match?.groups) {
      return acc;
    }

    const {
      index: indexRaw,
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
};
