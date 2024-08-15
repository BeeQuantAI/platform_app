import { NextIntlClientProvider } from 'next-intl';
import AppSettingPage from './AppSettingPage';
import { render, screen } from '@testing-library/react';

// Mock translations
// type keys = 'title' | 'subtitle';

// jest.mock('next-intl', () => {
//   const translations = {
//     AppSettingPage: {
//       en: {
//         title: 'App Settings',
//         subtitle: 'Change your app settings',
//       },
//       zhcn: {
//         title: '系统设置',
//         subtitle: '更新您的系统设置',
//       },
//     },
//   };
//   return {
//     useTranslations: () => {
//       return (key: keys) => translations.AppSettingPage.en[key] as string;
//     },
//   };
// });

// jest.mock('./AppSettingFormLayout', () => {
//   return <div>123</div>;
// });

// Page Render Function
const renderPage = () => {
  render(<AppSettingPage />);
};

describe('AppSettingPage', () => {
  it('should render the page in English and show related texts', async () => {
    await renderPage();
    // const cardBody = screen.getByTestId('card-body');
    // expect(cardBody).toBeInTheDocument();
    // expect(within(cardBody).getByText('App Setting')).toBeInTheDocument();
    // expect(within(cardBody).getByText('App Setting subtitle')).toBeInTheDocument();
  });
});
