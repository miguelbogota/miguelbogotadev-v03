import './styles/index.scss';

import { renderToReadableStream } from 'react-dom/server.edge';
import { getContent } from '@/server-actions/get-content.ts';
import { getProjects } from '@/server-actions/get-projects.ts';
import { getCookieTheme } from '@/server-actions/get-cookie-theme.ts';
import clientAssets from './entry-client?assets=client';
import serverAssets from './entry-server?assets=ssr';
import { Router } from './router.tsx';

export default {
  async fetch(req: Request) {
    const assets = clientAssets.merge(serverAssets);

    const [content, projects] = await Promise.all([getContent(), getProjects()]);
    const theme = getCookieTheme(req.headers.get('cookie'));

    const projectId = req.url.split('/').pop();
    const project = projects.find((p) => p.id === projectId);

    const state = { url: req.url, theme, content, projects };

    return new Response(
      await renderToReadableStream(
        <html lang="en" data-theme={theme}>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta charSet="utf-8" />
            <title>{`Miguel Bogota${project ? ` - ${project.displayName}` : ''}`}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            />
            <link
              rel="stylesheet"
              href="https://cdn.boxicons.com/3.0.8/fonts/basic/boxicons.min.css"
            />
            <link
              rel="stylesheet"
              href="https://cdn.boxicons.com/3.0.8/fonts/filled/boxicons-filled.min.css"
            />
            <link
              rel="stylesheet"
              href="https://cdn.boxicons.com/3.0.8/fonts/brands/boxicons-brands.min.css"
            />

            {assets.css.map((attr: any) => (
              <link key={attr.href} rel="stylesheet" {...attr} />
            ))}
            {assets.js.map((attr: any) => (
              <link key={attr.href} type="modulepreload" {...attr} />
            ))}

            <script
              dangerouslySetInnerHTML={{ __html: `window.__STATE__ = ${JSON.stringify(state)};` }}
            />
            <script type="module" src={assets.entry} />
          </head>
          <body id="app">
            <Router {...state} />
          </body>
        </html>,
      ),
      { headers: { 'Content-Type': 'text/html;charset=utf-8' } },
    );
  },
};
