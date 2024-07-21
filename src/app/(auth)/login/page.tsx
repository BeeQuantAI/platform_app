'use client';

import { useState } from 'react';
import {
  AccountCard,
  AccountContent,
  AccountWrap,
} from '@/shared/components/account/AccountElements';
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '@/graphql/auth';
import { AUTH_TOKEN, EMAIL } from '@/shared/constants/storage';
import { useSearchParams } from '@/hooks/useSearchParams';
import { useRouter } from 'next/navigation';
import LogInForm from './_components/LogInForm';
import AccountHeader from '../_components/AccountHeader';
import AccountFooter from '../_components/AccountFooter';

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const originUrl = useSearchParams().get('orgUrl');
  const [login] = useMutation(USER_LOGIN);

  const onSubmit = async (data: { email: string; password: string; remember_me: boolean }) => {
    const result = await login({
      variables: data,
    });
    if (result.data && result.data.login.code === 200) {
      // refresh store after login success
      // store.refetchHandler();
      if (typeof window !== 'undefined') {
        if (data.remember_me) {
          sessionStorage.setItem(AUTH_TOKEN, '');
          localStorage.setItem(EMAIL, data.email);
          localStorage.setItem(AUTH_TOKEN, result.data.login.data ?? '');
        } else {
          localStorage.setItem(EMAIL, '');
          localStorage.setItem(AUTH_TOKEN, '');
          sessionStorage.setItem(AUTH_TOKEN, result.data.login.data ?? '');
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
      setError(`Login failed: ${result.data?.login.message}`);
    }
  };

  return (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          <AccountHeader />
          <LogInForm onSubmit={onSubmit} error={error} />
          <AccountFooter isLogin={true} />
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

export default Login;
