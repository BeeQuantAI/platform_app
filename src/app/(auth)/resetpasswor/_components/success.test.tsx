import { render, screen } from '@testing-library/react';
import ResetPasswordSuccess from '../_components/success';
import React, { ReactNode } from 'react';

jest.mock('styled-theming', () => ({
  theme: jest.fn().mockImplementation((_, values) => values.mode),
}));

jest.mock('@/shared/components/account/AccountElements', () => ({
  AccountContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  AccountHead: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  AccountLogo: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  AccountLogoAccent: ({ children }: { children: ReactNode }) => (
    <div style={{ color: 'blue' }}>{children}</div>
  ),
  AccountTitle: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  AccountButton: ({ children, ...props }: { children: ReactNode }) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock('next/link', () => {
  return ({ children, ...props }: { children: ReactNode }) => <a {...props}>{children}</a>;
});

describe('PasswordResetSuccess', () => {
  it('navigates back to login on button click', () => {
    render(<ResetPasswordSuccess />);

    // Find the link by text and check its href attribute
    const backButtonLink = screen.getByRole('link', { name: /back to login/i });
    expect(backButtonLink).toHaveAttribute('href', '/login');
  });
});
