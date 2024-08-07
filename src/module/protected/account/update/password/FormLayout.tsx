'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { USER_CHANGE_PASSWORD } from '@/graphql/auth';
import { FormButtonToolbar, FormContainer } from '@/shared/components/form/FormElements';
import ChangePasswordSuccess from './ChangePasswordSuccess';
import { Alert } from 'react-bootstrap';
import { Button } from '@/shared/components/Button';
import { useForm, Controller } from 'react-hook-form';
import FormPasswordInput from '@/shared/components/form/FormPasswordInput';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordCompareErrorMsgs, PasswordErrorMsgs } from '@/shared/utils/helpers';

type FormData = { oldPassword: string; newPassword: string; repeatNewPassword: string };

export default function FormLayout() {
  const [changePassword] = useMutation(USER_CHANGE_PASSWORD);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const passwordSchema = z
    .string()
    .min(1, { message: PasswordErrorMsgs.Required })
    .min(8, { message: PasswordErrorMsgs.MinLength })
    .max(32, { message: PasswordErrorMsgs.MaxLength })
    .regex(
      /^(?=.*[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_+=\\~<>:;”’(),./[\]_`|{}-])[A-Za-z0-9#?!@$%^&*_+=\\~<>:;”’(),./[\]_`|{}-]+$/,
      { message: PasswordErrorMsgs.Invalid }
    );

  const updatePasswordSchema = z
    .object({
      oldPassword: passwordSchema,
      newPassword: passwordSchema,
      repeatNewPassword: passwordSchema,
    })
    .refine(({ newPassword, repeatNewPassword }) => newPassword === repeatNewPassword, {
      message: PasswordCompareErrorMsgs.NotMatch,
      path: ['repeatNewPassword'],
    });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { oldPassword: '', newPassword: '', repeatNewPassword: '' },
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: FormData) => {
    const { oldPassword, newPassword } = data;
    const result = await changePassword({
      variables: {
        input: { oldPassword, newPassword },
      },
    });

    if (result.data?.changePassword.code === 200) {
      setSuccess('Password changed successfully!');
      setError('');
    } else {
      setError(`Change password failed: ${result.data?.changePassword.message}`);
      setSuccess('');
    }
  };
  return (
    <FormContainer $horizontal onSubmit={handleSubmit(onSubmit)}>
      <ChangePasswordSuccess success={success} />
      <Alert variant="danger" show={!!error}>
        {error}
      </Alert>
      <Controller
        name="oldPassword"
        control={control}
        render={({ field }) => (
          <FormPasswordInput
            placeholder="Old Password"
            errors={errors}
            field={field}
            isAboveError
          />
        )}
      />
      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <FormPasswordInput
            placeholder="New Password"
            errors={errors}
            field={field}
            isAboveError
          />
        )}
      />
      <Controller
        name="repeatNewPassword"
        control={control}
        render={({ field }) => (
          <FormPasswordInput
            placeholder="Repeat New Password"
            errors={errors}
            field={field}
            isAboveError
          />
        )}
      />
      <FormButtonToolbar>
        {/* eslint-disable-next-line max-len */}
        {/* @ts-ignore - Ignoring because of complex union types that are not correctly inferred */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </FormButtonToolbar>
    </FormContainer>
  );
}
