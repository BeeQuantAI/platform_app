import styled from 'styled-components';
import Link from 'next/link';
import {
  AccountButton,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountTitle,
} from '@/shared/components/account/AccountElements';

const AccountImage = styled.img`
  max-width: 500px;
  width: 100%;
  margin-bottom: 40px;
`;

const ResetPasswordSuccess = () => (
  <>
    <AccountImage src="img/success.png" alt="success" />
    <AccountHead>
      <AccountTitle>
        <AccountLogo>
          <AccountLogoAccent>
            Cool !
            <br />
          </AccountLogoAccent>
        </AccountLogo>
        Your password has been reset
      </AccountTitle>
    </AccountHead>
    <Link href="/login" passHref>
      <AccountButton variant="outline-primary">Back to Login</AccountButton>
    </Link>
  </>
);

export default ResetPasswordSuccess;
