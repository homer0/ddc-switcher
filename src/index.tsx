import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { DISPLAY_INPUTS } from './inputs';
import { CONFIG } from './config';
import { getDisplays } from './client';
import { renderDocument, renderApp } from './ui';
import './ui/style.css';

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
  .get('/', async () => {
    const displays = await getDisplays();
    return renderDocument({ children: renderApp({ displays, inputs: allowedInputs }) });
  })
  .listen(CONFIG.port);

// eslint-disable-next-line no-console
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
