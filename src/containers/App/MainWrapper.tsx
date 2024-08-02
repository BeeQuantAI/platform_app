import { ReactNode } from 'react';

export type MainWrapperProps = {
  children: ReactNode;
};

const MainWrapper = ({ children }: MainWrapperProps) => <div>{children}</div>;

export default MainWrapper;
