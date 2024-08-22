import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ForgotPasswordForm from './forgot-password-form.component';

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

jest.mock('./FormLayout', () => ({
  __esModule: true,
  default: () => (
    <div>
      <input placeholder="Email" />
      <button>Submit</button>
    </div>
  ),
}));

describe('ForgotPasswordForm', () => {
  it('should render the forgot password page without crashing', () => {
    const { container } = render(
      <Router>
        <ForgotPasswordForm />
      </Router>
    );
    expect(container).toBeTruthy();
  });

  it('should render the correct elements and text', () => {
    render(
      <Router>
        <ForgotPasswordForm />
      </Router>
    );

    expect(screen.getByText(/Enter Your Email/i)).toBeInTheDocument();
    expect(screen.getByText(/BeeQuant AI/i)).toBeInTheDocument();
    expect(screen.getByText(/Trading smart, trading with BeeQuant AI/i)).toBeInTheDocument();
  });
});
