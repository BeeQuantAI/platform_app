'use client';

import { ApolloProvider } from '@apollo/client';
import { client } from 'boot/apollo';
import { ReactNode } from 'react';
import ScrollToTop from '@/styles/ScrollToTop';
import I18nWrapper from '@/i18n/I18n-wrapper';
import LoadUser from '../shared/components/LoadUser';
import StyledComponentsRegistry from './_lib/registry';

interface Props {
  children: ReactNode;
}

// eslint-disable-next-line react/prop-types
const Providers: React.FC<Props> = ({ children }) => (
  <ApolloProvider client={client}>
    <StyledComponentsRegistry>
      <ScrollToTop>
        <LoadUser>
          <I18nWrapper>{children}</I18nWrapper>
        </LoadUser>
      </ScrollToTop>
    </StyledComponentsRegistry>
  </ApolloProvider>
);

export default Providers;
