import './work.styles.scss';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useAppState } from '@/state';
import { filterProjects } from './filter-projects.function';
import { SearchBar } from './search-bar.component';
import { ProjectCard } from './project-card.component';

/** Number of projects to display per page. */
const PROJECTS_PER_PAGE = 3;

/** ID of the work section for scrolling. */
const INPUT_ID = 'work-search';

/** Section renders the work information. */
export function WorkSection() {
  const { projects } = useAppState();

  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => filterProjects(projects, query), [query]);
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  // Get projects for current page
  const displayedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage, PROJECTS_PER_PAGE]);

  const onSearch = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (page === currentPage) return;

    setCurrentPage(page);
    // Scroll to top of work section when changing pages
    setTimeout(() => {
      const firstProject = document.querySelector('a[href^="/project/"]') as HTMLElement;
      firstProject?.focus();

      const searchSection = document.getElementById(INPUT_ID)!;
      searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 10);
  };

  const goToPreviousPage = goToPage(Math.max(1, currentPage - 1));
  const goToNextPage = goToPage(Math.min(totalPages, currentPage + 1));

  return (
    <section id="work">
      <div className="work-container">
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
              className="pagination-arrow"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              ←
            </button>

            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  className={clsx('pagination-number', currentPage === page && 'active')}
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
              className="pagination-arrow"
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
