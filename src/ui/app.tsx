import { Html } from '@elysiajs/html';
import { DISPLAY_ICON } from './icons';
import type { DisplayInputInfo } from '../inputs';
import type { DisplayInfo } from '../client';

export type RenderAppProps = {
  displays: DisplayInfo[];
  inputs: DisplayInputInfo[];
};

export const renderApp = ({ displays, inputs }: RenderAppProps): JSX.Element => (
  <div id="app">
    <ul class="displays">
      {displays.map((display) => (
        <li class="display">
          <div id={`${display.id}-icon`} class="display-icon">
            <span>{display.index}</span>
            {DISPLAY_ICON}
          </div>
          <span class="display-name">{display.name}</span>
          <ul class="display-inputs">
            {inputs.map((input) => (
              <li class="display-input">
                <button
                  type="button"
                  class="display-input-button"
                  data-selected={input.id === display.input.id}
                >
                  {input.shortName || input.name}
                  {input.index > 1 ? ` ${input.index}` : ''}
                  {input.alt ? ' (Alt)' : ''}
                </button>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
);
