import { screen, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResetPasswordSuccess from './ResetPasswordSuccess';

jest.mock('@/shared/components/account/AccountElements', () => ({
  AccountButton: (props: any) => <button {...props}>{props.children}</button>,
  AccountHead: (props: any) => <div>{props.children}</div>,
  AccountLogo: (props: any) => <div>{props.children}</div>,
  AccountLogoAccent: (props: any) => <span>{props.children}</span>,
  AccountTitle: (props: any) => <h1>{props.children}</h1>,
}));

describe('ResetPasswordSuccess component', () => {
  it('should render successfully and show success message', () => {
    render(
      <Router>
        <ResetPasswordSuccess />
      </Router>
    );

    const successMessage = screen.getByText(/Your password has been reset/i);
    expect(successMessage).toBeInTheDocument();
  });

  it('should render success image', () => {
    render(
      <Router>
        <ResetPasswordSuccess />
      </Router>
    );
    const image = screen.getByAltText('success');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'img/success.png');
  });

  it('should render button with correct link', () => {
    const { getByText } = render(
      <Router>
        <ResetPasswordSuccess />
      </Router>
    );
    const button = getByText('Back to Login');
    expect(button).toBeInTheDocument();
    const linkElement = button.closest('a');
    expect(linkElement).toHaveAttribute('href', '/login');
  });
});
