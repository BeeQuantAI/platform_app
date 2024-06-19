'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { USER_CHANGE_PASSWORD } from '@/graphql/auth';
import ChangePasswordForm from './_components/ChangePasswordForm';

const ChangePassword = () => {
  const [changePassword] = useMutation(USER_CHANGE_PASSWORD);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (data: { oldPassword: string; newPassword: string }) => {
    const result = await changePassword({
      variables: {
        input: data,
      },
    });

    if (result.data.changePassword.code === 200) {
      setSuccess('Password changed successfully!');
      setError('');
    } else {
      setError(`Change password failed: ${result.data.changePassword.message}`);
      setSuccess('');
    }
  };

  return <ChangePasswordForm onSubmit={onSubmit} success={success} error={error} />;
};

export default ChangePassword;
