import * as path from 'path';
import { Html } from '@elysiajs/html';
import { CONFIG } from '../config';
import { renderColorsCssVars } from './colors';

export type RenderDocumentProps = {
  children: JSX.Element;
};

let stylesheet: string | null = null;
const currentDirectory = path.dirname(import.meta.path);
const stylesheetPath = path.join(currentDirectory, CONFIG.stylesheet);

const compressCss = (text: string): string =>
  text.replace(/\s+/g, ' ').replace(/\/\*.*?\*\//g, '');

export const renderDocument = async ({
  children,
}: RenderDocumentProps): Promise<JSX.Element> => {
  if (!stylesheet) {
    const file = Bun.file(stylesheetPath);
    const contents = await file.text();
    stylesheet = CONFIG.compressCSS ? compressCss(contents) : contents;
  }

  const publicThemePath = `/public/${CONFIG.theme}`;

  return (
    <html lang="en">
      <head>
        <title>{CONFIG.title}</title>
        {stylesheet && <style>{stylesheet}</style>}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href={`${publicThemePath}/manifest.json`} />
        {renderColorsCssVars({ theme: CONFIG.theme })}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${publicThemePath}/icons/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${publicThemePath}/icons/favicon-32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${publicThemePath}/icons/favicon-16.png`}
        />
        <link rel="shortcut icon" href={`${publicThemePath}/icons/favicon.ico`} />
        <meta name="theme-color" content="#1d1d1e" />
      </head>
      <body>
        <main id="root" hx-get="/api/status" hx-trigger="every 10s">
          {children}
        </main>
        <script src="/public/vendor/htmx.js" />
      </body>
    </html>
  );
};
