'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { USER_REGISTER } from '@/graphql/auth';
import { useTitle } from '@/hooks/useTitle';
import RegisterSuccess from 'module/auth/register-form/RegisterSuccess';
import RegisterForm from './RegisterFormGroup';

export default function FormLayout() {
  const [register] = useMutation(USER_REGISTER);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  useTitle('Register - BeeQuant');

  const onSubmit = async (data: {
    email: string;
    password: string;
    displayName: string;
    ref: string;
  }) => {
    const result = await register({
      variables: {
        input: data,
      },
    });

    if (result.data?.register.code === 200) {
      setIsRegistered(true);
    }
    // for register failed
    setError(`Register failed: ${result.data?.register.message}`);
  };

  if (isRegistered) {
    return <RegisterSuccess />;
  }

  return <RegisterForm onSubmit={onSubmit} error={error} />;
}
