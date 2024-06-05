import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import VerifyFail from './VerifyFail';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

interface MockAppRouterInstance {
  push: jest.Mock;
  back?: jest.Mock;
  forward?: jest.Mock;
  refresh?: jest.Mock;
  replace?: jest.Mock;
  prefetch?: jest.Mock;
}

describe('VerifyFail component', () => {
  it('should render successfully and show verification failed message', () => {
    render(
      <Router>
        <VerifyFail error="Link expired" />
      </Router>
    );

    const errorMessage = screen.getByText(/Link expired/i);
    expect(errorMessage).toBeInTheDocument();

    const titleMessage = screen.getByText(/Verification failed/i);
    expect(titleMessage).toBeInTheDocument();
  });

  it('should render image', () => {
    render(
      <Router>
        <VerifyFail error="Invalid verification token" />
      </Router>
    );
    const image = screen.getByAltText('404');
    expect(image).toBeInTheDocument();
  });

  it('triggers router push on button click', async () => {
    const pushMock = jest.fn();

    const mockRouterInstance: MockAppRouterInstance = {
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
        <VerifyFail error="Invalid verification token" />
      </Router>
    );

    fireEvent.click(screen.getByText('Back to Login'));
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/login');
    });
  });
});
