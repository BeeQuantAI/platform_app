'use client';

import { ROUTE_KEY, getPublicRouteByKey } from '@/routes/routeConfig';
import { isAuthenticated } from '@/shared/utils/auth';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { paddingLeft } from '@/styles/directions';
import { colorBackgroundBody } from '@/styles/palette';
import { ReactNode, useEffect } from 'react';
import Layout from '@/containers/Layout/Layout';
import { usePathname } from 'next/navigation';
import { IS_REFRESH_TOKEN_EXPIRED } from '@/shared/constants/storage';

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
    padding-top: 90px;
  }
`;

interface Props {
  children: ReactNode;
}

export const WrappedRoutes: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!isAuthenticated()) {
      localStorage.removeItem(IS_REFRESH_TOKEN_EXPIRED);
      router.push(getPublicRouteByKey(ROUTE_KEY.LOGIN).path);
    }
  }, [isAuthenticated(), pathname]);
  return (
    <div>
      <Layout />
      <ContainerWrap>{children}</ContainerWrap>
    </div>
  );
};
