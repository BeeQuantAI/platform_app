import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AccountCard,
  AccountContent,
  AccountHaveAccount,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountTitle,
  AccountWrap,
} from '@/shared/components/account/AccountElements';
import { ROUTE_KEY, getPublicRouteByKey } from '@/routes/routeConfig';
import { useMutation } from '@apollo/client';
import { USER_REGISTER } from '@/graphql/auth';
import { useTitle } from '@/hooks/useTitle';
import RegisterForm from './components/RegisterForm';
import RegisterSuccess from './components/RegisterSuccess';

const Register = () => {
  const [register] = useMutation(USER_REGISTER);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  useTitle(getPublicRouteByKey(ROUTE_KEY.REGISTER).title);

  const onSubmit = async (data: {
    email: string;
    password: string;
    displayName: string;
    ref: string;
  }) => {
    const result = await register({
      variables: {
        input: data,
      },
    });

    if (result.data.register.code === 200) {
      setIsRegistered(true);
    }
    // for register failed
    setError(`Register failed: ${result.data.register.message}`);
  };

  if (isRegistered) {
    return <RegisterSuccess />;
  }

  return (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          <AccountHead>
            <AccountTitle>
              Welcome to
              <br />
              <AccountLogo>
                BeeQuant
                <AccountLogoAccent> AI</AccountLogoAccent>
              </AccountLogo>
            </AccountTitle>
            <h4 className="subhead">Trading smart, trading with BeeQuant AI</h4>
          </AccountHead>
          <RegisterForm onSubmit={onSubmit} error={error} />
          <AccountHaveAccount>
            <p>
              Already have an account?{' '}
              <NavLink to={getPublicRouteByKey(ROUTE_KEY.LOGIN).path}>Login</NavLink>
            </p>
          </AccountHaveAccount>
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

export default Register;
