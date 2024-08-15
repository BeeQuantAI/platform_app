import {
  AccountHaveAccount,
  AccountOr,
  AccountSocial,
  AccountSocialButtonFacebook,
  AccountSocialButtonGoogle,
} from '@/shared/components/account/AccountElements';
import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface AccountFooterProps {
  isLogin?: boolean;
}

const AccountFooter = ({ isLogin }: AccountFooterProps) => {
  const t = useTranslations();
  if (isLogin) {
    return (
      <>
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
      </>
    );
  }
  return (
    <AccountHaveAccount>
      <p>
        {t('RegisterPage.haveAccount')}
        <Link href="/login">{t('Shared.login')}</Link>
      </p>
    </AccountHaveAccount>
  );
};

export default AccountFooter;
