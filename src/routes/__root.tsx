import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';

import appCss from '../styles/index.scss?url';
import { getContent } from '@/actions/get-content';
import { getProjects } from '@/actions/get-projects';
import type { RouterContext } from '@/types/router-context';
import { getCookies } from '@tanstack/react-start/server';
import { useEffect } from 'react';
import { ThemePickerProvider, type ThemeType } from '@/components/theme-picker';
import { createServerOnlyFn } from '@tanstack/react-start';

const getServerCookies = createServerOnlyFn(() => getCookies());

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
      },
      { rel: 'stylesheet', href: 'https://cdn.boxicons.com/3.0.8/fonts/basic/boxicons.min.css' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.boxicons.com/3.0.8/fonts/filled/boxicons-filled.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.boxicons.com/3.0.8/fonts/brands/boxicons-brands.min.css',
      },
      { rel: 'stylesheet', href: appCss },
    ],
    meta: [
      { charSet: 'utf-8' },
      { title: 'Miguel Bogota' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  }),
  beforeLoad: async () => {
    const [content, projects] = await Promise.all([getContent(), getProjects()]);
    console.log('✨ Loaded content and projects!');

    return {
      content,
      projects,
    };
  },
  loader: () => {
    const cookies = getServerCookies();

    return {
      theme: (cookies['theme'] ?? 'system') as ThemeType,
    };
  },
  notFoundComponent: () => <p>Page not found.</p>,
  errorComponent: ({ error }) => (
    <div>
      <h1>Something went wrong</h1>
      <pre>{error.message}</pre>
    </div>
  ),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { theme } = Route.useLoaderData();

  /**
   * Fixes the issue where the buttons are not clickable on mobile devices by adding a
   * touchstart listener that triggers a click event.
   */
  useEffect(() => {
    function handleTouchStart(this: Document, event: TouchEvent) {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        try {
          event.preventDefault();
          target.click();
        } catch (er) {}
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    return () => document.removeEventListener('touchstart', handleTouchStart);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning data-theme={theme}>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemePickerProvider theme={theme}>{children}</ThemePickerProvider>
        <Scripts />
      </body>
    </html>
  );
}
