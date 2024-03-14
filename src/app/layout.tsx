import { ReactNode } from 'react';

export const metadata = {
  title: 'Beequant.ai',
  descirption: 'Generated AI with Quantitive trading platform',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
