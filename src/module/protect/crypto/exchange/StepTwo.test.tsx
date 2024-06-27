import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepTwo from './StepTwo';
import { MockedProvider } from '@apollo/client/testing';
import { CREATE_USER_EXCHANGE } from '@/graphql/user';

const defaultValues = {
  exchange: '1',
};

const mocks = [
  {
    request: {
      query: CREATE_USER_EXCHANGE,
      variables: {
        input: {
          name: 'Test Display Name',
          exchangeName: 'binance',
          accessKey: 'test-api-key',
          secretKey: 'test-api-secret',
        },
      },
    },
    result: {
      data: {
        createUserExchange: {
          id: '1',
          name: 'Test Display Name',
          exchangeName: 'binance',
          accessKey: 'test-api-key',
          secretKey: 'test-api-secret',
        },
      },
    },
  },
];

describe('StepTwo Component', () => {
  test('renders form controls', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <StepTwo onSubmit={jest.fn()} previousPage={jest.fn()} defaultValues={defaultValues} />
      </MockedProvider>
    );

    expect(screen.getByPlaceholderText(/Display name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/API key/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/API secret/i)).toBeInTheDocument();
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  test('updates state on user input', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <StepTwo onSubmit={jest.fn()} previousPage={jest.fn()} defaultValues={defaultValues} />
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Display name/i), {
      target: { value: 'Test Display Name' },
    });
    fireEvent.change(screen.getByPlaceholderText(/API key/i), {
      target: { value: 'test-api-key' },
    });
    fireEvent.change(screen.getByPlaceholderText(/API secret/i), {
      target: { value: 'test-api-secret' },
    });

    expect(screen.getByPlaceholderText(/Display name/i)).toHaveValue('Test Display Name');
    expect(screen.getByPlaceholderText(/API key/i)).toHaveValue('test-api-key');
    expect(screen.getByPlaceholderText(/API secret/i)).toHaveValue('test-api-secret');
  });

  test('shows error message when fields are empty', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <StepTwo onSubmit={jest.fn()} previousPage={jest.fn()} defaultValues={defaultValues} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText(/Display name cannot be null/i)).toBeInTheDocument();
    });
  });

  test('submits the form correctly', async () => {
    const onSubmit = jest.fn();

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <StepTwo onSubmit={onSubmit} previousPage={jest.fn()} defaultValues={defaultValues} />
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Display name/i), {
      target: { value: 'Test Display Name' },
    });
    fireEvent.change(screen.getByPlaceholderText(/API key/i), {
      target: { value: 'test-api-key' },
    });
    fireEvent.change(screen.getByPlaceholderText(/API secret/i), {
      target: { value: 'test-api-secret' },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
