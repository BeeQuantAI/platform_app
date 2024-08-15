'use client';
import {
  AccountCard,
  AccountContent,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountOr,
  AccountSocial,
  AccountSocialButtonFacebook,
  AccountSocialButtonGoogle,
  AccountTitle,
  AccountWrap,
} from '@/shared/components/account/AccountElements';
import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import FormLayout from './FormLayout';
import { useTranslations } from 'next-intl';
export default function LoginForm() {
  const t = useTranslations('');
  return (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          <AccountHead>
            <AccountTitle>
              {t('Shared.welcome')}
              <br />
              <AccountLogo>
                {t('Shared.logo')}
                <AccountLogoAccent> {t('Shared.logo-accent')}</AccountLogoAccent>
              </AccountLogo>
            </AccountTitle>
            <h4 className="subhead">{t('Shared.slogan')}</h4>
          </AccountHead>
          <FormLayout />
          <AccountOr>
            <p>{t('LoginPage.account-or')}</p>
          </AccountOr>
          <AccountSocial>
            {/* @ts-ignore - Ignoring because of complex union types incorrectly inferred */}
            <AccountSocialButtonFacebook
              className="account__social-btn account__social-btn--facebook"
              to="/login"
            >
              <FacebookIcon />
            </AccountSocialButtonFacebook>
            <AccountSocialButtonGoogle to="/login">
              <GooglePlusIcon />
            </AccountSocialButtonGoogle>
          </AccountSocial>
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
}
