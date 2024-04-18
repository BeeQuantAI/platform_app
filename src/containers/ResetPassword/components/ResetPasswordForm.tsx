import { useHistory } from 'react-router-dom';
import { FormGroup, FormGroupField, FormGroupLabel } from '@/shared/components/form/FormElements';
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
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import PasswordField from '@/shared/components/form/Password';

interface FormValues {
  password: string;
  confirmPassword: string;
}

const ResetPasswordForm = () => {
  const { handleSubmit, control, watch } = useForm<FormValues>({
    mode: 'onSubmit',
  });
  const history = useHistory();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    console.log('Password updated:', data.password);
    history.push('/password-reset-success');
  };

  return (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          <AccountHead>
            <AccountTitle>
              Reset Password
              <br />
              <AccountLogo>
                BeeQuant
                <AccountLogoAccent> AI</AccountLogoAccent>
              </AccountLogo>
            </AccountTitle>
            <h4 className="subhead">Secure your account with a new password</h4>
          </AccountHead>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  rules={{
                    required: 'This is required field',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                    maxLength: {
                      value: 32,
                      message: 'Password must be no more than 32 characters long',
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/,
                      message:
                        'Password must contain letters, numbers, and at least one special character',
                    },
                  }}
                  defaultValue=""
                />
              </FormGroupField>
            </FormGroup>
            <FormGroup>
              <FormGroupLabel>Confirm Password</FormGroupLabel>
              <FormGroupField>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: 'Confirming password is required',
                    validate: {
                      matchesPreviousPassword: (value) => {
                        const { password } = watch();
                        return password === value || 'Passwords must match';
                      },
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <PasswordField
                      input={field}
                      meta={{
                        touched: !!fieldState.error,
                        error: fieldState.error?.message,
                      }}
                      placeholder="Confirm Password"
                      keyIcon
                      isAboveError
                    />
                  )}
                  defaultValue=""
                />
              </FormGroupField>
            </FormGroup>
            {/* @ts-ignore - Ignoring because of complex union types that are not correctly inferred */}
            <AccountButton type="submit" variant="primary">
              Submit
            </AccountButton>
          </form>
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

export default ResetPasswordForm;
