import { render, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { USER_CHANGE_PASSWORD } from '@/graphql/auth';
import UpdatePasswordPage from './UpdatePasswordForm';
import userEvent from '@testing-library/user-event';
import { PasswordCompareErrorMsgs, PasswordErrorMsgs } from '@/shared/utils/helpers';

function renderPage(mockData: MockedResponse<any, any>[]) {
  render(
    <MockedProvider mocks={mockData} addTypename={false}>
      <UpdatePasswordPage />
    </MockedProvider>
  );
}

const changePasswordMockSuccess = [
  {
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
          message: 'You have successfully reset your password!',
          data: null,
        },
      },
    },
  },
];

const changePasswordMockFailure = [
  {
    request: {
      query: USER_CHANGE_PASSWORD,
      variables: {
        input: {
          oldPassword: 'diffOldPass123!',
          newPassword: 'newPass123!',
        },
      },
    },
    result: {
      data: {
        changePassword: {
          code: 400,
          message: 'Incorrect password',
          data: null,
        },
      },
    },
  },
];

describe('ChangePassword', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('should render correctly', () => {
    renderPage([]);
    expect(screen.getByLabelText('Old Password')).toBeInTheDocument();
    expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Repeat New Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should handle successful password change', async () => {
    renderPage(changePasswordMockSuccess);

    const oldPasswordInput = screen.getByLabelText('Old Password');
    const newPasswordInput = screen.getByLabelText('New Password');
    const repeatNewPasswordInput = screen.getByLabelText('Repeat New Password');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(oldPasswordInput, 'oldPass123!');
    await userEvent.type(newPasswordInput, 'newPass123!');
    await userEvent.type(repeatNewPasswordInput, 'newPass123!');

    await userEvent.click(submitButton);

    expect(await screen.findByText(/You have successfully reset your password!/i)).toBeVisible();
    expect(await screen.findByText(/Ready to trade again/i)).toBeVisible();
  });

  it('should navigate to the login page on click of "Ready to trade again" button', async () => {
    renderPage(changePasswordMockSuccess);

    const oldPasswordInput = screen.getByLabelText('Old Password');
    const newPasswordInput = screen.getByLabelText('New Password');
    const repeatNewPasswordInput = screen.getByLabelText('Repeat New Password');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(oldPasswordInput, 'oldPass123!');
    await userEvent.type(newPasswordInput, 'newPass123!');
    await userEvent.type(repeatNewPasswordInput, 'newPass123!');
    await userEvent.click(submitButton);

    expect(await screen.findByRole('link')).toHaveAttribute('href', '/login');
  });

  it('should handle password change failure, caused by incorrect current password', async () => {
    renderPage(changePasswordMockFailure);

    const oldPasswordInput = screen.getByLabelText('Old Password');
    const newPasswordInput = screen.getByLabelText('New Password');
    const repeatNewPasswordInput = screen.getByLabelText('Repeat New Password');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(oldPasswordInput, 'diffOldPass123!');
    await userEvent.type(newPasswordInput, 'newPass123!');
    await userEvent.type(repeatNewPasswordInput, 'newPass123!');
    await userEvent.click(submitButton);

    expect(await screen.findByText(/incorrect password/i)).toBeVisible();
  });

  it('should handle password change failure, caused by password field validation - missing field', async () => {
    renderPage([]);

    const newPasswordInput = screen.getByLabelText('New Password');
    const repeatNewPasswordInput = screen.getByLabelText('Repeat New Password');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(newPasswordInput, 'newPass123!');
    await userEvent.type(repeatNewPasswordInput, 'newPass123!');
    await userEvent.click(submitButton);

    expect(await screen.findByText(PasswordErrorMsgs.Required)).toBeVisible();
  });

  it('should handle password change failure, caused by password field validation - passwords not match', async () => {
    renderPage([]);

    const newPasswordInput = screen.getByLabelText('New Password');
    const repeatNewPasswordInput = screen.getByLabelText('Repeat New Password');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(newPasswordInput, 'newPass123!');
    await userEvent.type(repeatNewPasswordInput, 'diffNewPass123!');
    await userEvent.click(submitButton);

    expect(await screen.findByText(PasswordCompareErrorMsgs.NotMatch)).toBeVisible();
  });

  it('should handle password change failure, caused by password field validation - password fail minLength validation', async () => {
    renderPage([]);

    const newPasswordInput = screen.getByLabelText('New Password');
    const repeatNewPasswordInput = screen.getByLabelText('Repeat New Password');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(newPasswordInput, 'newPass');
    await userEvent.type(repeatNewPasswordInput, 'newPass');
    await userEvent.click(submitButton);

    expect(await screen.findAllByText(PasswordErrorMsgs.MinLength)).toHaveLength(2);
  });

  it('should handle password change failure, caused by password field validation - password fail maxLength validation', async () => {
    renderPage([]);

    const newPasswordInput = screen.getByLabelText('New Password');
    const repeatNewPasswordInput = screen.getByLabelText('Repeat New Password');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(newPasswordInput, 'seihuangabcfromchinashanghai1234567890');
    await userEvent.type(repeatNewPasswordInput, 'seihuangabcfromchinashanghai1234567890');
    await userEvent.click(submitButton);

    expect(await screen.findAllByText(PasswordErrorMsgs.MaxLength)).toHaveLength(2);
  });

  it('should handle password change failure, caused by password field validation - password fail pattern validation', async () => {
    renderPage([]);

    const newPasswordInput = screen.getByLabelText('New Password');
    const repeatNewPasswordInput = screen.getByLabelText('Repeat New Password');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(newPasswordInput, 'as123456');
    await userEvent.type(repeatNewPasswordInput, 'as123456');
    await userEvent.click(submitButton);

    expect(await screen.findAllByText(PasswordErrorMsgs.Invalid)).toHaveLength(2);
  });
});
