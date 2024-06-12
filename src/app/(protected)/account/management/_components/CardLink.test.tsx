import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CardLink from './CardLink';

jest.mock('@/shared/components/Card', () => ({
  Card: ({ children }: { children?: ReactNode }) => <div data-testid="card">{children}</div>,
  CardBody: ({ children }: { children?: ReactNode }) => (
    <div data-testid="card-body">{children}</div>
  ),
  CardTitle: ({ children }: { children?: ReactNode }) => (
    <div data-testid="card-title">{children}</div>
  ),
  CardSubhead: ({ children }: { children?: ReactNode }) => (
    <div data-testid="card-subhead">{children}</div>
  ),
  CardTitleWrap: ({ children }: { children?: ReactNode }) => (
    <div data-testid="card-title-wrap">{children}</div>
  ),
}));

describe('CardLink', () => {
  const defaultProps = {
    cardTitle: 'Test Title',
    cardSubhead: 'Test Subhead',
    route: '/test-route',
  };

  it('should render without crashing', () => {
    render(
      <Router>
        <CardLink {...defaultProps} />
      </Router>
    );
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subhead')).toBeInTheDocument();
  });

  it('should navigate to the correct route on click', () => {
    render(
      <Router>
        <CardLink {...defaultProps} />
      </Router>
    );
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', defaultProps.route);
  });
});
