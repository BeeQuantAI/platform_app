import {
  AccountContent,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountTitle,
  AccountButton,
} from '@/shared/components/account/AccountElements';
import successImage from '@/shared/img/success.png';
import Link from 'next/link';

const ResetPasswordSuccess = () => {
  return (
    <div>
      <img src={successImage.src} alt="Success" />
      <br />
      <AccountContent>
        <AccountHead>
          <AccountTitle>
            <AccountLogo>
              <AccountLogoAccent>Cool!</AccountLogoAccent>
            </AccountLogo>
            <br />
            Your password has been reset
          </AccountTitle>
        </AccountHead>
      </AccountContent>

      <AccountButton variant="outline-primary">
        <Link href="/login">Back to Login</Link>
      </AccountButton>
    </div>
  );
};

export default ResetPasswordSuccess;
