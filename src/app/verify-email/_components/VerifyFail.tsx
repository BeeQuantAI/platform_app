/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import {
  AccountButton,
  AccountCard,
  AccountContent,
  AccountHead,
  AccountLogo,
  AccountLogoError,
  AccountTitle,
  AccountWrap,
} from '@/shared/components/account/AccountElements';

const VerifyFail = ({ error }: { error: string }) => {
  const router = useRouter();
  const handleBackToLoginButtonClick = () => {
    router.push('/login');
  };

  return (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          <AccountImage src="img/404.png" alt="404" />
          <AccountHead>
            <AccountTitle>
              <AccountLogo>
                <AccountLogoError>
                  Opps !
                  <br />
                  Verification failed
                  <br />
                </AccountLogoError>
              </AccountLogo>
              {error}
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

export default VerifyFail;

// region STYLES

const AccountImage = styled.img`
  max-width: 500px;
  width: 100%;
  margin-bottom: 40px;
`;

// endregion
