import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UpdatePasswordLink from './UpdatePasswordLink';

function renderAccountManagement() {
  render(
    <Router>
      <UpdatePasswordLink />
    </Router>
  );
}

describe('AccountManagement Component', () => {
  it('should render without crashing', () => {
    renderAccountManagement();
    expect(screen.getByText('Account Management')).toBeInTheDocument();
  });

  it('should display the page title correctly', () => {
    renderAccountManagement();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Account Management');
  });

  it('should render the CardLink component with correct props', () => {
    renderAccountManagement();
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
    expect(screen.getByText('Update your password')).toBeInTheDocument();
  });
});
