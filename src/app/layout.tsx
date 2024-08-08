import { ReactNode } from 'react';
import Providers from './provider';
import './global.css';
import 'bootstrap/dist/css/bootstrap.css';
import ThemeProvider from './themeProvider';
import { Roboto, Poppins } from 'next/font/google';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin', 'latin-ext'],
});

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'latin-ext'],
});

export const metadata = {
  title: 'BeeQuant Platform',
  description: 'Generated AI with Quantitative trading platform',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${roboto.className} ${poppins.className}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css" />
      </head>
      <body>
        <Providers>
          <ThemeProvider>
            <main id="root">{children}</main>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
