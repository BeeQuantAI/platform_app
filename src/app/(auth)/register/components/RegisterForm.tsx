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
import { emailPatter } from '@/shared/utils/helpers';
import { marginLeft } from '@/styles/directions';
import {
  AccountButton,
  AccountButtons,
  LastFormGroup,
} from '@/shared/components/account/AccountElements';
import { Controller, useForm } from 'react-hook-form';
import FormField from '@/shared/components/form/FormHookField';

type RegisterFormProps = {
  onSubmit: (data: any) => void;
  error: string;
};

const RegisterForm = ({ onSubmit, error = '' }: RegisterFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Alert variant="danger" show={!!error}>
        {error}
      </Alert>
      <FormGroup>
        <FormGroupLabel>Display Name</FormGroupLabel>
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
              required: 'This is required field',
            }}
            defaultValue=""
            placeholder="Display Name"
            isAboveError
          />
        </FormGroupField>
      </FormGroup>
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
                value: emailPatter,
                message: 'Entered value does not match email format',
              },
            }}
            defaultValue=""
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
        </FormGroupField>
      </FormGroup>
      <LastFormGroup>
        <FormGroupLabel>Reference</FormGroupLabel>
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
              required: 'This is required field',
            }}
            defaultValue=""
            placeholder="Reference"
            isAboveError
          />
        </FormGroupField>
      </LastFormGroup>
      <RegisterButtons>
        {/* @ts-ignore - Ignoring because of complex union types that are not correctly inferred */}
        <AccountButton type="submit" variant="primary">
          Sign Up
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
