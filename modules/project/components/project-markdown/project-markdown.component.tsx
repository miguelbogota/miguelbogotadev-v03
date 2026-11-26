import './project-markdown.styles.scss';

import ReactMarkdown, { type Components } from 'react-markdown';

/** Markdown element overrides shared by project and initiative case studies. */
const MARKDOWN_COMPONENTS: Components = {
  img(props) {
    const { node, alt, ...imageProps } = props;

    void node;

    return (
      // Project media uses remote URLs that are not configured for Next image optimization.
      // eslint-disable-next-line @next/next/no-img-element
      <img {...imageProps} alt={alt ?? ''} width={1200} height={800} loading="lazy" />
    );
  },
};

/** Markdown overrides that nest initiative headings beneath their disclosure heading. */
const INITIATIVE_MARKDOWN_COMPONENTS: Components = {
  ...MARKDOWN_COMPONENTS,
  h2(props) {
    const { node, ...headingProps } = props;

    void node;

    return <h4 {...headingProps} />;
  },
  h3(props) {
    const { node, ...headingProps } = props;

    void node;

    return <h5 {...headingProps} />;
  },
  h4(props) {
    const { node, ...headingProps } = props;

    void node;

    return <h6 {...headingProps} />;
  },
};

/** Properties for rendered project Markdown. */
export type ProjectMarkdownProps = {
  markdown: string;
  headingOffset?: 0 | 2;
};

/**
 * Renders trusted project Markdown with safe media defaults.
 *
 * @example
 * ```tsx
 * <ProjectMarkdown markdown={content.overview} />
 * ```
 *
 * @param props - Markdown content without YAML frontmatter.
 * @returns Rendered case-study content.
 */
export function ProjectMarkdown(props: ProjectMarkdownProps) {
  const { markdown, headingOffset = 0 } = props;

  return (
    <div className="project-markdown" data-heading-offset={headingOffset}>
      <ReactMarkdown
        components={headingOffset === 2 ? INITIATIVE_MARKDOWN_COMPONENTS : MARKDOWN_COMPONENTS}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
