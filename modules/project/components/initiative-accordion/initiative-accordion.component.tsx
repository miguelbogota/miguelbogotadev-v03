'use client';

import './initiative-accordion.styles.scss';

import { useEffect, useId, useRef, useState } from 'react';

import { analyticsService } from '@/modules/analytics';

import { type ProjectInitiative } from '../../types/project.type';
import { ProjectMarkdown } from '../project-markdown';

/** Loaded Markdown associated with one project initiative. */
export type InitiativeContent = {
  id: string;
  markdown: string;
};

/** Properties for the initiative accordion. */
export type InitiativeAccordionProps = {
  initiatives: ProjectInitiative[];
  content: InitiativeContent[];
};

/**
 * Renders fully loaded project initiatives as an accessible single-open accordion.
 *
 * @example
 * ```tsx
 * <InitiativeAccordion initiatives={project.initiatives} content={content.initiatives} />
 * ```
 *
 * @param props - Initiative previews and their preloaded Markdown bodies.
 * @returns A disclosure list that keeps at most one initiative expanded.
 */
export function InitiativeAccordion(props: InitiativeAccordionProps) {
  const { initiatives, content } = props;
  const sectionId = useId();
  const [openInitiativeId, setOpenInitiativeId] = useState<string | null>(null);
  const initiativeButtons = useRef(new Map<string, HTMLButtonElement>());
  const shouldReposition = useRef(false);

  useEffect(() => {
    if (!openInitiativeId || !shouldReposition.current) {
      return;
    }

    shouldReposition.current = false;

    const button = initiativeButtons.current.get(openInitiativeId);

    if (typeof button?.scrollIntoView === 'function') {
      const behavior = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth';

      button.scrollIntoView({ behavior, block: 'start' });
    }
  }, [openInitiativeId]);

  if (initiatives.length === 0) {
    return null;
  }

  const handleToggle = (initiativeId: string) => {
    const isOpen = openInitiativeId === initiativeId;

    shouldReposition.current = openInitiativeId !== null && !isOpen;

    setOpenInitiativeId(isOpen ? null : initiativeId);
  };

  return (
    <section className="initiative-accordion" aria-labelledby={`${sectionId}-title`}>
      <div className="introduction">
        <h2 id={`${sectionId}-title`}>Work I’m Proud Of</h2>
        <p>Selected projects and initiatives from my time here.</p>
      </div>

      <div className="items">
        {initiatives.map((initiative, index) => {
          const isOpen = openInitiativeId === initiative.id;
          const buttonId = `${sectionId}-${initiative.id}-button`;
          const panelId = `${sectionId}-${initiative.id}-panel`;
          const initiativeContent = content.find((item) => item.id === initiative.id);

          return (
            <article key={initiative.id} data-open={isOpen}>
              <h3>
                <button
                  id={buttonId}
                  ref={(button) => {
                    if (button) {
                      initiativeButtons.current.set(initiative.id, button);
                    } else {
                      initiativeButtons.current.delete(initiative.id);
                    }
                  }}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => handleToggle(initiative.id)}
                >
                  <span className="heading">
                    <span>{initiative.displayName}</span>
                    <span>{initiative.role}</span>
                  </span>
                  <span className="summary">{initiative.summary}</span>
                  <span className="indicator" aria-hidden="true" />
                </button>
              </h3>

              {initiativeContent ? (
                <div
                  id={panelId}
                  className="panel"
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <div className="metadata">
                    <h4>{initiative.industry}</h4>
                    {initiative.links.length > 0 ? (
                      <div className="links" aria-label={`${initiative.displayName} links`}>
                        {initiative.links.map(({ url, label, icon }, linkIndex) => (
                          <a
                            key={`${url}-${label}`}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${initiative.displayName}: ${label} (opens in a new tab)`}
                            title={`${label} (opens in a new tab)`}
                            onClick={() =>
                              analyticsService.trackLink(
                                'project',
                                `initiative-${index + 1}-resource-${linkIndex + 1}`,
                              )
                            }
                          >
                            <i className={icon} aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="tags">
                    {initiative.tags.map((tag, index) => (
                      <span
                        key={tag}
                      >{`${tag}${index < initiative.tags.length - 1 ? ' • ' : ''}`}</span>
                    ))}
                  </div>
                  <ProjectMarkdown markdown={initiativeContent.markdown} headingOffset={2} />
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
