import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import { USER_LOGIN } from '@/graphql/auth';

const mocks = [
  {
    request: {
      query: USER_LOGIN,
      variables: {
        email: 'valid@email.com',
        password: 'validpassword',
      },
    },
    result: {
      data: {
        login: {
          code: 200,
          data: 'mocktoken',
        },
      },
    },
  },
  {
    request: {
      query: USER_LOGIN,
      variables: {
        email: 'invalid@email.com',
        password: 'invalidpassword',
      },
    },
    result: {
      data: {
        login: {
          code: 401,
          message: 'Login failed',
          data: 'mocktoken',
          errors: [new Error('Login failed')],
        },
      },
    },
  },
];

describe('Login', () => {
  it('should render the login page without crashing', () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <Login />
        </Router>
      </MockedProvider>
    );
    expect(container).toBeTruthy();
  });

  it('should sign in with email successfully', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <Login />
        </Router>
      </MockedProvider>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    userEvent.type(emailInput, 'valid@email.com');
    userEvent.type(passwordInput, 'validpassword');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

  it('should show an error message when sign in with email fails', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <Login />
        </Router>
      </MockedProvider>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    userEvent.type(emailInput, 'invalid@email.com');
    userEvent.type(passwordInput, 'invalidpassword');
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText('This is required field');
    expect(errorMessage).toBeInTheDocument();
  });
});
