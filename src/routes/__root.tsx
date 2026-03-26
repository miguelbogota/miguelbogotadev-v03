import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';

import appCss from '../styles/index.scss?url';
import { getContent } from '@/actions/get-content';
import { getProjects } from '@/actions/get-projects';
import type { RouterContext } from '@/types/router-context';

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
      { rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' },
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
  return (
    <html lang="en" suppressHydrationWarning data-theme="system">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
