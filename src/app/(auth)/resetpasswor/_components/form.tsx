import { passwordPatten } from '@/shared/utils/helpers';
import PasswordField from '@/shared/components/form/Password';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { FormGroup, FormGroupField, FormGroupLabel } from '@/shared/components/form/FormElements';
import { AccountButton } from '@/shared/components/account/AccountElements';
import Link from 'next/link';

interface FormValues {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordFormProps {
  onSuccess: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSuccess }) => {
  const { handleSubmit, control, watch } = useForm<FormValues>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    onSuccess();
  };

  return (
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
                value: passwordPatten,
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
      <AccountButton type="submit" variant="primary">
        Submit
      </AccountButton>
      <AccountButton variant="outline-primary">
        <Link href="/login">Back to Login</Link>
      </AccountButton>
    </form>
  );
};

export default ResetPasswordForm;
