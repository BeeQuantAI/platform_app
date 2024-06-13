import { act } from 'react-dom/test-utils';
import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResetPasswordInitiationPage from './page';

interface IconProps {
  className?: string;
}

jest.mock('mdi-react/TrendingUpIcon', () => {
  return {
    __esModule: true,
    default: ({ className }: IconProps) => <div className={className}>Mocked Trending Up Icon</div>,
  };
});

jest.mock('mdi-react/TrendingDownIcon', () => {
  return {
    __esModule: true,
    default: ({ className }: IconProps) => (
      <div className={className}>Mocked Trending Down Icon</div>
    ),
  };
});

jest.mock('mdi-react/AccountOutlineIcon', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked Account Outline Icon</div>,
  };
});

jest.mock('./_components/form', () => ({
  __esModule: true,
  default: ({ onSuccess }: { onSuccess: () => void }) => (
    <div>
      Mocked Reset Password Form
      <button onClick={onSuccess}>Mock Submit</button>
    </div>
  ),
}));

jest.mock('./_components/success', () => ({
  __esModule: true,
  default: () => <div>Mocked Reset Password Success</div>,
}));

describe('ResetPasswordInitiationPage', () => {
  it('should render the page and show the correct title', async () => {
    render(
      <Router>
        <ResetPasswordInitiationPage />
      </Router>
    );

    const title = screen.getByText(/Enter Your Email/i);
    expect(title).toBeInTheDocument();
  });

  it('should allow user to enter email', async () => {
    render(
      <Router>
        <ResetPasswordInitiationPage />
      </Router>
    );
    const input = screen.getByPlaceholderText('Email');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'user@example.com' } });
    });
    expect(screen.getByDisplayValue('user@example.com')).toBeInTheDocument();
  });

  it('should navigate to the reset password form page on submit', async () => {
    render(
      <Router>
        <ResetPasswordInitiationPage />
      </Router>
    );

    const input = screen.getByPlaceholderText('Email');
    const button = screen.getByRole('button', { name: 'Submit' });

    await act(async () => {
      fireEvent.change(input, { target: { value: 'user@example.com' } });
      fireEvent.click(button);
    });

    const form = screen.getByText('Mocked Reset Password Form');
    expect(form).toBeInTheDocument();
  });

  it('should navigate to the success page after form submission', async () => {
    render(
      <Router>
        <ResetPasswordInitiationPage />
      </Router>
    );

    const input = screen.getByPlaceholderText('Email');
    const button = screen.getByRole('button', { name: 'Submit' });

    await act(async () => {
      fireEvent.change(input, { target: { value: 'user@example.com' } });
      fireEvent.click(button);
    });

    const formButton = screen.getByText('Mock Submit');
    await act(async () => {
      fireEvent.click(formButton);
    });

    const successMessage = screen.getByText('Mocked Reset Password Success');
    expect(successMessage).toBeInTheDocument();
  });
});
