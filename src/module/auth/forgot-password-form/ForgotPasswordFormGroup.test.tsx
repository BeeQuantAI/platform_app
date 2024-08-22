import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import ForgotPasswordFormGroup from './ForgotPasswordFormGroup';

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('ForgotPasswordFormGroup', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(<ForgotPasswordFormGroup />, { wrapper: Wrapper });
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
  });

  it('uses email from localStorage if available', () => {
    localStorageMock.getItem.mockReturnValue('test@example.com');
    const { getByPlaceholderText } = render(<ForgotPasswordFormGroup />, { wrapper: Wrapper });
    expect(getByPlaceholderText('Email')).toHaveAttribute('value', 'test@example.com');
  });

  it('displays an error for empty email', async () => {
    const { getByPlaceholderText, findByText } = render(<ForgotPasswordFormGroup />, {
      wrapper: Wrapper,
    });
    const emailInput = getByPlaceholderText('Email');

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(findByText('This is required field')).resolves.toBeInTheDocument();
    });
  });

  it('displays an error for invalid email format', async () => {
    const { getByPlaceholderText, findByText } = render(<ForgotPasswordFormGroup />, {
      wrapper: Wrapper,
    });
    const emailInput = getByPlaceholderText('Email');

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(findByText('Entered value does not match email format')).resolves.toBeInTheDocument();
    });
  });

  it('accepts valid email input', async () => {
    const { getByPlaceholderText, queryByText } = render(<ForgotPasswordFormGroup />, {
      wrapper: Wrapper,
    });
    const emailInput = getByPlaceholderText('Email');

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(queryByText('This is required field')).not.toBeInTheDocument();
      expect(queryByText('Entered value does not match email format')).not.toBeInTheDocument();
    });
  });
});
