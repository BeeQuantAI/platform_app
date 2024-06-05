import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import VerifySuccess from './VerifySuccess';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('VerifySuccess component', () => {
  it('should render successfully and show verification success message', () => {
    render(
      <Router>
        <VerifySuccess />
      </Router>
    );

    const titleMessage1 = screen.getByText(/Congratulations !/i);
    expect(titleMessage1).toBeInTheDocument();

    const titleMessage2 = screen.getByText(/Email Verified/i);
    expect(titleMessage2).toBeInTheDocument();

    const successMessage = screen.getByText(/Your registration is successful/i);
    expect(successMessage).toBeInTheDocument();
  });

  it('should render image', () => {
    render(
      <Router>
        <VerifySuccess />
      </Router>
    );
    const image = screen.getByAltText('success');
    expect(image).toBeInTheDocument();
  });

  it('triggers router push on button click', async () => {
    const pushMock = jest.fn();

    const mockRouterInstance = {
      push: pushMock,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };

    (useRouter as jest.MockedFunction<typeof useRouter>).mockReturnValue(
      mockRouterInstance as unknown as ReturnType<typeof useRouter>
    );

    render(
      <Router>
        <VerifySuccess />
      </Router>
    );

    fireEvent.click(screen.getByText('Back to Login'));
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/login');
    });
  });
});
