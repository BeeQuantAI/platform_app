'use client';

import { USER_LOGIN } from '@/graphql/auth';
import { useSearchParams } from '@/hooks/useSearchParams';
import { AccountButton, LoginForm } from '@/shared/components/account/AccountElements';
import { AUTH_TOKEN, EMAIL, STAY_SIGNED_IN } from '@/shared/constants/storage';
import { useRouter } from 'next/navigation';
import { useSearchParams } from '@/hooks/useSearchParams';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import LoginFormGroup from './LoginFormGroup';

type LoginData = { email: string; password: string; stay_signed_in: boolean };

const FormLayout = () => {
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      stay_signed_in: false,
    },
  });
  const { handleSubmit, watch } = methods;

  const staySignedIn = watch('stay_signed_in');

  useEffect(() => {
    if (staySignedIn !== undefined && typeof window !== 'undefined') {
      localStorage.setItem(STAY_SIGNED_IN, staySignedIn.toString());
    }
  }, [staySignedIn]);

  const router = useRouter();
  const [error, setError] = useState('');
  const originUrl = useSearchParams().get('orgUrl');
  const [login] = useMutation(USER_LOGIN);

  const onSubmit = async (data: LoginData) => {
    const result = await login({
      variables: data,
    });
    if (result.data && result.data.login.code === 200) {
      // refresh store after login success
      // store.refetchHandler();
      if (typeof window !== 'undefined') {
        if (data.stay_signed_in) {
          localStorage.setItem(EMAIL, data.email);
        } else {
          localStorage.setItem(EMAIL, '');
        }
        localStorage.setItem(AUTH_TOKEN, result.data.login.data ?? '');
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
    <FormProvider {...methods}>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Alert className="w-100" variant="danger" show={!!error}>
          {error}
        </Alert>
        <LoginFormGroup />
        {/* @ts-ignore - Ignoring because of complex union types that are not correctly inferred */}
        <AccountButton variant="primary" type="submit">
          Sign In
        </AccountButton>
        <Link href="/register" passHref className="w-100">
          <AccountButton variant="outline-primary">Create Account</AccountButton>
        </Link>
      </LoginForm>
    </FormProvider>
  );
};

export default FormLayout;
