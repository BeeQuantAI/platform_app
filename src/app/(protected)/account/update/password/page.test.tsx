import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter as Router } from 'react-router-dom';
import { USER_CHANGE_PASSWORD } from '@/graphql/auth';
import ChangePassword from './page';

jest.mock('mdi-react/EyeIcon', () => ({
  __esModule: true,
  default: () => <div>Mocked EyeIcon</div>,
}));

jest.mock('mdi-react/KeyVariantIcon', () => ({
  __esModule: true,
  default: () => <div>Mocked KeyVariantIcon</div>,
}));

jest.mock('mdi-react/TrendingUpIcon', () => ({
  __esModule: true,
  default: () => <div>Mocked TrendingUpIcon</div>,
}));

jest.mock('mdi-react/TrendingDownIcon', () => ({
  __esModule: true,
  default: () => <div>Mocked TrendingDownIcon</div>,
}));

jest.mock('styled-theming', () => ({
  __esModule: true,
  default: jest.fn(
    (values: Record<string, string>) => (props: { mode: string }) => values[props.mode]
  ),
}));

const changePasswordMockSuccess = {
  request: {
    query: USER_CHANGE_PASSWORD,
    variables: {
      input: {
        oldPassword: 'oldPass123!',
        newPassword: 'newPass123!',
      },
    },
  },
  result: {
    data: {
      changePassword: {
        code: 200,
        message: 'Password changed successfully!',
      },
    },
  },
};

const changePasswordMockFailure = {
  request: {
    query: USER_CHANGE_PASSWORD,
    variables: {
      input: {
        oldPassword: 'diffOldPass',
        newPassword: 'newPass123!',
      },
    },
  },
  result: {
    data: {
      changePassword: {
        code: 400,
        message: 'Change password failed: Incorrect password',
      },
    },
  },
};

describe('ChangePassword', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should render correctly', () => {
    render(
      <MockedProvider mocks={[]}>
        <ChangePassword />
      </MockedProvider>
    );
    expect(screen.getByText('Current Password')).toBeInTheDocument();
    expect(screen.getByText('New Password')).toBeInTheDocument();
    expect(screen.getByText('Repeat New Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should handle successful password change', async () => {
    render(
      <MockedProvider mocks={[changePasswordMockSuccess]} addTypename={false}>
        <Router>
          <ChangePassword />
        </Router>
      </MockedProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/current password/i), {
      target: { value: 'oldPass123!' },
    });
    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: 'newPass123!' },
    });
    fireEvent.change(screen.getByPlaceholderText(/repeat password/i), {
      target: { value: 'newPass123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText(/You have successfully reset your password!/i)).toBeVisible();
    expect(await screen.findByText(/Ready to trade again/i)).toBeVisible();
  });

  it('should navigate to the login page on click of "Ready to trade again" button', async () => {
    render(
      <MockedProvider mocks={[changePasswordMockSuccess]} addTypename={false}>
        <Router>
          <ChangePassword />
        </Router>
      </MockedProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/current password/i), {
      target: { value: 'oldPass123!' },
    });
    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: 'newPass123!' },
    });
    fireEvent.change(screen.getByPlaceholderText(/repeat password/i), {
      target: { value: 'newPass123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => expect(screen.getByRole('link')).toHaveAttribute('href', '/login'));
  });

  it('should handle password change failure, caused by incorrect current password', async () => {
    render(
      <MockedProvider mocks={[changePasswordMockFailure]} addTypename={false}>
        <ChangePassword />
      </MockedProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/current password/i), {
      target: { value: 'diffOldPass' },
    });
    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: 'newPass123!' },
    });
    fireEvent.change(screen.getByPlaceholderText(/repeat password/i), {
      target: { value: 'newPass123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText(/change password failed: incorrect password/i)).toBeVisible();
  });

  it('should handle password change failure, caused by password field validation - missing field', async () => {
    render(
      <MockedProvider mocks={[]}>
        <ChangePassword />
      </MockedProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: 'newPass123!' },
    });
    fireEvent.change(screen.getByPlaceholderText(/repeat password/i), {
      target: { value: 'diffNewPass123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText(/This is a required field/i)).toBeVisible();
  });

  it('should handle password change failure, caused by password field validation - passwords not match', async () => {
    render(
      <MockedProvider mocks={[]}>
        <ChangePassword />
      </MockedProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: 'newPass123!' },
    });
    fireEvent.change(screen.getByPlaceholderText(/repeat password/i), {
      target: { value: 'diffNewPass123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText(/Passwords do not match!/i)).toBeVisible();
  });

  it('should handle password change failure, caused by password field validation - password not meet requirement', async () => {
    render(
      <MockedProvider mocks={[]}>
        <ChangePassword />
      </MockedProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: 'anyPass' },
    });
    fireEvent.change(screen.getByPlaceholderText(/repeat password/i), {
      target: { value: 'anyPass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(
      await screen.findByText(
        /must contain 8 to 32 characters, including letter, number and special character/i
      )
    ).toBeVisible();
  });
});
