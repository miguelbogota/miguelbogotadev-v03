import { getContent } from './src/actions/get-content';
import { getProjects } from './src/actions/get-projects';
import { HomeRoute } from './src/routes/home';
import { NotFoundRoute } from './src/routes/not-found';
import { ProjectRoute } from './src/routes/project';
import { getCookieTheme } from './src/utils/get-cookie-theme';

const config: ResponseInit = {
  headers: {
    'Content-Type': 'text/html',
    'Cache-Control': 'no-store',
  },
};

export default {
  fetch: async (req: Request) => {
    const path = req.url.split('/')[3];
    const canAccess = path === '' || path === 'project';

    if (!canAccess) {
      return new Response('Not Found', config);
    }

    const theme = getCookieTheme(req.headers.get('cookie'));
    const projectId = req.url.includes('project') ? req.url.split('/').pop() : null;
    const [content, projects] = await Promise.all([getContent(), getProjects()]);

    if (projectId) {
      const project = projects.find((project) => project.id === projectId);
      if (!project) return new Response(NotFoundRoute({ theme, content, projects }), config);
      return new Response(ProjectRoute({ theme, content, project, projects }), config);
    }

    return new Response(HomeRoute({ theme, content, projects }), config);
  },
};
