import { useQuery } from '@apollo/client';
import { useAppContext, connectFactory } from '@/shared/utils/contextFactory';
import { GET_USER } from '@/graphql/user';
import { IUser } from '@/shared/utils/types';

import { useLocation, useHistory } from 'react-router-dom';

const KEY = 'userInfo';
const DEFAULT_VALUE = {};

export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

/**
 *  Hooks for loading basic user information
 */
export const useLoadUser = () => {
  const { setStore } = useUserContext();
  const location = useLocation();
  const history = useHistory();
  const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: (data) => {
      if (data.getUserInfo) {
        const { id, displayName } = data.getUserInfo;
        setStore({
          id,
          displayName,
          refetchHandler: refetch,
        });
        if (location.pathname === '/login') {
          history.push(`/dashboard`);
        }
        return;
      }
    },
    onError: () => {
      setStore({
        refetchHandler: refetch,
      });
      console.log('failed retrieving user info, backing to login');
      if (location.pathname !== '/login') {
        history.push(`/login?orgUrl=${location.pathname}`);
      }
    },
  });

  return { loading, refetch };
};
