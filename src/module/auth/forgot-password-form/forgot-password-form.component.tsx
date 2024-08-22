'use client';
import {
  AccountWrap,
  AccountContent,
  AccountCard,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountTitle,
} from '@/shared/components/account/AccountElements';
import FormLayout from './FormLayout';

export default function ForgotPasswordForm() {
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
          <FormLayout />
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
}
