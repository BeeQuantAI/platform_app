import { AUTH_TOKEN, IS_REFRESH_TOKEN_EXPIRED } from '@/shared/constants/storage';
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_DEV_SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN) : null;
  console.log('last token', token);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const responseLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (typeof window !== 'undefined') {
      const context = operation.getContext();
      const newAccessToken = context.response.headers.get('x-new-access-token');
      const isRefreshTokenExpired = context.response.headers.get('x-refresh-token-expired');
      console.log('newAccessToken from backend', newAccessToken);
      console.log('isRefreshTokenExpired from backend', isRefreshTokenExpired);
      newAccessToken && localStorage.setItem(AUTH_TOKEN, newAccessToken);
      isRefreshTokenExpired &&
        localStorage.setItem(IS_REFRESH_TOKEN_EXPIRED, isRefreshTokenExpired);
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
