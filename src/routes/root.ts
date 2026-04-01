import { type Content } from '../types/content';
import type { Project } from '../types/project';
import { type ThemeType } from '../types/theme';
import { initNavigationScrollIndicator } from '../components/navigation';
import { initPaginationAndSearchbar } from '../sections/work';

/** Base Route Props */
export type BaseProps = {
  children: string;
  content: Content;
  projects: Project[];
  theme: ThemeType;
};

/** Base Route */
export const RootRoute = ({ children, content, projects, theme }: BaseProps) => /*html*/ `
<html lang="en" data-theme="${theme}">
  <head>
    <!-- Meta -->
    <meta charset="utf-8" />
    <title>Miguel Bogota</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Favicon -->
    <link rel="icon" href="/favicon.ico" />

    <!-- Fonts (Google) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    />

    <!-- Boxicons -->
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

    <!-- App CSS -->
    <link rel="stylesheet" href="/styles/reset.css" />
    <link rel="stylesheet" href="/styles/variables.css" />
    <link rel="stylesheet" href="/styles/base.css" />

    <!-- Sections -->
    <link rel="stylesheet" href="/styles/sections/profile.css" />
    <link rel="stylesheet" href="/styles/sections/work.css" />
    <link rel="stylesheet" href="/styles/sections/social.css" />

    <!-- Components -->
    <link rel="stylesheet" href="/styles/components/navigation.css" />
    <link rel="stylesheet" href="/styles/components/footer.css" />
  </head>
  <body>
    ${children}
  </body>

  <!-- Scripts -->
  <script>
    var projects = ${JSON.stringify(projects)};
  </script>
  <script src="/scripts/navigation-scroll-indicator.js"></script>
  ${initNavigationScrollIndicator(content.navigation)}

  ${initPaginationAndSearchbar({ ...content.work, projects })}
  <script src="/scripts/search-and-pagination.js"></script>

  <script src="/scripts/drawer.js"></script>
</html>`;
