import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import ResetPasswordForm from './form';
import { act } from 'react-dom/test-utils';

interface PasswordFieldProps {
  input: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  meta: {
    touched: boolean;
    error?: string;
  };
  placeholder: string;
  keyIcon: boolean;
}

jest.mock('@/shared/components/form/Password', () => {
  const PasswordFieldMock: React.FC<PasswordFieldProps> = ({
    input,
    meta,
    placeholder,
    keyIcon,
  }) => (
    <div>
      <label htmlFor={input.name}>{placeholder}</label>
      <input
        id={input.name}
        type="password"
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        placeholder={placeholder}
      />
      {meta.touched && meta.error && <span>{meta.error}</span>}
      <div>Mocked Eye Icon</div>
    </div>
  );

  return {
    __esModule: true,
    default: PasswordFieldMock,
  };
});

describe('ResetPasswordForm', () => {
  const mockOnSuccess = jest.fn();

  it('should render the form and show password fields', () => {
    render(
      <Router>
        <ResetPasswordForm onSuccess={mockOnSuccess} />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  it('should allow user to enter and confirm password', async () => {
    render(
      <Router>
        <ResetPasswordForm onSuccess={mockOnSuccess} />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

    fireEvent.change(passwordInput, { target: { value: 'Password@123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password@123' } });

    expect(passwordInput).toHaveValue('Password@123');
    expect(confirmPasswordInput).toHaveValue('Password@123');
  });

  it('should show error if passwords do not match', async () => {
    render(
      <Router>
        <ResetPasswordForm onSuccess={mockOnSuccess} />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'Password@123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentPassword@123' } });
      fireEvent.click(submitButton);
    });

    const alert = screen.queryByText(/Passwords must match/i);
    expect(alert).toBeInTheDocument();
  });

  it('should not call onSuccess if the passwords do not match', async () => {
    render(
      <Router>
        <ResetPasswordForm onSuccess={mockOnSuccess} />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'Password@123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentPassword@123' } });
      fireEvent.click(submitButton);
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('should call onSuccess if the passwords match', async () => {
    render(
      <Router>
        <ResetPasswordForm onSuccess={mockOnSuccess} />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'Password@123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'Password@123' } });
      fireEvent.click(submitButton);
    });

    expect(mockOnSuccess).toHaveBeenCalled();
  });
});
