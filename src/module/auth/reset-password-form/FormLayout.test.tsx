import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { USER_RESET_PASSWORD } from '@/graphql/auth';
import FormLayout from './FormLayout';

jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children;
  };
});

jest.mock('@/hooks/useTitle', () => ({
  useTitle: jest.fn(),
}));

jest.mock('./ResetPasswordSuccess', () => {
  return function ResetPasswordSuccess() {
    return <div>Reset Password Success</div>;
  };
});

const mocks = [
  {
    request: {
      query: USER_RESET_PASSWORD,
      variables: {
        input: {
          newPassword: 'newPassword123',
          resetToken: 'validToken',
        },
      },
    },
    result: {
      data: {
        resetPassword: {
          code: 200,
          message: 'Password reset successful',
          data: null,
        },
      },
    },
  },
];

describe('FormLayout', () => {
  beforeEach(() => {
    if (window.location) {
      delete (window as any).location;
    }
    window.location = { search: '?token=validToken' } as Location;
  });

  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FormLayout />
      </MockedProvider>
    );
    const loginLink = screen.getByText((content, element) => {
      if (
        element &&
        element.tagName.toLowerCase() === 'p' &&
        content.includes('Back to') &&
        content.includes('Login')
      ) {
        return true;
      }
      return false;
    });
    expect(loginLink).toBeInTheDocument();
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
    expect(screen.getByText('BeeQuant')).toBeInTheDocument();
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('Trading smart, trading with BeeQuant AI')).toBeInTheDocument();
  });

  it('displays form fields correctly', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FormLayout />
      </MockedProvider>
    );
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });
});
