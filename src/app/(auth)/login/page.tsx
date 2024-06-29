'use client';

import { useState, useEffect } from 'react';
import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import {
  AccountCard,
  AccountContent,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountOr,
  AccountSocial,
  AccountSocialButtonFacebook,
  AccountSocialButtonGoogle,
  AccountTitle,
  AccountWrap,
} from '@/shared/components/account/AccountElements';
import { useMutation, useQuery } from '@apollo/client';
import { USER_LOGIN, GET_GOOGLE_OAUTH_URL, GOOGLE_LOGIN } from '@/graphql/auth';
import { AUTH_TOKEN, EMAIL } from '@/shared/constants/storage';
import { useSearchParams } from '@/hooks/useSearchParams';
import { useRouter } from 'next/navigation';
import LogInForm from './_components/LogInForm';

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const originUrl = useSearchParams().get('orgUrl');
  const [login] = useMutation(USER_LOGIN);
  const getOAuthUrlQuery = useQuery(GET_GOOGLE_OAUTH_URL);
  const [googleLogin] = useMutation(GOOGLE_LOGIN);

  const onSubmit = async (data: { email: string; password: string; remember_me: boolean }) => {
    const result = await login({
      variables: data,
    });
    if (result.data.login.code === 200) {
      // refresh store after login success
      // store.refetchHandler();
      if (typeof window !== 'undefined') {
        if (data.remember_me) {
          sessionStorage.setItem(AUTH_TOKEN, '');
          localStorage.setItem(EMAIL, data.email);
          localStorage.setItem(AUTH_TOKEN, result.data.login.data);
        } else {
          localStorage.setItem(EMAIL, '');
          localStorage.setItem(AUTH_TOKEN, '');
          sessionStorage.setItem(AUTH_TOKEN, result.data.login.data);
        }
      }
      if (originUrl && originUrl !== '/') {
        // history.push(originUrl);
        router.back();
      } else {
        router.push('dashboard');
      }
    } else {
      // for login failed
      setError(`Login failed: ${result.data.login.message}`);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      googleLogin({
        variables: { code },
      })
        .then((result) => {
          if (result.data.googleLogin.code === 200) {
            if (typeof window !== 'undefined') {
              localStorage.setItem(EMAIL, '');
              localStorage.setItem(AUTH_TOKEN, '');
              sessionStorage.setItem(AUTH_TOKEN, result.data.googleLogin.data);
            }
            if (originUrl && originUrl !== '/') {
              router.back();
            } else {
              router.push('dashboard');
            }
          } else {
            setError(`Google account sign in failed: ${result.data.googleLogin.message}`);
          }
        })
        .catch((err) => setError(`Google account sign in failed: ${err.message}`));
    }
  }, []);

  // useEffect(() => {
  //   const fetchAndAuthenticateUser = async () => {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const code = urlParams.get('code');
  //     if (!code) return;
  //     try {
  //       const getUserRes = await getGoogleUser({ variables: { code } });
  //       const userData = getUserRes.data.getGoogleUser;
  //       if (userData) {
  //         const loginResult = await googleLogin({
  //           variables: { userData }
  //         });
  //         if (loginResult.data.googleLogin.code === 200) {
  //           if (typeof window !== 'undefined') {
  //             localStorage.setItem('EMAIL', userData.email);
  //             localStorage.setItem('AUTH_TOKEN', userData.accessToken);
  //             sessionStorage.setItem('AUTH_TOKEN', loginResult.data.googleLogin.data);
  //           }
  //           if (originUrl && originUrl !== '/') {
  //             router.back();
  //           } else {
  //             router.push('/dashboard');
  //           }
  //         } else {
  //           setError(`Google account sign in failed: ${loginResult.data.googleLogin.message}`);
  //         }
  //       }
  //     } catch (err) {
  //       setError(`Google account sign in failed: ${err}`);
  //     }
  //   };
  //   fetchAndAuthenticateUser();
  // }, [getGoogleUser, googleLogin, router]);

  const handleGoogleLogin = () => {
    window.location.href = getOAuthUrlQuery.data.getGoogleOAuthUrl;
  };

  return (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          <AccountHead>
            <AccountTitle>
              Welcome to
              <br />
              <AccountLogo>
                BeeQuant
                <AccountLogoAccent> AI</AccountLogoAccent>
              </AccountLogo>
            </AccountTitle>
            <h4 className="subhead">Trading smart, trading with BeeQuant AI</h4>
          </AccountHead>
          <LogInForm onSubmit={onSubmit} error={error} />
          <AccountOr>
            <p>Or Easily Using</p>
          </AccountOr>
          <AccountSocial>
            {/* @ts-ignore - Ignoring because of complex union types incorrectly inferred */}
            <AccountSocialButtonFacebook
              className="account__social-btn account__social-btn--facebook"
              to="/login"
            >
              <FacebookIcon />
            </AccountSocialButtonFacebook>
            {/* <AccountSocialButtonGoogle to="http://localhost:3000/auth/google"> */}
            <AccountSocialButtonGoogle onClick={handleGoogleLogin}>
              <GooglePlusIcon />
            </AccountSocialButtonGoogle>
          </AccountSocial>
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

export default Login;
