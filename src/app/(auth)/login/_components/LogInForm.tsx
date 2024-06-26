'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Alert } from 'react-bootstrap';
import Link from 'next/link';
import PasswordField from '@/shared/components/form/Password';
import {
  FormGroup,
  FormGroupField,
  FormGroupIcon,
  FormGroupLabel,
} from '@/shared/components/form/FormElements';
import FormField from '@/shared/components/form/FormHookField';
import {
  AccountButton,
  AccountForgotPassword,
  LoginForm,
} from '@/shared/components/account/AccountElements';
import { emailPattern } from '@/shared/utils/helpers';
import { CheckBoxField } from '@/shared/components/form/FormCheckBox';
import { EMAIL, REMEMBER_ME } from '@/shared/constants/storage';

type LogInFormProps = {
  onSubmit: (data: any) => void;
  error: string;
};

const LogInForm = ({ onSubmit, error = '' }: LogInFormProps) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const rememberMe = watch('rememberMe');

  useEffect(() => {
    if (rememberMe !== undefined && typeof window !== 'undefined') {
      localStorage.setItem(REMEMBER_ME, rememberMe);
    }
  }, [rememberMe]);

  const localEmail = typeof window !== 'undefined' ? localStorage.getItem(EMAIL) : null;

  return (
    <LoginForm onSubmit={handleSubmit(onSubmit)}>
      <Alert className="w-100" variant="danger" show={!!error}>
        {error}
      </Alert>
      <FormGroup>
        <FormGroupLabel>Email</FormGroupLabel>
        <FormGroupField>
          <FormGroupIcon>
            <AccountOutlineIcon />
          </FormGroupIcon>
          <FormField
            name="email"
            control={control}
            component="input"
            errors={errors}
            rules={{
              required: 'This is required field',
              pattern: {
                value: emailPattern,
                message: 'Entered value does not match email format',
              },
            }}
            defaultValue={typeof window !== 'undefined' ? localEmail : ''}
            placeholder="Email"
            isAboveError
          />
        </FormGroupField>
      </FormGroup>
      <FormGroup>
        <FormGroupLabel>Password</FormGroupLabel>
        <FormGroupField>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <PasswordField
                input={field}
                meta={{
                  touched: !!fieldState.error,
                  error: fieldState.error?.message,
                }}
                placeholder="Password"
                keyIcon
                isAboveError
              />
            )}
            rules={{ required: 'This is required field' }}
            defaultValue=""
          />
          <AccountForgotPassword>
            <Link href="login">Forgot a password?</Link>
          </AccountForgotPassword>
        </FormGroupField>
      </FormGroup>
      <FormGroup>
        <FormGroupField>
          <Controller
            control={control}
            name="remember_me"
            defaultValue={
              typeof window !== 'undefined' ? localStorage.getItem(REMEMBER_ME) === 'true' : ''
            }
            render={({ field: { onChange, value } }) => (
              <CheckBoxField
                name="remember_me"
                label="Remember me"
                checked={value}
                onChange={onChange}
              />
            )}
          />
        </FormGroupField>
      </FormGroup>
      {/* @ts-ignore - Ignoring because of complex union types that are not correctly inferred */}
      <AccountButton variant="primary" type="submit">
        Sign In
      </AccountButton>
      <AccountButton variant="outline-primary" to="/register">
        <Link href="register">Create Account</Link>
      </AccountButton>
    </LoginForm>
  );
};

export default LogInForm;
