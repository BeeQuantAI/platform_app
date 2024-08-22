'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { AccountButton, AccountHaveAccount } from '@/shared/components/account/AccountElements';
import { FormContainer } from '@/shared/components/form/FormElements';
import { FormProvider, useForm } from 'react-hook-form';
import Link from 'next/link';
import styled from 'styled-components';
import { colorBlue } from '@/styles/palette';
import { USER_FORGOT_PASSWORD } from '@/graphql/auth';
import { useTitle } from '@/hooks/useTitle';
import ForgotPasswordFormGroup from './ForgotPasswordFormGroup';

type FormData = { email: string };

// region STYLES
const BackToLogin = styled(AccountHaveAccount)`
  margin-top: 0;
`;

const ResponseMessage = styled.div`
  color: ${colorBlue};
  margin-bottom: 14px;
`;

const FormLayout = () => {
  useTitle('Forgot Password - BeeQuant');

  const [responseMessage, setResponseMessage] = useState('');
  const [forgotPassword] = useMutation(USER_FORGOT_PASSWORD);

  const methods = useForm({
    defaultValues: {
      email: '',
    },
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: FormData) => {
    try {
      await forgotPassword({
        variables: {
          email: data.email,
        },
      });
      setResponseMessage(
        'If the email is associated with an account, a reset email will be sent shortly. Please check your mailbox.'
      );
    } catch (err) {
      console.error('Error during password reset request:', err);
      setResponseMessage(
        'An error occurred while processing your request. Please try again later.'
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {responseMessage && (
          <ResponseMessage>
            <div>{responseMessage}</div>
          </ResponseMessage>
        )}
        <ForgotPasswordFormGroup />
        <AccountButton type="submit" variant="primary">
          Submit
        </AccountButton>
      </FormContainer>
      <BackToLogin>
        <p>
          Back to
          <span> </span>
          <Link href="/login">Login</Link>
        </p>
      </BackToLogin>
    </FormProvider>
  );
};

export default FormLayout;
