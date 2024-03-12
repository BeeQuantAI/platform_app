import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface ScrollToTopProps extends RouteComponentProps {
  children: React.ReactNode;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ location, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // Depend on pathname to trigger the scroll to top

  return <>{children}</>;
};

export default withRouter(ScrollToTop);
