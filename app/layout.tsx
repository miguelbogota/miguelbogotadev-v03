import '@/styles/index.scss';

import { type Metadata } from 'next';
import { Barlow } from 'next/font/google';
import { cookies } from 'next/headers';
import { type ReactNode } from 'react';

import { themeService } from '@/modules/theme';

/** Barlow font configuration shared by every route. */
const barlow = Barlow({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-barlow',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://miguelbogota.dev'),
  title: 'Miguel Bogota',
  description: 'Portfolio of Miguel Bogota, software engineer.',
};

/** Allows the cookie-dependent document shell to render as one request-time response. */
export const instant = false;

/**
 * Renders the shared document shell for every application route.
 *
 * @param props - Root layout children supplied by Next.js.
 * @returns The application document.
 */
export default async function RootLayout(props: Readonly<{ children: ReactNode }>) {
  const { children } = props;
  const cookieStore = await cookies();
  const theme = themeService.getThemeFromCookieString(cookieStore.toString());

  return (
    <html lang="en" className={barlow.variable} data-theme={theme}>
      <head>
        <link rel="stylesheet" href="https://cdn.boxicons.com/3.0.8/fonts/basic/boxicons.min.css" />
        <link
          rel="stylesheet"
          href="https://cdn.boxicons.com/3.0.8/fonts/filled/boxicons-filled.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.boxicons.com/3.0.8/fonts/brands/boxicons-brands.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
