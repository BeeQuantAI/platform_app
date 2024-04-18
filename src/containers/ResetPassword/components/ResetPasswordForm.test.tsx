import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResetPasswordForm from './ResetPasswordForm';
import { act } from 'react-dom/test-utils';

jest.mock('styled-theming', () => ({
  default: jest.fn().mockImplementation((_, values) => values.mode),
}));

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
      <label>{placeholder}</label>
      <input
        type={keyIcon ? 'text' : 'password'}
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
  it('should render the page and show the correct title', () => {
    render(
      <Router>
        <ResetPasswordForm />
      </Router>
    );
    const title = screen.getByText(/Reset Password/i);
    expect(title).toBeInTheDocument();
  });

  it('should allow user to enter and confirm password', async () => {
    render(
      <Router>
        <ResetPasswordForm />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

    fireEvent.change(passwordInput, { target: { value: 'Password@123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password@123' } });

    const passwordInputs = screen.getAllByDisplayValue('Password@123');

    expect(passwordInputs.length).toBe(2);
    passwordInputs.forEach((input) => {
      expect(input).toBeInTheDocument();
    });
  });

  it('should show error if passwords do not match', async () => {
    render(
      <Router>
        <ResetPasswordForm />
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

  it('should not navigate if the passwords do not match', async () => {
    render(
      <Router>
        <ResetPasswordForm />
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

    expect(screen.queryByText(/Password updated/i)).not.toBeInTheDocument();
  });
});
