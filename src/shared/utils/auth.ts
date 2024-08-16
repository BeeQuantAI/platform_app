import { AUTH_STATUS } from '../constants/storage';

const isAuthenticated = (): boolean => {
  const isRefreshTokenExpired =
    typeof window !== 'undefined' ? localStorage.getItem(AUTH_STATUS) : null;
  return isRefreshTokenExpired !== 'invalid';
};

export { isAuthenticated };
