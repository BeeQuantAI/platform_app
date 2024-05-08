import { passwordPattern } from '@/shared/utils/helpers';
import { useGoTo } from '@/hooks/useGoTo';
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
import { ROUTE_KEY } from '@/routes/routeConfig';

interface FormValues {
  password: string;
  confirmPassword: string;
}

const ResetPasswordForm = () => {
  const { handleSubmit, control, watch } = useForm<FormValues>({
    mode: 'onSubmit',
  });
  const { go } = useGoTo();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    go(ROUTE_KEY.PASSWORD_RESET_SUCCESS);
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
                  rules={{
                    required: 'This field is required',
                    pattern: {
                      value: passwordPattern,
                      message:
                        'Password must contain letters, numbers, and at least one special character',
                    },
                  }}
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
