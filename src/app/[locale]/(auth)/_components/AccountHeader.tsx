import {
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountTitle,
} from '@/shared/components/account/AccountElements';
import { useTranslations } from 'next-intl';

const AccountHeader = () => {
  const t = useTranslations('Shared');
  return (
    <AccountHead>
      <AccountTitle>
        {t('welcome')}
        <br />
        <AccountLogo>
          {t('logo')}
          <AccountLogoAccent> {t('logo-accent')}</AccountLogoAccent>
        </AccountLogo>
      </AccountTitle>
      <h4 className="subhead">{t('slogan')}</h4>
    </AccountHead>
  );
};

export default AccountHeader;
