/* eslint-disable no-await-in-loop */
import { deferred, type DeferredPromise } from '@homer0/deferred';
import { CONFIG } from './config';

type QueueItem = {
  command: string;
  defer: DeferredPromise<string>;
};

const queue: QueueItem[] = [];
let isProcessing = false;

const readPipe = async (
  pipeFile: string,
  maxAttempts: number,
  attempt: number,
): Promise<string> => {
  if (attempt > maxAttempts) {
    throw new Error('Failed to read from the pipe');
  }

  try {
    const file = Bun.file(CONFIG.pipeFile);
    let text = await file.text();
    if (!text.startsWith(CONFIG.resPrefix)) {
      return readPipe(pipeFile, maxAttempts, attempt + 1);
    }
    text = text.substring(CONFIG.resPrefix.length);
    if (!text.startsWith(CONFIG.resErrorPrefix)) {
      return text;
    }
    text = text.substring(CONFIG.resErrorPrefix.length);
    throw new Error(text);
  } catch (error) {
    if (
      typeof error === 'object' &&
      error &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      return readPipe(pipeFile, maxAttempts, attempt + 1);
    }

    throw error;
  }
};

const bridgeCommand = async (command: string): Promise<string> => {
  await Bun.write(CONFIG.pipeFile, command);
  return readPipe(CONFIG.pipeFile, CONFIG.pipeMaxReadAttempts, 1);
};

const processQueue = async () => {
  if (isProcessing) {
    return;
  }

  isProcessing = true;

  while (queue.length > 0) {
    const { command, defer } = queue.shift() as QueueItem;
    try {
      const response = await bridgeCommand(command);
      defer.resolve(response);
    } catch (error) {
      defer.reject(error);
    }
  }

  isProcessing = false;
};

export const runCommand = async (command: string): Promise<string> => {
  const defer = deferred<string>();
  queue.push({ command, defer });
  processQueue();
  return defer.promise;
};
