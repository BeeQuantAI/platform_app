'use client';

import { useState, Suspense } from 'react';
import {
  AccountWrap,
  AccountContent,
  AccountCard,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountTitle,
  AccountButton,
} from '@/shared/components/account/AccountElements';
import {
  FormGroup,
  FormGroupField,
  FormGroupIcon,
  FormGroupLabel,
} from '@/shared/components/form/FormElements';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import FormField from '@/shared/components/form/FormHookField';
import { useForm } from 'react-hook-form';
import { emailPattern } from '@/shared/utils/helpers';
import { EMAIL } from '@/shared/constants/storage';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ResetPasswordForm = dynamic(() => import('./_components/form'), { ssr: false });
const ResetPasswordSuccess = dynamic(() => import('./_components/success'), { ssr: false });

interface FormData {
  email: string;
}

const ResetPasswordInitiationPage = () => {
  const [showEmailHint, setShowEmailHint] = useState(false);
  const [step, setStep] = useState('init'); // 使用状态控制显示的步骤
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    setStep('form');
  };

  return (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          {step !== 'success' && (
            <AccountHead>
              <AccountTitle>
                {step === 'init' ? 'Enter Your Email' : 'Reset Password'}
                <br />
                <AccountLogo>
                  BeeQuant
                  <AccountLogoAccent> AI</AccountLogoAccent>
                </AccountLogo>
              </AccountTitle>
              <h4 className="subhead">Trading smart, trading with BeeQuant AI</h4>
            </AccountHead>
          )}
          {step === 'init' ? (
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    defaultValue={localStorage.getItem(EMAIL)}
                    placeholder="Email"
                    isAboveError
                    onFocus={() => setShowEmailHint(true)}
                    onBlur={() => setShowEmailHint(false)}
                  />
                  {showEmailHint && (
                    <div className="email-hint">Please enter a valid email address.</div>
                  )}
                </FormGroupField>
              </FormGroup>
              <AccountButton type="submit" variant="primary">
                Submit
              </AccountButton>

              <AccountButton variant="outline-primary">
                <Link href="/login">Back to Login</Link>
              </AccountButton>
            </form>
          ) : step === 'form' ? (
            <Suspense fallback={<div>Loading...</div>}>
              <ResetPasswordForm onSuccess={() => setStep('success')} />
            </Suspense>
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              <ResetPasswordSuccess />
            </Suspense>
          )}
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

export default ResetPasswordInitiationPage;
