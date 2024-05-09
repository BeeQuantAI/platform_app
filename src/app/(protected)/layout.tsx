'use client';

import { ReactNode } from 'react';
import { WrappedRoutes } from '@/shared/Layout/Routes/WrappedRoutes';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

// landing width
export const ContentContainer = styled(Container)`
  @media screen and (min-width: 768px) {
    width: 100%;
    max-width: 1630px;
  }
`;

const Layout = ({ children }: { children: ReactNode }) => (
  <WrappedRoutes>
    <div>{children}</div>
  </WrappedRoutes>
);

export default Layout;
