import { Html } from '@elysiajs/html';
import { getDisplayIcon } from './icons';
import { THEMES, type Theme } from './colors';
import type { DisplayInputInfo } from '../inputs';
import type { DisplayInfo } from '../client';

export type RenderDisplayInputOptionsProps = {
  displayIndex: number;
  inputId: number;
  inputs: DisplayInputInfo[];
};

export const renderDisplayInputOptions = ({
  displayIndex,
  inputId,
  inputs,
}: RenderDisplayInputOptionsProps): JSX.Element => {
  const targetId = `display-${displayIndex}-options`;

  return (
    <ul class="display-inputs" id={targetId}>
      {inputs.map((input) => (
        <li class="display-input">
          <button
            type="button"
            class="display-input-button"
            data-selected={input.id === inputId}
            hx-post={`/api/switch/${displayIndex}/${input.id}`}
            hx-swap="outerHTML"
            hx-target={`#${targetId}`}
          >
            {input.shortName || input.name}
            {input.index > 1 ? ` ${input.index}` : ''}
            {input.alt ? ' (Alt)' : ''}
          </button>
        </li>
      ))}
    </ul>
  );
};

const KNOWN_ERRORS = [
  {
    exp: /Failed to read from the pipe/i,
    message: 'Failed to connect with the bridge',
  },
];

let LAST_KNOWN_DISPLAYS: DisplayInfo[] = [];
const ensureDisplays = (displays: DisplayInfo[]): DisplayInfo[] => {
  if (!displays.length && LAST_KNOWN_DISPLAYS.length) {
    const result = LAST_KNOWN_DISPLAYS;
    LAST_KNOWN_DISPLAYS = [];
    return result;
  }

  LAST_KNOWN_DISPLAYS = displays;
  return displays;
};

export type RenderAppProps = {
  displays: DisplayInfo[];
  inputs: DisplayInputInfo[];
  theme: Theme;
  error?: string;
};

export const renderApp = ({
  displays,
  inputs,
  theme,
  error,
}: RenderAppProps): JSX.Element => {
  const colors = THEMES[theme];
  let useError = error;
  if (useError) {
    const knownError = KNOWN_ERRORS.find(({ exp }) => useError!.match(exp));
    if (knownError) {
      useError = knownError.message;
    }
  } else if (displays.length === 0) {
    useError = 'No displays found';
  }
  const useDisplays = ensureDisplays(displays);

  return (
    <div id="app">
      <ul class="displays">
        {useError && (
          <li class="display">
            <div class="display-icon-container">
              <div id="error-icon" class="display-icon">
                <span>!</span>
                {getDisplayIcon({ displayBackgroundColor: colors.displayErrorColor })}
              </div>
            </div>
            <span class="display-name">{useError}</span>
          </li>
        )}
        {!useError &&
          useDisplays.map((display) => (
            <li class="display">
              <div class="display-icon-container">
                <div id={`${display.id}-icon`} class="display-icon">
                  <span>{display.index}</span>
                  {getDisplayIcon({ displayBackgroundColor: colors.displayColor })}
                </div>
              </div>
              <span class="display-name">{display.name}</span>
              {renderDisplayInputOptions({
                displayIndex: display.index,
                inputId: display.input.id,
                inputs,
              })}
            </li>
          ))}
      </ul>
    </div>
  );
};
