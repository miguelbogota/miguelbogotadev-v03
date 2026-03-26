import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';

import appCss from '../styles/base.scss?url';
import { getContent } from '@/actions/get-content';
import { getProjects } from '@/actions/get-projects';
import type { RouterContext } from '@/types/router-context';

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCss }],
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
    <html lang="en" suppressHydrationWarning>
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
