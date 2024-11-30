import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { DISPLAY_INPUTS } from './inputs';
import { CONFIG } from './config';
import { getDisplays, switchDisplayInput } from './client';
import { renderDocument, renderApp, renderDisplayInputOptions } from './ui';

const allowedInputs = DISPLAY_INPUTS.filter((input) =>
  CONFIG.allowedInputs.includes(input.id),
);

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .onError((ctx) => {
    if (ctx.code === 'NOT_FOUND') {
      return;
    }

    if (ctx.error) {
      // eslint-disable-next-line no-console
      console.error(ctx.error);
    }
  })
  .post('/api/switch/:displayIndex/:inputId', async (req) => {
    const { displayIndex: displayIndexRaw, inputId: inputIdRaw } = req.params;
    const displayIndex = Number(displayIndexRaw);
    if (Number.isNaN(displayIndex)) {
      throw new Error('Invalid display index');
    }

    const inputId = Number(inputIdRaw);
    if (Number.isNaN(inputId)) {
      throw new Error('Invalid input ID');
    }

    if (!allowedInputs.find((input) => input.id === inputId)) {
      throw new Error('Input not allowed');
    }

    const newInput = await switchDisplayInput({ displayIndex, inputId });

    return renderDisplayInputOptions({
      displayIndex,
      inputId: newInput.id,
      inputs: allowedInputs,
    });
  })
  .get('/api/status', async () => {
    const displays = await getDisplays();
    return renderApp({ displays, inputs: allowedInputs });
  })
  .get('/', async () => {
    const displays = await getDisplays();
    return renderDocument({ children: renderApp({ displays, inputs: allowedInputs }) });
  })
  .listen(CONFIG.port);

// eslint-disable-next-line no-console
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
