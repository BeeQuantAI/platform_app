import { AUTH_TOKEN, AUTH_STATUS } from '@/shared/constants/storage';
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_DEV_SERVER_URL,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN) : null;
  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const responseLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (typeof window !== 'undefined') {
      const context = operation.getContext();
      const newAccessToken = context.response.headers.get('x-new-access-token');
      const isRefreshTokenExpired = context.response.headers.get('x-auth-status');
      console.log('newAccessToken from backend', newAccessToken);
      console.log('isRefreshTokenExpired from backend', isRefreshTokenExpired);
      newAccessToken && localStorage.setItem(AUTH_TOKEN, newAccessToken);
      isRefreshTokenExpired && localStorage.setItem(AUTH_STATUS, isRefreshTokenExpired);
    }
    return response;
  });
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, responseLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
