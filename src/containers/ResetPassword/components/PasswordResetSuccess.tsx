import { useHistory } from 'react-router-dom';
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
import successImage from '@/shared/img/success.png';

const PasswordResetSuccess = () => {
  const history = useHistory();
  const handleBackToLogin = () => {
    history.push('/login');
  };

  return (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          <AccountHead>
            <AccountTitle>
              <img src={successImage} alt="Success" />
              <AccountLogoAccent> Cool!</AccountLogoAccent>
              <br />
              Your password has been reset
              <AccountLogo></AccountLogo>
            </AccountTitle>
          </AccountHead>
          {/* @ts-ignore - Ignoring because of complex union types that are not correctly inferred */}
          <AccountButton type="button" variant="primary" onClick={handleBackToLogin}>
            Back to Login
          </AccountButton>
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

export default PasswordResetSuccess;
