import { Html } from '@elysiajs/html';

const DEFAULT_COLORS = {
  backgroundColor: '#1D1D1E',
  displayIconLabelColor: '#373738',
  displayNameLabelColor: '#FFF',
  switchButtonBackgroundColor: '#27272B',
  switchButtonColor: '#FFF',
  switchButtonBorderColor: '#333',
  displayErrorColor: '#FF3B30',
} as const;

export const THEMES = {
  'theme-a': {
    ...DEFAULT_COLORS,
    displayColor: '#3FB012',
    switchButtonActiveBackgroundColor: '#37841A',
  },
  'theme-b': {
    ...DEFAULT_COLORS,
    displayColor: '#6C6DD9',
    switchButtonActiveBackgroundColor: '#6566BA',
  },
};

export type Theme = keyof typeof THEMES;

export type ColorsCssVarsProps = {
  theme: Theme;
};

export const renderColorsCssVars = ({ theme }: ColorsCssVarsProps): JSX.Element => {
  const vars = Object.entries(THEMES[theme])
    .map(([key, value]) => {
      const dashedKey = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
      return `--${dashedKey}: ${value};`;
    })
    .join('\n');

  return (
    <style>
      {`:root {
        ${vars}
      }`}
    </style>
  );
};
