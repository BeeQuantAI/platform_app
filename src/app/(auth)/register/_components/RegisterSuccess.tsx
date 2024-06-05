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

const RegisterSuccess = () => {
  const router = useRouter();
  const handleFinishedButtonClick = () => {
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
                  Please check your mailbox
                  <br />
                </AccountLogoAccent>
              </AccountLogo>
              We have sent you a verification email
            </AccountTitle>
          </AccountHead>
          {/*
           @ts-ignore
           - Ignoring because of complex union types that are not correctly inferred
           */}
          <AccountButton onClick={handleFinishedButtonClick} variant="outline-primary">
            Finished sign-up. Ready to trade
          </AccountButton>
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

export default RegisterSuccess;

// region STYLES

const AccountImage = styled.img`
  max-width: 500px;
  width: 100%;
  margin-bottom: 40px;
`;

// endregion
