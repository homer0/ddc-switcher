import { Html } from '@elysiajs/html';
import type { DisplayInfo } from '../client';

export type RenderAppProps = {
  displays: DisplayInfo[];
};

export const renderApp = ({ displays }: RenderAppProps): JSX.Element => (
  <div id="app">
    <h1>Displays</h1>
    <ul>
      {displays.map((display) => (
        <li>
          <span>{display.name}</span>
        </li>
      ))}
    </ul>
  </div>
);
