import { render } from '@testing-library/react';
import { screen, within } from '@testing-library/react';
import AppSetting from './AppSetting';
import { BrowserRouter as Router } from 'react-router-dom';
import { useUserContext } from '@/hooks/userHooks';

//Mock 404.tsx to get rid of 'Expression produces a union type that is too complex to represent' error from its <Button/>
jest.mock('../404', () => {
  // Return a simple mock component that does nothing or renders a placeholder
  const MockNotFound404 = () => <div data-testid="NotFound404">Not Found Placeholder</div>;

  return { __esModule: true, default: MockNotFound404 };
});

// Mocking localStorage
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

// Mocking useUserContext
jest.mock('@/hooks/userHooks', () => ({
  useUserContext: jest.fn(),
}));

//Test case start
describe('<AppSetting />', () => {
  beforeAll(() => {
    //simulates the current state managed by the context which represents the "live" state
    (useUserContext as jest.Mock).mockImplementation(() => ({
      store: { themeColor: 'dark' },
      setStore: jest.fn(),
    }));

    // mock the theme in localStorage that simulates that a user has previously chosen 'dark' andhas been saved to localStorage.
    localStorage.setItem('THEME', 'dark');
  });

  it('should successfully render the page and show related texts', async () => {
    render(
      <Router>
        <AppSetting />
      </Router>
    );

    //Title should be rendered
    expect(screen.getByText('App Settings')).toBeInTheDocument();
    expect(screen.getByText('Change your app settings')).toBeInTheDocument();

    //Language drop down label should be rendered
    expect(screen.getByText('Language')).toBeInTheDocument();

    //Theme drop down lable should be rendered
    expect(screen.getByText('Theme')).toBeInTheDocument();

    //Theme drop down options should be rendered
    const selectElement = screen.getAllByRole('combobox', { name: /theme/i });

    const lightOption = within(selectElement[0]).getByRole('option', { name: 'Light' });
    expect(lightOption).toBeInTheDocument();

    const darkOption = within(selectElement[0]).getByRole('option', { name: 'Dark' });
    expect(darkOption).toBeInTheDocument();
  });
});
