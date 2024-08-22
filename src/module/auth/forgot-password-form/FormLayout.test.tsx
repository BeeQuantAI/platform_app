import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { USER_FORGOT_PASSWORD } from '@/graphql/auth';
import FormLayout from './FormLayout';
import { act } from 'react-dom/test-utils';

jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => children;
});

jest.mock('@/hooks/useTitle', () => ({
  useTitle: jest.fn(),
}));

const mocks = [
  {
    request: {
      query: USER_FORGOT_PASSWORD,
      variables: { email: 'test@example.com' },
    },
    result: {
      data: {
        forgotPassword: {
          code: 200,
          message: 'Password reset email sent',
          data: null,
        },
      },
    },
  },
];

describe('FormLayout', () => {
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
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('displays form fields correctly', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FormLayout />
      </MockedProvider>
    );
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  it('submits form and displays success message', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FormLayout />
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Submit'));
    });

    await waitFor(
      () => {
        expect(screen.getByText(/If the email is associated with an account/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
