import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import ResetPasswordFormGroup from './ResetPasswordFormGroup';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('ResetPasswordFormGroup', () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(<ResetPasswordFormGroup onSuccess={mockOnSuccess} />, {
      wrapper: Wrapper,
    });
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });

  it('displays an error for empty password', async () => {
    const { getByPlaceholderText, findByText } = render(
      <ResetPasswordFormGroup onSuccess={mockOnSuccess} />,
      { wrapper: Wrapper }
    );
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(findByText('This field is required')).resolves.toBeInTheDocument();
    });
  });

  it('displays an error for invalid password format', async () => {
    const { getByPlaceholderText, findByText } = render(
      <ResetPasswordFormGroup onSuccess={mockOnSuccess} />,
      { wrapper: Wrapper }
    );
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(
        findByText(
          'must contain 8 to 32 characters, including letter, number and special character'
        )
      ).resolves.toBeInTheDocument();
    });
  });

  it('displays an error when passwords do not match', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <ResetPasswordFormGroup onSuccess={mockOnSuccess} />,
      { wrapper: Wrapper }
    );
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.change(passwordInput, { target: { value: 'ValidPass1!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentPass1!' } });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(findByText('The passwords do not match')).resolves.toBeInTheDocument();
    });
  });

  it('calls onSuccess when form is submitted with valid data', async () => {
    const { getByPlaceholderText, getByText } = render(
      <ResetPasswordFormGroup onSuccess={mockOnSuccess} />,
      { wrapper: Wrapper }
    );
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.change(passwordInput, { target: { value: 'ValidPass1!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPass1!' } });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledWith({
        password: 'ValidPass1!',
        confirmPassword: 'ValidPass1!',
      });
    });
  });

  it('shows password requirements when password field is focused', () => {
    const { getByPlaceholderText, getByText } = render(
      <ResetPasswordFormGroup onSuccess={mockOnSuccess} />,
      { wrapper: Wrapper }
    );
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.focus(passwordInput);

    expect(
      getByText(': 8 to 32 characters, including letter, number and special character')
    ).toBeInTheDocument();
  });

  it('hides password requirements when password field loses focus', () => {
    const { getByPlaceholderText, queryByText } = render(
      <ResetPasswordFormGroup onSuccess={mockOnSuccess} />,
      { wrapper: Wrapper }
    );
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.focus(passwordInput);
    fireEvent.blur(passwordInput);

    expect(
      queryByText(': 8 to 32 characters, including letter, number and special character')
    ).not.toBeInTheDocument();
  });
});
