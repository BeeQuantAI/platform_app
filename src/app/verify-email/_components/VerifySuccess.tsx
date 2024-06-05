/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import {
  AccountButton,
  AccountCard,
  AccountContent,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountTitle,
  AccountWrap,
} from '@/shared/components/account/AccountElements';

const VerifySuccess = () => {
  const router = useRouter();
  const handleBackToLoginButtonClick = () => {
    router.push('/login');
  };

  return (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          <AccountImage src="img/success.png" alt="success" />
          <AccountHead>
            <AccountTitle>
              <AccountLogo>
                <AccountLogoAccent>
                  Congratulations !
                  <br />
                  Email Verified
                  <br />
                </AccountLogoAccent>
              </AccountLogo>
              Your registration is successful
            </AccountTitle>
          </AccountHead>
          {/*
          @ts-ignore
           - Ignoring because of complex union types that are not correctly inferred
           */}
          <AccountButton onClick={handleBackToLoginButtonClick} variant="outline-primary">
            Back to Login
          </AccountButton>
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

export default VerifySuccess;

// region STYLES

const AccountImage = styled.img`
  max-width: 500px;
  width: 100%;
  margin-bottom: 40px;
`;

// endregion
