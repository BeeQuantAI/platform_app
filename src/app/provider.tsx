'use client';

import { ApolloProvider } from '@apollo/client';
import { client } from 'boot/apollo';
import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { useUserContext } from '@/hooks/userHooks';
import GlobalStyles from '@/styles/globalStyles';
import { THEME } from '@/shared/constants/storage';
import StyledComponentsRegistry from './lib/registry';

interface Props {
  children: ReactNode;
}

// eslint-disable-next-line react/prop-types
const Providers: React.FC<Props> = ({ children }) => {
  const { store } = useUserContext();
  const themeColor = store.themeColor || localStorage.getItem(THEME) || 'dark';

  return (
    <ApolloProvider client={client}>
      <ThemeProvider
        theme={{
          mode: themeColor,
          direction: 'ltr',
          shadow: 'on',
          border: 'on',
        }}
      >
        <GlobalStyles />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default Providers;
