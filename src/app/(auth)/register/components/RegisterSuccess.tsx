import styled from 'styled-components';
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
import imageSuccess from '@/shared/img/success.png';
import Link from 'next/link';

const RegisterSuccess = () => {
  return (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          <AccountImage src={imageSuccess} alt="success" />
          <AccountHead>
            <AccountTitle>
              <AccountLogo>
                <AccountLogoAccent>
                  Congratulations ! <br />
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
};

export default RegisterSuccess;

// region STYLES

const AccountImage = styled.img`
  max-width: 500px;
  width: 100%;
  margin-bottom: 40px;
`;

// endregion
