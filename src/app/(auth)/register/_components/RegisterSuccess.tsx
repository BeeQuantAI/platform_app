/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from 'styled-components';
import Link from 'next/link';
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

const RegisterSuccess = () => (
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
              </AccountLogoAccent>
            </AccountLogo>
            Your registration is successful
          </AccountTitle>
        </AccountHead>
        {/* @ts-ignore - Ignoring because of complex union types that are not correctly inferred */}
        <AccountButton variant="outline-primary">
          <Link href="/login">Back to Login</Link>
        </AccountButton>
      </AccountCard>
    </AccountContent>
  </AccountWrap>
);

export default RegisterSuccess;

// region STYLES

const AccountImage = styled.img`
  max-width: 500px;
  width: 100%;
  margin-bottom: 40px;
`;

// endregion
