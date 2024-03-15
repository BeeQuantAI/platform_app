'use client';

import { ApolloProvider } from '@apollo/client';
import { client } from 'boot/apollo';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Providers;
