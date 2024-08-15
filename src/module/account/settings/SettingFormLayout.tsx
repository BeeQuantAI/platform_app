'use client';

import { FormButtonToolbar, FormContainer } from '@/shared/components/form/FormElements';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/Button';
import * as z from 'zod';
import FormInput from './_component/FormInput/FormInput';
import { useTranslations } from 'next-intl';

function SettingFormLayout() {
  const t = useTranslations();
  const formSchema = z.object({
    displayName: z
      .string()
      .min(1, { message: t('Notifications.displayName.required') })
      .min(4, { message: t('Notifications.displayName.minLength') })
      .max(15, { message: t('Notifications.displayName.maxLength') })
      .regex(/^[a-zA-Z0-9-_]+$/, {
        message: t('Notifications.displayName.invalid'),
      }),
    email: z
      .string()
      .min(1, { message: t('Notifications.email.required') })
      .email({ message: t('Notifications.email.invalid') }),
    ref: z.string().min(1, { message: t('Notifications.ref.required') }),
  });

  // const t = useTranslations('SettingPage');
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      realName: '',
      displayName: '',
      email: '',
      mobile: '',
      ref: 'admin',
      test: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log('data:', data);
  };

  return (
    <FormContainer $horizontal onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="realName"
        control={control}
        render={({ field, formState: { errors } }) => (
          <FormInput
            placeholder={t('SettingPage.realName')}
            isAboveError
            errors={errors}
            field={field}
          />
        )}
      />
      <Controller
        name="displayName"
        control={control}
        render={({ field, formState: { errors } }) => (
          <FormInput
            placeholder={t('Shared.displayName', { optional: false })}
            isAboveError
            errors={errors}
            field={field}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field, formState: { errors } }) => (
          <FormInput placeholder={t('Shared.email')} isAboveError errors={errors} field={field} />
        )}
      />
      <Controller
        name="mobile"
        control={control}
        render={({ field, formState: { errors } }) => (
          <FormInput
            placeholder={t('SettingPage.mobile')}
            isAboveError
            errors={errors}
            field={field}
          />
        )}
      />
      <Controller
        name="ref"
        control={control}
        render={({ field, formState: { errors } }) => (
          <FormInput placeholder={t('Shared.ref')} isAboveError errors={errors} field={field} />
        )}
      />
      <FormButtonToolbar>
        {/* @ts-ignore - Ignoring because of complex union types incorrectly inferred */}
        <Button variant="primary" type="submit">
          {t('SettingPage.submit')}
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            reset();
          }}
        >
          {t('SettingPage.cancel')}
        </Button>
      </FormButtonToolbar>
    </FormContainer>
  );
}

export default SettingFormLayout;
