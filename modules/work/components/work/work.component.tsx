'use client';

import './work.styles.scss';

import { useMemo, useState } from 'react';

import { type Project } from '@/modules/project';

import { filterProjects } from '../../utils/filter-projects.function';
import { ProjectCard } from '../project-card';
import { SearchBar } from '../search-bar';

/** Number of projects to display per page. */
const PROJECTS_PER_PAGE = 3;

/** ID of the work section for scrolling. */
const INPUT_ID = 'work-search';

/** Props for the interactive work section. */
export type WorkSectionProps = {
  projects: Project[];
};

/**
 * Renders searchable and paginated project cards.
 *
 * @param props - Published projects supplied by the server route.
 * @returns The interactive work section.
 */
export function WorkSection(props: WorkSectionProps) {
  const { projects } = props;

  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => filterProjects(projects, query), [projects, query]);
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  // Get projects for current page
  const displayedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;

    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage]);

  const onSearch = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (page === currentPage) {
      return;
    }

    setCurrentPage(page);
    // Scroll to top of work section when changing pages
    setTimeout(() => {
      const firstProject = document.querySelector('a[href^="/project/"]') as HTMLElement;

      firstProject?.focus();

      const searchSection = document.getElementById(INPUT_ID);

      searchSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 10);
  };

  const goToPreviousPage = goToPage(Math.max(1, currentPage - 1));
  const goToNextPage = goToPage(Math.min(totalPages, currentPage + 1));

  return (
    <section id="work">
      <div>
        <h2>Work</h2>
        <p className="overline">
          I build software with intention—focused on quality, performance, and meaningful product
          impact. I care about the details and how each decision shapes the final experience. Below
          are some of the projects that represent my best work.
        </p>

        <SearchBar id={INPUT_ID} value={query} onChange={onSearch} />

        {/* Projects */}
        {displayedProjects.length ? (
          <div className="projects">
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="empty">No results found.</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              ←
            </button>

            <div>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={goToPage(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                  disabled={currentPage === page}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              aria-label="Go to next page"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
