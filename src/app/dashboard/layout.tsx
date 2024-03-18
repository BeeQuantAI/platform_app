import { WrappedRoutes } from '@/shared/Layout/Routes/WrappedRoutes';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <WrappedRoutes>
          <div>{children}</div>
        </WrappedRoutes>
      </body>
    </html>
  );
};

export default Layout;
