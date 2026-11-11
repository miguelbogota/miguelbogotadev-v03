import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/src/styles/index.scss';

export const metadata: Metadata = {
  title: 'Miguel Bogota',
  description: 'Portfolio of Miguel Bogota, software engineer.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
