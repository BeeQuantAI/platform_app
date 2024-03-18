import { ReactNode } from 'react';
import Providers from './provider';
import './global.css';
import GlobalStyles from '@/styles/globalStyles';

export const metadata = {
  title: 'Beequant.ai',
  descirption: 'Generated AI with Quantitive trading platform',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div id="root">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
