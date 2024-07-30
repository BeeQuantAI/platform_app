'use client';

import {
  AccountCard,
  AccountContent,
  AccountWrap,
} from '@/shared/components/account/AccountElements';
import AccountHeader from '../components/AccountHeader';
import AccountFooter from '../components/AccountFooter';
import FormLayout from './FormLayout';

export default function RegisterForm() {
  return (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          <AccountHeader />
          <FormLayout />
          <AccountFooter isLogin={false} />
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
}
