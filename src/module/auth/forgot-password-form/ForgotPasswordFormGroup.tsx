import {
  FormGroupField,
  FormGroupIcon,
  FormGroupLabel,
} from '@/shared/components/form/FormElements';
import { LastFormGroup } from '@/shared/components/account/AccountElements';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import FormField from '@/shared/components/form/FormHookField';
import { emailPattern } from '@/shared/utils/helpers';
import { EMAIL } from '@/shared/constants/storage';
import { useFormContext } from 'react-hook-form';

export default function ForgotPasswordFormGroup() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const localEmail = (typeof window !== 'undefined' ? localStorage.getItem(EMAIL) : '') || '';

  return (
    <>
      <LastFormGroup>
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
            defaultValue={typeof window !== 'undefined' ? localEmail : ''}
            placeholder="Email"
            isAboveError
          />
        </FormGroupField>
      </LastFormGroup>
    </>
  );
}
