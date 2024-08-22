'use client';

import {
  AccountWrap,
  AccountContent,
  AccountCard,
} from '@/shared/components/account/AccountElements';
import FormLayout from './FormLayout';

export default function ResetPasswordForm() {
  return (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          <FormLayout />
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
}
