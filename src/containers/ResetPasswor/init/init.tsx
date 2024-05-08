import {
  FormGroup,
  FormGroupField,
  FormGroupIcon,
  FormGroupLabel,
} from '@/shared/components/form/FormElements';
import { ROUTE_KEY } from '@/routes/routeConfig';
import { useState } from 'react';
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
import { useGoTo } from '@/hooks/useGoTo';
import FormField from '@/shared/components/form/FormHookField';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { useForm } from 'react-hook-form';
import { emailPatter } from '@/shared/utils/helpers';
import { EMAIL } from '@/shared/constants/storage';

// Form data interface
interface FormData {
  email: string;
}

const ResetPassword = () => {
  const [showEmailHint, setShowEmailHint] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const { go } = useGoTo();

  const onSubmit = () => {
    go(ROUTE_KEY.RESET_PASSWORD_FORM);
  };

  return (
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
                value: emailPatter,
                message: 'Entered value does not match email format',
              },
            }}
            defaultValue={localStorage.getItem(EMAIL)}
            placeholder="Email"
            isAboveError
            onFocus={() => setShowEmailHint(true)}
            onBlur={() => setShowEmailHint(false)}
          />
          {showEmailHint && <div className="email-hint">Please enter a valid email address.</div>}
        </FormGroupField>
      </FormGroup>
      {/* @ts-ignore - Ignoring because of complex union types that are not correctly inferred */}
      <AccountButton type="submit" variant="primary">
        Submit
      </AccountButton>
    </form>
  );
};

const ResetPasswordInitiationPage = () => {
  return (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          <AccountHead>
            <AccountTitle>
              Enter Your Email
              <br />
              <AccountLogo>
                BeeQuant
                <AccountLogoAccent> AI</AccountLogoAccent>
              </AccountLogo>
            </AccountTitle>
            <h4 className="subhead">Trading smart, trading with BeeQuant AI</h4>
          </AccountHead>
          <ResetPassword />
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

export default ResetPasswordInitiationPage;
