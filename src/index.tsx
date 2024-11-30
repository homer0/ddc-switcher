import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { CONFIG } from './config';

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get('/', () => ({ title: CONFIG.title }))
  .listen(CONFIG.port);

// eslint-disable-next-line no-console
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
