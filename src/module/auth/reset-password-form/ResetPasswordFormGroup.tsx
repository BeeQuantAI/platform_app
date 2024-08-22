import { passwordPatten } from '@/shared/utils/helpers';
import PasswordField from '@/shared/components/form/Password';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  FormGroup,
  FormGroupField,
  FormGroupLabel,
  FormContainer,
} from '@/shared/components/form/FormElements';
import { AccountButton, LastFormGroup } from '@/shared/components/account/AccountElements';
import { useState } from 'react';

interface FormValues {
  password: string;
  confirmPassword: string;
}

type ResetPasswordFormProps = {
  onSuccess: (data: any) => void;
};

type IsFocused = {
  password: boolean;
  confirmPassword: boolean;
};

const ResetPasswordFormGroup = ({ onSuccess }: ResetPasswordFormProps) => {
  const { handleSubmit, control, watch } = useForm<FormValues>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    onSuccess(data);
  };

  const [isFocused, setIsFocused] = useState<IsFocused>({
    password: false,
    confirmPassword: false,
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
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <FormGroupLabel>
          Password
          <span>
            {isFocused.password &&
              ': 8 to 32 characters, including letter, number and special character'}
          </span>
        </FormGroupLabel>
        <FormGroupField>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'This field is required',
              pattern: {
                value: passwordPatten,
                message:
                  'must contain 8 to 32 characters, including letter, number and special character',
              },
            }}
            render={({ field, fieldState }) => (
              <PasswordField
                input={{ ...field, onBlur: () => handleBlur(field.name) }}
                meta={{
                  touched: !!fieldState.error,
                  error: fieldState.error?.message,
                }}
                placeholder="Password"
                keyIcon
                isAboveError
                onFocus={() => handleFocus(field.name)}
              />
            )}
            defaultValue=""
          />
        </FormGroupField>
      </FormGroup>
      <LastFormGroup>
        <FormGroupLabel>
          Confirm Password
          <span>{isFocused.confirmPassword && ''}</span>
        </FormGroupLabel>
        <FormGroupField>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Confirming password is required',
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = watch();
                  return password === value || 'The passwords do not match';
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
      </LastFormGroup>
      <AccountButton type="submit" variant="primary">
        Submit
      </AccountButton>
    </FormContainer>
  );
};

export default ResetPasswordFormGroup;
