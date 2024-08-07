import { IS_REFRESH_TOKEN_EXPIRED } from '../constants/storage';

const isAuthenticated = (): boolean => {
  const isRefreshTokenExpired =
    typeof window !== 'undefined' ? localStorage.getItem(IS_REFRESH_TOKEN_EXPIRED) : null;
  console.log('isRefreshTokenExpired', isRefreshTokenExpired);
  return isRefreshTokenExpired !== 'true';
};

export { isAuthenticated };
