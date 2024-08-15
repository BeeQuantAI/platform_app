'client';
import { useState } from 'react';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import PasswordField from '@/shared/components/form/Password';
import {
  FormContainer,
  FormGroup,
  FormGroupField,
  FormGroupIcon,
  FormGroupLabel,
} from '@/shared/components/form/FormElements';
import { displayNamePatten, emailPattern, passwordPatten } from '@/shared/utils/helpers';
import { marginLeft } from '@/styles/directions';
import {
  AccountButton,
  AccountButtons,
  LastFormGroup,
} from '@/shared/components/account/AccountElements';
import { Controller, useForm } from 'react-hook-form';
import FormField from '@/shared/components/form/FormHookField';
import { config } from '@/config/config';
import { useTranslations } from 'next-intl';

const { referenceName } = config;

const defaultReferenceName = referenceName;

type RegisterFormProps = {
  onSubmit: (data: any) => void;
  error: string;
};

type IsFocused = {
  displayName: boolean;
  email: boolean;
  password: boolean;
  repeatPassword: boolean;
  ref: boolean;
};

const RegisterForm = ({ onSubmit, error = '' }: RegisterFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const pwd = watch('password');
  const t = useTranslations();

  const prepareFormData = (data: any) => {
    const { repeatPassword, ...formData } = data;
    onSubmit(formData);
  };

  const [isFocused, setIsFocused] = useState<IsFocused>({
    displayName: false,
    email: false,
    password: false,
    repeatPassword: false,
    ref: false,
  });

  const handleFocus = (fieldName: string) => {
    setIsFocused((prevIsFocused) => ({
      ...prevIsFocused,
      [fieldName]: true,
    }));
  };

  const handleBlur = (fieldName: string) => {
    setIsFocused((prevIsFocused) => ({
      ...prevIsFocused,
      [fieldName]: false,
    }));
  };

  return (
    <FormContainer onSubmit={handleSubmit(prepareFormData)}>
      <Alert variant="danger" show={!!error}>
        {error}
      </Alert>
      <FormGroup>
        <FormGroupLabel>
          {t('Shared.displayName', { optional: 'true' })}
          <span>{isFocused.displayName && t('Notifications.displayName.description')}</span>
        </FormGroupLabel>
        <FormGroupField>
          <FormGroupIcon>
            <AccountOutlineIcon />
          </FormGroupIcon>
          <FormField
            name="displayName"
            control={control}
            component="input"
            errors={errors}
            rules={{
              pattern: {
                value: displayNamePatten,
                message: t('Notifications.displayName.invalid'),
              },
            }}
            defaultValue=""
            placeholder={t('Shared.displayName', { optional: 'false' })}
            isAboveError
            onFocus={() => handleFocus('displayName')}
            onBlur={() => handleBlur('displayName')}
          />
        </FormGroupField>
      </FormGroup>
      <FormGroup>
        <FormGroupLabel>
          {t('Shared.email')}
          <span>{isFocused.email && ''}</span>
        </FormGroupLabel>
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
              required: t('Notifications.email.required'),
              pattern: {
                value: emailPattern,
                message: t('Notifications.email.invalid'),
              },
            }}
            defaultValue=""
            placeholder={t('Shared.email')}
            isAboveError
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
          />
        </FormGroupField>
      </FormGroup>
      <FormGroup>
        <FormGroupLabel>
          {t('Shared.password')}
          <span>{isFocused.password && t('Notifications.password.description')}</span>
        </FormGroupLabel>
        <FormGroupField>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <PasswordField
                input={{ ...field, onBlur: () => handleBlur(field.name) }}
                meta={{
                  touched: !!fieldState.error,
                  error: fieldState.error?.message,
                }}
                placeholder={t('Shared.password')}
                keyIcon
                isAboveError
                onFocus={() => handleFocus(field.name)}
              />
            )}
            rules={{
              required: t('Notifications.password.required'),
              pattern: {
                value: passwordPatten,
                message: t('Notifications.password.invalid'),
              },
            }}
            defaultValue=""
          />
        </FormGroupField>
      </FormGroup>
      <FormGroup>
        <FormGroupLabel>
          {t('Shared.repeatPassword')}
          <span>{isFocused.repeatPassword && ''}</span>
        </FormGroupLabel>
        <FormGroupField>
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field, fieldState }) => (
              <PasswordField
                input={field}
                meta={{
                  touched: !!fieldState.error,
                  error: fieldState.error?.message,
                }}
                placeholder={t('Shared.repeatPassword')}
                keyIcon
                isAboveError
              />
            )}
            rules={{
              required: t('Notifications.password.required'),
              validate: (value) => value === pwd || t('Notifications.password.notMatch'),
            }}
            defaultValue=""
          />
        </FormGroupField>
      </FormGroup>
      <LastFormGroup>
        <FormGroupLabel>{t('Shared.ref')}</FormGroupLabel>
        <FormGroupField>
          <FormGroupIcon>
            <AccountOutlineIcon />
          </FormGroupIcon>
          <FormField
            name="ref"
            control={control}
            component="input"
            errors={errors}
            rules={{
              required: t('Notifications.ref.required'),
            }}
            defaultValue={defaultReferenceName}
            placeholder={t('Shared.ref')}
            isAboveError
            disabled
          />
        </FormGroupField>
      </LastFormGroup>
      <RegisterButtons>
        {/* @ts-ignore - Ignoring because of complex union types that are not correctly inferred */}
        <AccountButton type="submit" variant="primary">
          {t('RegisterPage.signUp')}
        </AccountButton>
      </RegisterButtons>
    </FormContainer>
  );
};

export default RegisterForm;

// region STYLES
const RegisterButtons = styled(AccountButtons)`
  ${marginLeft}: 0!important;
  margin-bottom: 20px;

  button {
    margin-bottom: 0;
  }
`;

// endregion
