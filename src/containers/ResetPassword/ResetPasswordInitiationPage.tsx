import { useHistory } from 'react-router-dom';
import {
  FormGroup,
  FormGroupField,
  FormGroupIcon,
  FormGroupLabel,
} from '@/shared/components/form/FormElements';

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
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>(); // 使用泛型确保表单数据类型正确
  const history = useHistory();

  const onSubmit = (data: FormData) => {
    // 使用类型安全的 FormData
    console.log(data.email); // 假设这里是处理数据的地方
    history.push('/reset-password-form');
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
          />
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
