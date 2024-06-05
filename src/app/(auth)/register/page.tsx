'use client';

import { useState } from 'react';
import {
  AccountCard,
  AccountContent,
  AccountHaveAccount,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountTitle,
  AccountWrap,
} from '@/shared/components/account/AccountElements';
import { useMutation } from '@apollo/client';
import { USER_REGISTER } from '@/graphql/auth';
import { useTitle } from '@/hooks/useTitle';
import Link from 'next/link';
import Loading from '@/shared/components/Loading';
import RegisterForm from './_components/RegisterForm';
import RegisterSuccess from './_components/RegisterSuccess';

const Register = () => {
  const [register] = useMutation(USER_REGISTER);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  useTitle('Register - BeeQuant');

  const onSubmit = async (data: {
    email: string;
    password: string;
    displayName: string;
    ref: string;
  }) => {
    setIsLoading(true);
    const result = await register({
      variables: {
        input: data,
      },
    });

    if (result.data.register.code === 200) {
      setIsRegistered(true);
      setIsLoading(false);
    }
    // for register failed
    setError(`Register failed: ${result.data.register.message}`);
    setIsLoading(false);
  };

  if (isRegistered) {
    return <RegisterSuccess />;
  }

  if (isLoading) {
    return <Loading />;
  }

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
          <RegisterForm onSubmit={onSubmit} error={error} />
          <AccountHaveAccount>
            <p>
              Already have an account?
              <Link href="/login">Login</Link>
            </p>
          </AccountHaveAccount>
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

export default Register;
