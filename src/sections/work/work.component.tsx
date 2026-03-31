import './work.styles.scss';

import type { Content } from '@/types/content';
import { useMemo, useState } from 'react';
import { WorkProjectCard } from './work-project-card.component';
import { WorkSearchBar } from './work-search-bar.component';
import { filterWorkProjects } from './work.utils';
import type { Project } from '@/types/project';

export type WorkProps = {
  content: Content['work'];
  projects: Project[];
};

/**
 * Work section with searchable project cards.
 */
export function Work(props: WorkProps) {
  const { content, projects } = props;

  const { title, description } = content;

  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => filterWorkProjects(projects, query), [query]);

  const projectsPerPage = 3;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Get projects for current page
  const displayedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage, projectsPerPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of work section when changing pages
    if (page !== currentPage) {
      const workSection = document.getElementById('work-search-bar');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const goToPreviousPage = () => {
    const newPage = Math.max(1, currentPage - 1);
    setCurrentPage(newPage);
    const workSection = document.getElementById('work-search-bar');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToNextPage = () => {
    const newPage = Math.min(totalPages, currentPage + 1);
    setCurrentPage(newPage);
    const workSection = document.getElementById('work-search-bar');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="works">
      <div className="work-container">
        <header>
          <h2>{title}</h2>
          <p className="overline">{description}</p>
        </header>

        <WorkSearchBar value={query} onChange={setQuery} />

        {displayedProjects.length ? (
          <div className="work-grid">
            {displayedProjects.map((project) => (
              <WorkProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="work-empty">No results</div>
        )}

        {totalPages > 1 && (
          <div className="work-pagination">
            <button
              className="work-pagination-arrow"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              ←
            </button>

            <div className="work-pagination-numbers">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  className={`work-pagination-number ${currentPage === page ? 'active' : ''}`}
                  onClick={() => goToPage(page)}
                  aria-label={`Go to page ${page}`}
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
