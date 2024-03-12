import { AUTH_TOKEN, REMEMBER_ME } from '../constants/storage';

const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
};

const isJWTExpired = (token: string) => {
  const { exp } = parseJwt(token);
  return exp * 1000 < new Date().getTime();
};

const isAuthenticated = (): boolean => {
  const remember_me = localStorage.getItem(REMEMBER_ME);
  let token;
  if (remember_me === 'true') {
    token = localStorage.getItem(AUTH_TOKEN);
  } else {
    token = sessionStorage.getItem(AUTH_TOKEN);
  }
  if (!token) return false;
  if (isJWTExpired(token)) return false;
  return true;
};

export { isAuthenticated, isJWTExpired };
