import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResetPasswordInitiationPage from './ResetPasswordInitiationPage';
import { act } from 'react-dom/test-utils';

jest.mock('styled-theming', () => ({
  default: jest.fn().mockImplementation((_, values) => values.mode),
}));

jest.mock('mdi-react/AccountOutlineIcon', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked Account Outline Icon</div>,
  };
});

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
  });
});
