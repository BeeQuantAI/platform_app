import { ReactNode } from 'react';

type MainWrapperProps = {
  children: ReactNode;
};

const MainWrapper = ({ children }: MainWrapperProps) => <div>{children}</div>;

export default MainWrapper;
