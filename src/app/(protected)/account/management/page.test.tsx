import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AccountManagement from './page';

describe('AccountManagement Component', () => {
  it('should render without crashing', () => {
    render(
      <Router>
        <AccountManagement />
      </Router>
    );
    expect(screen.getByText('Account Management')).toBeInTheDocument();
  });

  it('should display the page title correctly', () => {
    render(
      <Router>
        <AccountManagement />
      </Router>
    );
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Account Management');
  });

  it('should render the CardLink component with correct props', () => {
    render(
      <Router>
        <AccountManagement />
      </Router>
    );
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
    expect(screen.getByText('Update your password')).toBeInTheDocument();
  });
});
