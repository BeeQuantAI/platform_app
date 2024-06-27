import { MainWrapperProps } from '@/containers/App/MainWrapper';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ReactNode } from 'react';
import { THEME } from '../constants/storage';

// Import the theme object and ThemeProvider

const MockThemeProvider = ({ children }: MainWrapperProps) => {
  const themeColor = localStorage.getItem(THEME) || 'dark';

  return (
    <ThemeProvider
      theme={{
        mode: themeColor,
        direction: 'ltr',
        shadow: 'on',
        border: 'on',
      }}
    >
      {children}
    </ThemeProvider>
  );
};

// eslint-disable-next-line max-len
const customRender = (ui: ReactNode, options = {}) =>
  render(ui, { wrapper: MockThemeProvider, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
