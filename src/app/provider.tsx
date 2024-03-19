'use client';

import { ApolloProvider } from '@apollo/client';
import { client } from 'boot/apollo';
import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { useUserContext } from '@/hooks/userHooks';
import GlobalStyles from '@/styles/globalStyles';
import { THEME } from '@/shared/constants/storage';
import LoadUser from '@/shared/components/LoadUser';
import ScrollToTop from '@/styles/ScrollToTop';
import StyledComponentsRegistry from './lib/registry';

interface Props {
  children: ReactNode;
}

// eslint-disable-next-line react/prop-types
const Providers: React.FC<Props> = ({ children }) => {
  const { store } = useUserContext();
  // Todo: localStorage.getItem(THEME)  will produce localstorage undefined error
  const themeColor = store.themeColor || 'dark';

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
        <StyledComponentsRegistry>
          <ScrollToTop>
            <LoadUser>{children}</LoadUser>
          </ScrollToTop>
        </StyledComponentsRegistry>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default Providers;
