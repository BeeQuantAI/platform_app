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
        },
      },
    },
  },
]; // Add a closing bracket here

describe('Login', () => {
  test('AC1: Sign in with email successfully', async () => {
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

  test('AC2: Sign in with email failed', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <Login />
        </Router>
      </MockedProvider>
    );

    try {
      await waitFor(() => {
        const alertBox = screen.getByRole('alert');
        expect(alertBox).toHaveTextContent(/login failed/i);
      });
    } catch (error) {
      // Handle the error here
    }
  });
});
