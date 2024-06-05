import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { VERIFY_EMAIL } from '@/graphql/verifyEmail';
import Page from './page';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: jest.fn(() => ({
    get: jest.fn((key) => {
      if (key === 'email') return 'test@example.com';
      if (key === 'token') return 'testtoken123';
      return null;
    }),
  })),
  useRouter: jest.fn(),
}));

const mockMutationResult = (code: number) => ({
  data: {
    verifyEmail: {
      code,
      message: code === 200 ? 'Your registration is successful' : 'Verification failed',
    },
  },
});

describe('Email Verification Page', () => {
  it('should render success message on successful email verification', async () => {
    const mocks = [
      {
        request: {
          query: VERIFY_EMAIL,
          variables: {
            email: 'test@example.com',
            token: 'testtoken123',
          },
        },
        result: mockMutationResult(200),
      },
    ];

    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <Page />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Your registration is successful')).toBeInTheDocument();
    });
  });

  it('should render failure message on failed email verification', async () => {
    const failMocks = [
      {
        request: {
          query: VERIFY_EMAIL,
          variables: {
            email: 'test@example.com',
            token: 'testtoken123',
          },
        },
        result: mockMutationResult(10008),
      },
    ];
    const { getByText } = render(
      <MockedProvider mocks={failMocks}>
        <Page />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Verification failed')).toBeInTheDocument();
    });
  });

  it('should render error message if an error occurs during verification', async () => {
    const errorMocks = [
      {
        request: {
          query: VERIFY_EMAIL,
          variables: {
            email: 'test@example.com',
            token: 'testtoken123',
          },
        },
        error: new Error('An error occurred'),
      },
    ];

    const { getByText } = render(
      <MockedProvider mocks={errorMocks}>
        <Page />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('An error occurred')).toBeInTheDocument();
    });
  });
});
