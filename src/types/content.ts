export interface Content {
  navigation: {
    logoName: string;
    links: {
      id: string;
      label: string;
    }[];
    externalLink: { href: string; label: string };
  };

  profile: {
    overline: string;
    image: {
      url: string;
      alt: string;
    };
    title: string;
    description: string;
  };

  work: {
    title: string;
    description: string;
    loadMore: string;
    noMoreRecords: string;
  };
  social: {
    title: string;
    description: string;
    links: {
      label: string;
      icon: string;
      link: string;
    }[];
  };

  footer: {
    text: string;
  };
}
