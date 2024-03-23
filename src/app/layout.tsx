import { ReactNode } from 'react';
import Providers from './provider';
import './global.css';
import Head from 'next/head';

export const metadata = {
  title: 'Beequant.ai',
  descirption: 'Generated AI with Quantitive trading platform',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <script src="https://cdn.linearicons.com/free/1.0.0/svgembedder.min.js" />
      </Head>
      <html lang="en">
        <body>
          <Providers>
            <div id="root">{children}</div>
          </Providers>
        </body>
      </html>
    </>
  );
}
