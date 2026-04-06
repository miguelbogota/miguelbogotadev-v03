export const mockState: Window['__STATE__'] = {
  url: 'http://localhost:3000/',
  theme: 'system',
  content: {
    title: 'Miguel Bogota',
    navigation: {
      name: 'MIGUEL BOGOTA',
      links: [
        { id: 'profile', label: 'PROFILE' },
        { id: 'work', label: 'WORK' },
        { id: 'social', label: 'SOCIAL' },
      ],
      actions: {
        resume: {
          href: 'https://youtu.be',
          label: 'RESUME',
        },
        themePicker: {
          ariaLabel: 'Theme selector',
          options: [
            { label: 'Light', ariaLabel: 'Light mode', value: 'light', icon: 'bx-sun' },
            { label: 'Dark', ariaLabel: 'Dark mode', value: 'dark', icon: 'bx-moon' },
            'divider',
            {
              label: 'System',
              ariaLabel: 'System preference',
              value: 'system',
              icon: 'bx-desktop',
            },
          ],
        },
      },
    },
    profile: {
      overline: "Hi, I'm Miguel Bogota",
      image: {
        url: '/profile.png',
        alt: "Miguel Bogota's profile picture",
      },
      title: 'Senior Software Engineer\nBuilding AI-Enhanced Systems\nAnd Product Design',
      description:
        "Senior software engineer building scalable, high-impact products with a sharp focus on performance, design, and clean architecture. I enjoy turning complex ideas into intuitive experiences, and I'm currently exploring how AI can power smarter, more adaptive applications (and still a fan of cats 🐱).",
    },
    work: {
      title: 'Work',
      description:
        'I build software with intention—focused on quality, performance, and meaningful product impact. I care about the details and how each decision shapes the final experience. Below are some of the projects that represent my best work.',
      noResults: 'No results found.',
      searchBar: {
        label: 'Search works',
        placeholder: 'Search projects…',
      },
      card: {
        aria: {
          leadingLabel: 'View details for',
          trailingLabel: 'project -',
        },
        viewDetails: 'VIEW DETAILS',
      },
      pagination: {
        previous: 'Go to previous page',
        goToPage: 'Go to page ',
        next: 'Go to next page',
      },
    },
    social: {
      title: 'Find me Around the Web',
      description:
        "Let's build something great together. Whether it's a new idea or an existing product, I'd be happy to help bring it to life with a focus on quality, performance, and user experience. Feel free to reach out via email or connect with me on social media—I'd love to hear about what you're working on.",
      links: [
        {
          label: 'Email link',
          icon: 'bxf bx-envelope',
          link: 'mailto:contact@miguelbogota.dev',
        },
        {
          label: 'GitHub profile link',
          icon: 'bxl bx-github',
          link: 'https://github.com/miguelbogota',
        },
        {
          label: 'LinkedIn profile link',
          icon: 'bxl bx-linkedin-square',
          link: 'https://linkedin.com/in/miguelbogota',
        },
        {
          label: 'Instagram profile link',
          icon: 'bxl bx-instagram-alt',
          link: 'https://instagram.com/migue_bogota',
        },
      ],
    },
    projectDetails: {
      backButton: 'Back',
      closeButton: 'Close project details',
      thumbnailLabel: 'View image ',
    },
    notFound: {
      title: '404',
      description: "The page you're looking for doesn't exist.",
      goHomeButton: 'Go Home',
    },
    footer: {
      text: 'Designed & Built by Miguel Bogota',
    },
  },
  projects: [
    {
      id: 'miguelbogotadev-v03',
      startedAt: '2026-01-01',
      isCurrent: false,
      isArchived: false,
      displayName: 'Miguel Bogota Dev V3',
      summary:
        'Miguel Bogota Dev V3 is the latest iteration of the personal portfolio, leveraging TanStack Start for cutting-edge fullstack framework capabilities. Deployed on Firebase App Hosting, the portfolio consumes data from the Miguel Bogota Dev API, representing the evolution toward modern, composable web architecture.',
      role: 'Full Stack Developer',
      companyName: 'Personal Project',
      industry: 'Portfolio',
      tags: [
        'TanStack Start',
        'React',
        'TypeScript',
        'Firebase App Hosting',
        'Fullstack Framework',
        'Server Functions',
        'API Integration',
        'Isomorphic JavaScript',
        'Modern Web Architecture',
        'Performance',
      ],
      challenge: {
        title:
          'Exploring next-generation fullstack frameworks that blur the lines between client and server while maintaining a unified development experience.',
        description:
          'As the web platform evolved, new frameworks emerged offering unprecedented developer experience through better abstraction of client-server boundaries. The challenge was evaluating TanStack Start as a next-generation fullstack framework—understanding its server function capabilities, file-based routing, and how to effectively structure a portfolio application using these new paradigms. This required rethinking architectural patterns and embracing a more integrated approach to fullstack development.',
      },
      solution: {
        title:
          'Architecting a modern portfolio with TanStack Start and Firebase App Hosting, demonstrating cutting-edge fullstack development patterns.',
        description:
          'V3 represents the current evolution of the portfolio, built with TanStack Start to explore modern fullstack framework capabilities. Server functions handle backend logic seamlessly, enabling isomorphic code that runs on both client and server as appropriate. The application continues to integrate with the Miguel Bogota Dev API for data management, maintaining the separation of concerns established in v2. Firebase App Hosting provides a modern deployment platform optimized for fullstack applications. TypeScript throughout ensures type safety across the entire application. This version serves as both a functional portfolio and an experimental ground for evaluating emerging web technologies. The progression from v1 to v3 demonstrates the rapid evolution of web development tools and the importance of staying current with modern practices.',
      },
      images: [
        {
          src: '/project-images/miguelbogotadev-v3/01.png',
          alt: 'Miguel Bogota Dev V3 - Fullstack Modern Portfolio',
        },
      ],
      links: {
        github: 'https://github.com/miguelbogota/miguelbogotadev-v3',
        website: 'https://miguelbogotadev-v3.web.app',
      },
    },
    {
      id: 'miguelbogotadev-v02',
      startedAt: '2023-06-15',
      isCurrent: false,
      isArchived: true,
      displayName: 'Miguel Bogota Dev V2',
      summary:
        'Miguel Bogota Dev V2 is the second iteration of the personal portfolio, built with Next.js for improved performance and server-side rendering capabilities. The portfolio integrates with the Miguel Bogota Dev API to fetch project and experience data, creating a dynamic, data-driven experience with modern fullstack architecture.',
      role: 'Full Stack Developer',
      companyName: 'Personal Project',
      industry: 'Portfolio',
      tags: [
        'Next.js',
        'React',
        'TypeScript',
        'Firebase Hosting',
        'Cloud Functions',
        'Server-side Rendering',
        'API Integration',
        'Performance Optimization',
        'Data-driven Content',
        'Modern Portfolio',
      ],
      challenge: {
        title:
          'Modernizing the portfolio architecture with server-side rendering while establishing a clean separation between data management and presentation layers.',
        description:
          'Version 1 worked well, but modern web standards demanded better performance, SEO, and scalability. The challenge was migrating from a purely client-side Angular app to a Next.js fullstack architecture that leveraged server-side rendering for superior performance. Additionally, integrating with the newly created Miguel Bogota Dev API meant establishing reliable client-server communication patterns and handling data fetching efficiently.',
      },
      solution: {
        title:
          'Building a modernized portfolio with Next.js, Firebase Cloud Functions, and API integration for superior performance and data management.',
        description:
          "I rebuilt the portfolio with Next.js to unlock server-side rendering benefits and improved performance metrics. The application consumes data from the Miguel Bogota Dev API, creating a clean separation between content management and presentation. Firebase Hosting provides the frontend infrastructure, while Cloud Functions handle serverless backend operations. This architecture enables dynamic content updates without redeploying the entire application. TypeScript enforces type safety throughout the stack. The experience demonstrated the power of modern fullstack frameworks and the importance of scalable data architectures. V2 served as a bridge between v1's foundation and the modern frameworks that would follow.",
      },
      images: [
        {
          src: '/project-images/miguelbogotadev-v2/01.png',
          alt: 'Miguel Bogota Dev V2 - Modern Portfolio Interface',
        },
      ],
      links: {
        github: 'https://github.com/miguelbogota/miguelbogotadev-v2',
        website: 'https://miguelbogotadev-v2.web.app',
      },
    },
    {
      id: 'crypto-june',
      startedAt: '2022-04-25',
      isCurrent: false,
      isArchived: false,
      displayName: 'Crypto June',
      summary:
        'Crypto June is a cross-platform mobile application that enables users to monitor cryptocurrency prices and portfolio performance in real-time. Built entirely with React Native and Expo, the app delivers a native-quality experience on both iOS and Android, providing investors with instant access to their digital asset tracking.',
      role: 'React Native Cross-Platform Developer',
      companyName: 'Personal Project',
      industry: 'Fintech & Cryptocurrency',
      tags: [
        'React Native',
        'Expo',
        'TypeScript',
        'Mobile Development',
        'RNUILib',
        'CoinGecko API',
        'Real-time Data',
        'Redux',
        'Redux Toolkit',
        'State Management',
        'SWR',
        'ESLint',
        'Prettier',
        'Babel',
        'Cross-platform Development',
      ],
      challenge: {
        title:
          'Engineering a performant cryptocurrency tracking app that delivers real-time price updates across iOS and Android while maintaining smooth UI performance.',
        description:
          'Building a cryptocurrency price tracker required solving multiple technical challenges simultaneously. The app needed to fetch real-time data from external APIs, display updates instantly without draining battery or bandwidth, and maintain a smooth, responsive interface across different device capabilities. As the sole developer, I also needed to master both iOS and Android deployment while ensuring the codebase remained maintainable for future enhancements.',
      },
      solution: {
        title:
          'Architecting a cross-platform mobile app using React Native and Expo to deliver native performance with shared code across iOS and Android platforms.',
        description:
          'I built Crypto June as a complete learning project in mobile development, leveraging React Native and Expo to maximize code reuse while delivering native performance on both iOS and Android. The app integrates with the CoinGecko API for real-time cryptocurrency data, using SWR for intelligent caching and efficient data fetching. Redux and Redux Toolkit manage complex application state around user portfolios and price alerts. The UI layer uses RNUILib for a polished, native-feeling experience with smooth animations. By enforcing code quality with TypeScript, ESLint, and Prettier throughout development, I ensured the codebase remained professional and maintainable. The result demonstrates the feasibility of building production-quality fintech applications with React Native.',
      },
      images: [
        {
          src: '/project-images/crypto-june/01.png',
          alt: 'Crypto June - Cryptocurrency Price Dashboard',
        },
        {
          src: '/project-images/crypto-june/02.gif',
          alt: 'Crypto June - Real-time Price Updates Animation',
        },
        {
          src: '/project-images/crypto-june/03.png',
          alt: 'Crypto June - Portfolio Management Screen',
        },
      ],
      links: { github: 'https://github.com/miguelbogota/crypto-june' },
    },
    {
      id: 'miguelbogotadev-v01',
      startedAt: '2021-01-11',
      isCurrent: false,
      isArchived: true,
      displayName: 'Miguel Bogota Dev V1',
      summary:
        'Miguel Bogota Dev V1 is the first iteration of a personal portfolio website designed to showcase professional work and projects. Built with Angular and Firebase, the platform emphasizes minimalist design principles and smooth visual interactions to create an engaging user experience.',
      role: 'Full Stack Developer',
      companyName: 'Personal Project',
      industry: 'Portfolio',
      tags: [
        'Angular',
        'TypeScript',
        'Firebase',
        'Angular Animation',
        'State Management',
        'Minimalist Design',
        'Responsive Design',
        'Web Development',
        'Portfolio Website',
      ],
      challenge: {
        title:
          'Designing a minimalist portfolio that demonstrates technical skills through elegant interactions and clean visual presentation.',
        description:
          "Building a personal portfolio meant more than displaying projects—it needed to be a testament to design sensibility and technical capability. The challenge was creating an interface so minimal and purposeful that every visual element served a function. Angular animations needed to feel natural, state management had to be invisible to the user, and the overall experience had to feel modern and professional despite the constraints of Firebase's basic backend structure.",
      },
      solution: {
        title:
          'Creating a minimalist portfolio platform with Angular animations and state management to deliver a polished, modern portfolio experience.',
        description:
          "I built the first version of my portfolio with Angular as the frontend framework, leveraging its powerful animation system to craft smooth, purposeful transitions that enhance rather than distract. Firebase provided backend infrastructure for content management and hosting. Using Angular's built-in state management capabilities, I ensured the application remained responsive and performant. The design philosophy was ruthless minimalism—every visual element was intentional, every interaction meaningful. The result is a portfolio that showcases not just the work itself, but the attention to detail and technical craftsmanship behind its construction. This v1 served as a learning foundation for building professional portfolio presence online.",
      },
      images: [
        {
          src: '/project-images/miguelbogotadev-v1/01.png',
          alt: 'Miguel Bogota Dev V1 - Minimalist Portfolio',
        },
      ],
      links: {
        github: 'https://github.com/miguelbogota/miguelbogotadev-v1',
        website: 'https://miguelbogotadev.web.app',
      },
    },
    {
      id: 'clothing-park',
      startedAt: '2020-10-21',
      isCurrent: false,
      isArchived: true,
      displayName: 'Clothing Park',
      summary:
        'Clothing park is a personal project which help me to improve technologies like React, Redux, Firebase and good practices. With an effort to keep my skill sharp I took the initiative to create something different and new while improving some of my low areas.',
      role: 'React Full Stack Developer',
      companyName: 'Personal Project',
      industry: 'E-commerce',
      tags: [
        'React',
        'Node.js',
        'PostgreSQL',
        'Stripe',
        'Typescript',
        'Redux',
        'Redux Sagas',
        'ESLint',
        'Prettier',
        'Babel',
        'Sass',
      ],
      challenge: {
        title:
          'Mastering advanced state management patterns while building a production-grade application without prior hands-on experience.',
        description:
          'Learning React fundamentals was just the beginning. The real challenge emerged when tackling Redux architecture, Redux Sagas for side effects, and integrating third-party services like Stripe for payment processing. Managing complex application state across multiple components, handling asynchronous operations, and maintaining code quality standards felt overwhelming. I needed a practical project to bridge theory and implementation.',
      },
      solution: {
        title:
          'Building a complete e-commerce platform from concept to deployment, using it as a learning laboratory for advanced React patterns and full-stack development.',
        description:
          'I created Clothing Park as a deliberate learning exercise. By implementing Redux for centralized state management and Redux Sagas for complex async workflows, I gained hands-on experience with industry-standard patterns. The full-stack development—React frontend, Node.js backend, PostgreSQL database, and Stripe integration—forced me to understand not just individual tools, but how they work together. Enforcing TypeScript, ESLint, and Prettier from the start ensured I built professional coding habits early. The result was a production-ready application that transformed theoretical knowledge into practical expertise.',
      },
      images: [
        {
          src: 'https://raw.githubusercontent.com/miguelbogota/miguelbogotadev-api/refs/heads/production/project-images/clothing-park/01.png',
          alt: 'Clothing Park - Home Page',
        },
        {
          src: 'https://raw.githubusercontent.com/miguelbogota/miguelbogotadev-api/refs/heads/production/project-images/clothing-park/02.png',
          alt: 'Clothing Park - Shop Page',
        },
        {
          src: 'https://raw.githubusercontent.com/miguelbogota/miguelbogotadev-api/refs/heads/production/project-images/clothing-park/03.png',
          alt: 'Clothing Park - Checkout Page',
        },
      ],
      links: {
        github: 'https://github.com/miguelbogota/clothing-park',
        website: 'https://clothing-park.web.app',
      },
    },
    {
      id: 'nvc-movies',
      startedAt: '2020-09-12',
      isCurrent: false,
      isArchived: true,
      displayName: 'NVC Movies',
      summary:
        'NVC Movies is a comprehensive movie discovery and curation platform that aggregates detailed film information and enables users to discover, explore, and rank movies based on personalized preferences. The platform combines rich data visualization with an intuitive rating system.',
      role: 'Full Stack Developer',
      companyName: 'Personal Project',
      industry: 'Entertainment & Media',
      tags: [
        'Angular',
        'TypeScript',
        'Movie Database Integration',
        'Data Visualization',
        'Rating Systems',
        'ESLint',
        'Prettier',
        'Babel',
        'Web Performance',
      ],
      challenge: {
        title:
          'Building a scalable movie discovery platform that aggregates diverse data sources while providing an engaging user experience for browsing and ranking films.',
        description:
          "Creating a movie application meant interfacing with external APIs, handling large datasets efficiently, and designing an interface that makes sense of hundreds of films. The challenge involved architecting a frontend that could gracefully handle data loading, searching, filtering, and maintaining user rankings without becoming cluttered or overwhelming. This was an opportunity to strengthen full-stack fundamentals while exploring Angular's capabilities for complex data manipulation.",
      },
      solution: {
        title:
          'Developing a full-stack movie platform with Angular for dynamic front-end interactivity and Firebase for serverless backend support.',
        description:
          'NVC Movies was architected with Angular to leverage its powerful data binding and component architecture for creating responsive interfaces. I integrated movie database APIs to populate rich film information—titles, descriptions, ratings, and imagery. The application features a custom ranking system that allows users to create personalized movie lists, with all data persisting through Firebase. Code quality was maintained throughout with ESLint and Prettier enforcing consistent standards. The result is a polished application that demonstrates end-to-end full-stack development capabilities, from API integration to user interface design.',
      },
      images: [
        {
          src: 'https://images.unsplash.com/photo-1512070679279-8988d32161be?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=678&q=80',
          alt: 'NVC Movies - Movie Discovery Platform',
        },
      ],
      links: {
        github: 'https://github.com/miguelbogota/nvc-movies',
        website: 'https://nvc-moviesm.web.app',
      },
    },
    {
      id: 'rey-writer',
      startedAt: '2020-07-11',
      isCurrent: false,
      isArchived: true,
      displayName: 'Rey Writer',
      summary:
        'Rey Writer is a sophisticated personal blogging platform designed to showcase compelling narratives and literary content with an emphasis on visual elegance and readability. The platform combines a responsive frontend experience with robust backend infrastructure to deliver stories in a minimalist, distraction-free environment.',
      role: 'Full Stack Developer',
      companyName: 'Personal Project',
      industry: 'Publishing / Content Creation',
      tags: [
        'Angular',
        'TypeScript',
        'Firebase',
        'Responsive Design',
        'ESLint',
        'Prettier',
        'Babel',
        'Web Performance',
      ],
      challenge: {
        title:
          'Creating a distraction-free publishing platform that balances aesthetic minimalism with feature-rich content management while maintaining exceptional performance.',
        description:
          'Building a blog platform required more than just displaying text—it demanded a thoughtful approach to content hierarchy, visual presentation, and user experience. The challenge was designing an interface so intuitive and minimal that readers focus solely on the content, while ensuring the backend could handle dynamic content management, fast page loads, and scalable infrastructure without unnecessary complexity.',
      },
      solution: {
        title:
          'Architecting a full-stack publishing platform with Angular for a responsive, performant frontend and Firebase for scalable backend infrastructure.',
        description:
          'Rey Writer was built with Angular to create a flexible, component-driven architecture capable of handling complex content rendering and state management. By leveraging Firebase, I established a serverless backend that eliminated infrastructure overhead while providing real-time data synchronization. The minimalist design philosophy was enforced through careful attention to typography, spacing, and visual hierarchy. Code quality tools like ESLint and Prettier ensured consistency across the codebase. The result is a platform that feels lightweight and focused—exactly what serious writers need to share their stories with the world.',
      },
      images: [
        {
          src: 'https://images.unsplash.com/photo-1477013743164-ffc3a5e556da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          alt: 'Rey Writer - Minimalist Blog Homepage',
        },
        {
          src: 'https://images.unsplash.com/photo-1569322977266-acff659212fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          alt: 'Rey Writer - Article Reading Experience',
        },
        {
          src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
          alt: 'Rey Writer - Content Management Interface',
        },
      ],
      links: { website: 'TODO' },
    },
  ],
};
