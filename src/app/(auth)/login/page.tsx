'use client';

import { useState } from 'react';
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
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '@/graphql/auth';
import { AUTH_TOKEN, EMAIL } from '@/shared/constants/storage';
import { useSearchParams } from '@/hooks/useSearchParams';
import { useUserContext } from '@/hooks/userHooks';
import LogInForm from './components/LogInForm';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const originUrl = useSearchParams().get('orgUrl');
  const [login] = useMutation(USER_LOGIN);
  const { store } = useUserContext();

  const onSubmit = async (data: { email: string; password: string; remember_me: boolean }) => {
    const result = await login({
      variables: data,
    });
    if (result.data.login.code === 200) {
      // refresh store after login success
      store.refetchHandler();
      if (data.remember_me) {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(EMAIL, data.email);
        localStorage.setItem(AUTH_TOKEN, result.data.login.data);
      } else {
        localStorage.setItem(EMAIL, '');
        localStorage.setItem(AUTH_TOKEN, '');
        sessionStorage.setItem(AUTH_TOKEN, result.data.login.data);
      }

      if (originUrl && originUrl !== '/') {
        // history.push(originUrl);
        router.back();
      } else {
        router.push('/home');
        // go(ROUTE_KEY.HOME);
      }
    }
    // for login failed
    setError(`Login failed: ${result.data.login.message}`);
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
            {/* @ts-ignore - Ignoring because of complex union types that are not correctly inferred */}
            <AccountSocialButtonFacebook
              className="account__social-btn account__social-btn--facebook"
              to="/login"
            >
              <FacebookIcon />
            </AccountSocialButtonFacebook>
            <AccountSocialButtonGoogle to="/login">
              <GooglePlusIcon />
            </AccountSocialButtonGoogle>
          </AccountSocial>
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

export default Login;