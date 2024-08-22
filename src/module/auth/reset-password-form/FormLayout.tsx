'use client';

import { useState, useEffect } from 'react';
import {
  AccountHaveAccount,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountTitle,
} from '@/shared/components/account/AccountElements';
import { useMutation } from '@apollo/client';
import { USER_RESET_PASSWORD } from '@/graphql/auth';
import { useTitle } from '@/hooks/useTitle';
import Link from 'next/link';
import styled from 'styled-components';
import { colorBlue } from '@/styles/palette';
import ResetPasswordFormGroup from './ResetPasswordFormGroup';
import ResetPasswordSuccess from './ResetPasswordSuccess';

// region STYLES
const BackToLogin = styled(AccountHaveAccount)`
  margin-top: 0;
`;

const FailMessage = styled.div`
  color: ${colorBlue};
  margin-bottom: 14px;
`;

export default function FormLayout() {
  const [resetPassword] = useMutation(USER_RESET_PASSWORD);
  const [step, setStep] = useState('form');
  const [token, setToken] = useState('');
  const [failMessage, setFailMessage] = useState('');

  useTitle('Reset Password - BeeQuant');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const extractedToken = urlParams.get('token');
    if (extractedToken) {
      setToken(extractedToken);
    }
  }, []);

  const onSuccess = async (data: { password: string }) => {
    try {
      const response = await resetPassword({
        variables: {
          input: {
            newPassword: data.password,
            resetToken: token,
          },
        },
      });

      if (response.data?.resetPassword?.code === 200) {
        setStep('success');
      }
      const message = response.data?.resetPassword?.message;
      setFailMessage(message || 'Password reset request failed.');
    } catch (e) {
      console.log('error:', e);
      setFailMessage('Password reset request failed.');
    }
  };

  if (step === 'success') {
    return <ResetPasswordSuccess />;
  }

  return (
    <>
      <AccountHead>
        <AccountTitle>
          Reset Password
          <br />
          <AccountLogo>
            BeeQuant
            <AccountLogoAccent> AI</AccountLogoAccent>
          </AccountLogo>
        </AccountTitle>
        <h4 className="subhead">Trading smart, trading with BeeQuant AI</h4>
      </AccountHead>
      {failMessage && (
        <FailMessage>
          <div>{failMessage}</div>
        </FailMessage>
      )}
      <ResetPasswordFormGroup onSuccess={onSuccess} />
      <BackToLogin>
        <p>
          Back to
          <span> </span>
          <Link href="/login">Login</Link>
        </p>
      </BackToLogin>
    </>
  );
}
