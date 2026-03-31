import './work.styles.scss';

import type { Content } from '@/types/content';
import { useMemo, useState } from 'react';
import { WorkProjectCard } from './work-project-card.component';
import { WorkSearchBar } from './work-search-bar.component';
import { filterWorkProjects } from './work.utils';
import type { Project } from '@/types/project';

const PROJECTS_PER_PAGE = 3;
const INPUT_ID = 'work-search';

/**
 * Props for the Work component.
 */
export type WorkProps = Content['work'] & {
  projects: Project[];
};

/**
 * Work section with searchable and paginated project cards.
 * Displays projects in groups of 3 with pagination controls.
 */
export function Work(props: WorkProps) {
  const { projects, title, description, noResults, pagination, searchBar, card } = props;

  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => filterWorkProjects(projects, query), [query]);
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  // Get projects for current page
  const displayedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage, PROJECTS_PER_PAGE]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of work section when changing pages
    if (page !== currentPage) {
      const workSection = document.getElementById(INPUT_ID);
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const goToPreviousPage = () => goToPage(Math.max(1, currentPage - 1));
  const goToNextPage = () => goToPage(Math.min(totalPages, currentPage + 1));

  return (
    <section id="work">
      <div className="work-container">
        <header>
          <h2>{title}</h2>
          <p className="overline">{description}</p>
        </header>

        <WorkSearchBar {...searchBar} id={INPUT_ID} value={query} onChange={setQuery} />

        {/* Projects */}
        {displayedProjects.length ? (
          <div className="work-grid">
            {displayedProjects.map((project) => (
              <WorkProjectCard {...card} key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="work-empty">{noResults}</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="work-pagination">
            <button
              className="work-pagination-arrow"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              aria-label={pagination.previous}
            >
              ←
            </button>

            <div className="work-pagination-numbers">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  className={`work-pagination-number ${currentPage === page ? 'active' : ''}`}
                  onClick={() => goToPage(page)}
                  aria-label={`${pagination.goToPage} ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className="work-pagination-arrow"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              aria-label={pagination.next}
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
