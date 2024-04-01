import { screen, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterSuccess from './RegisterSuccess';

jest.mock('styled-theming', () => ({
  default: jest.fn().mockImplementation((_, values) => values.mode),
}));

jest.mock('@/containers/Dashboard/components/DashboardCardElements', () => ({
  WidgetTrendingIconUp: () => <div>Mocked WidgetTrendingIconUp</div>,
}));

describe('RegisterSuccess component', () => {
  it('should render successfully and show "Your registration is successful"', () => {
    render(
      <Router>
        <RegisterSuccess />
      </Router>
    );

    const successMessage = screen.getByText(/Your registration is successful/i);
    expect(successMessage).toBeInTheDocument();
  });

  it('should render image', () => {
    render(
      <Router>
        <RegisterSuccess />
      </Router>
    );
    const image = screen.getByAltText('success');
    expect(image).toBeInTheDocument();
  });

  it('should render button with correct link', () => {
    const { getByText } = render(
      <Router>
        <RegisterSuccess />
      </Router>
    );
    const button = getByText('Back to Login');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/login');
  });
});
