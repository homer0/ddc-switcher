import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { CONFIG } from './config';
import { getDisplays } from './client';
import { renderDocument, renderApp } from './ui';

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get('/', async () => {
    const displays = await getDisplays();
    return renderDocument({ children: renderApp({ displays }) });
  })
  .listen(CONFIG.port);

// eslint-disable-next-line no-console
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
