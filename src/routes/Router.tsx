import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { colorBackgroundBody } from '@/styles/palette';
import { paddingLeft } from '@/styles/directions';
import Layout from '@/containers/Layout';
import MainWrapper from '@/containers/App/MainWrapper';
import { isAuthenticated } from '@/shared/utils/auth';
import { useGoTo } from '@/hooks/useGoTo';
import { ROUTE_KEY, publicRoutes, routes } from './routeConfig';

const wrappedRoutes = () => {
  const { go } = useGoTo();
  if (!isAuthenticated()) {
    go(ROUTE_KEY.LOGIN);
  }
  return (
    <div>
      <Layout />
      <ContainerWrap>
        <Switch>
          {routes.map((item) => (
            <Route key={item.name} path={item.path} component={item.component} />
          ))}
        </Switch>
      </ContainerWrap>
    </div>
  );
};

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        {publicRoutes.map((item) => (
          <Route key={item.name} path={item.path} component={item.component} />
        ))}
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;

// region STYLES

const ContainerWrap = styled.div`
  padding-top: 90px;
  min-height: 100vh;
  transition: padding-left 0.3s;

  ${paddingLeft}: 0;

  background: ${colorBackgroundBody};

  @media screen and (min-width: 576px) {
    ${paddingLeft}: 250px;
  }

  @media screen and (max-width: 576px) {
    padding-top: 150px;
  }
`;

// endregion
