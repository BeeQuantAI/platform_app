import { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from '@/routes/Router';
import { useUserContext } from '@/hooks/userHooks';
import { THEME } from '@/shared/constants/storage';
import ScrollToTop from './ScrollToTop';
import GlobalStyles from './globalStyles';

const AppContent = () => {
  const { store } = useUserContext();
  const themeColor = store.themeColor || localStorage.getItem(THEME) || 'dark';

  return (
    <ScrollToTop>
      <ThemeProvider
        theme={{
          mode: themeColor,
          direction: 'ltr',
          shadow: 'on',
          border: 'on',
        }}
      >
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </ScrollToTop>
  );
};

export default AppContent;
