import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import PasswordResetSuccess from './PasswordResetSuccess';

// Correctly mocking react-router-dom's useHistory hook
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    ...originalModule,
    useHistory: jest.fn(), // Create a mock function for useHistory
  };
});

jest.mock('styled-theming', () => ({
  default: jest.fn().mockImplementation((_, values) => values.mode),
}));

jest.mock('@/containers/Dashboard/components/DashboardCardElements', () => ({
  WidgetTrendingIconUp: () => <div>Mocked WidgetTrendingIconUp</div>,
}));

describe('PasswordResetSuccess', () => {
  it('navigates back to login on button click', () => {
    const mockPush = jest.fn();
    (useHistory as jest.Mock).mockReturnValue({ push: mockPush }); // Correct usage to mock return value

    render(
      <MemoryRouter>
        <PasswordResetSuccess />
      </MemoryRouter>
    );

    // Find the button by role and click it
    const backButton = screen.getByRole('button', { name: /back to login/i });
    fireEvent.click(backButton);

    // Expect the mock push method to have been called with '/login'
    expect(mockPush).toHaveBeenCalledWith('/login');
  });
});
