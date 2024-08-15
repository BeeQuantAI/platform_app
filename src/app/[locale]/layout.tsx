import Providers from './provider';
import './global.css';
import 'bootstrap/dist/css/bootstrap.css';
import ThemeProvider from './themeProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata = {
  title: 'BeeQuant Platform',
  description: 'Generated AI with Quantitative trading platform',
};

export async function generateStaticParams() {
  return ['en', 'zh-cn'].map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <ThemeProvider>
              <main id="root">{children}</main>
            </ThemeProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
