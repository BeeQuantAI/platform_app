import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useUserContext } from '@/hooks/userHooks';
import { useRouter } from 'next/navigation';
import RegisterSuccess from './RegisterSuccess';

jest.mock('@/containers/Layout/topbar/BasicTopbarComponents', () => ({
  TopbarDownIcon: () => <div>Mocked TopbarDownIcon</div>,
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem(key: string): string | null {
      return store[key] || null;
    },
    setItem(key: string, value: string): void {
      store[key] = value.toString();
    },
    clear(): void {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

interface MockAppRouterInstance {
  push: jest.Mock;
  back?: jest.Mock;
  forward?: jest.Mock;
  refresh?: jest.Mock;
  replace?: jest.Mock;
  prefetch?: jest.Mock;
}

jest.mock('@/hooks/userHooks', () => ({
  useUserContext: jest.fn(),
}));

beforeEach(() => {
  (useUserContext as jest.Mock).mockImplementation(() => ({
    store: { themeColor: 'dark' },
    setStore: jest.fn(),
  }));

  localStorage.setItem('THEME', 'dark');
});

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe('RegisterSuccess component', () => {
  it('should render successfully and show "Your registration is successful"', () => {
    render(
      <Router>
        <RegisterSuccess />
      </Router>
    );

    const successMessage = screen.getByText(/We have sent you a verification email/i);
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
    const { getByText } = render(<RegisterSuccess />);
    fireEvent.click(getByText('Finished sign-up. Ready to trade'));
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/login');
    });
  });
});
