import {
  FormGroup,
  FormGroupField,
  FormGroupIcon,
  FormGroupLabel,
} from '@/shared/components/form/FormElements';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import FormField from '@/shared/components/form/FormHookField';
import { emailPattern } from '@/shared/utils/helpers';
import { EMAIL, REMEMBER_ME } from '@/shared/constants/storage';
import { Controller, useFormContext } from 'react-hook-form';
import PasswordField from '@/shared/components/form/Password';
import { AccountForgotPassword } from '@/shared/components/account/AccountElements';
import Link from 'next/link';
import { CheckBoxField } from '@/shared/components/form/FormCheckBox';
import { useTranslations } from 'next-intl';

export default function LoginFormGroup() {
  const t = useTranslations();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const localEmail = typeof window !== 'undefined' ? localStorage.getItem(EMAIL) : null;
  return (
    <>
      <FormGroup>
        <FormGroupLabel>{t('Shared.email')}</FormGroupLabel>
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
            defaultValue={typeof window !== 'undefined' ? localEmail : ''}
            placeholder={t('Shared.email')}
            isAboveError
          />
        </FormGroupField>
      </FormGroup>
      <FormGroup>
        <FormGroupLabel>{t('Shared.password')}</FormGroupLabel>
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
                placeholder={t('Shared.password')}
                keyIcon
                isAboveError
              />
            )}
            rules={{ required: t('Notifications.password.required') }}
            defaultValue=""
          />
          <AccountForgotPassword>
            <Link href="login">{t('LoginPage.forget-password')}</Link>
          </AccountForgotPassword>
        </FormGroupField>
      </FormGroup>
      <FormGroup>
        <FormGroupField>
          <Controller
            control={control}
            name="remember_me"
            defaultValue={
              typeof window !== 'undefined' ? localStorage.getItem(REMEMBER_ME) === 'true' : false
            }
            render={({ field: { onChange, value } }) => (
              <CheckBoxField
                name="remember_me"
                label={t('LoginPage.remember-me')}
                checked={value}
                onChange={onChange}
              />
            )}
          />
        </FormGroupField>
      </FormGroup>
    </>
  );
}
