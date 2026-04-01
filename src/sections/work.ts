import clsx from 'clsx';
import type { Content } from '../types/content';
import type { Project } from '../types/project';

const SEARCH_BAR_ID = 'search-bar';
const SEARCH_BAR_INPUT_ID = `${SEARCH_BAR_ID}-input`;

const PROJECTS_PER_PAGE = 3;

/** Props for the Work section. */
export type WorkProps = Content['work'] & {
  projects: Project[];
};

/** Work section component. */
export function WorkSection({
  projects,
  title,
  description,
  searchBar,
  card,
  pagination,
}: WorkProps) {
  const createSearchBar = () => /*html */ `
    <div id=${SEARCH_BAR_ID} class="work-search-bar">
      <label for=${SEARCH_BAR_INPUT_ID}>${searchBar.label}</label>
      <input
        id=${SEARCH_BAR_INPUT_ID}
        type="search"
        role="searchbox"
        placeholder="${searchBar.placeholder}"
      />
    </div>
  `;

  const createProjectCard = ({
    id,
    images,
    industry,
    startedAt,
    displayName,
    summary,
  }: Project) => {
    const heroImage = images[0]!;
    const year = startedAt.split('-')[0] ?? '';
    const ariaLabel = `${card.aria.leadingLabel} ${displayName} ${card.aria.trailingLabel} ${industry}, ${year}`;

    return /*html */ `
      <a href="/project/${id}" aria-label="${ariaLabel}">
        <article>
          <div class="media">
            <img src="${heroImage.src}" alt="${heroImage.alt}" loading="lazy" />
          </div>

          <div class="content">
            <div class="meta">${industry} — ${year}</div>

            <h3>${displayName}</h3>
            <p class="overline">${summary}</p>

            <span class="action">
              ${card.viewDetails}
            </span>
          </div>
        </article>
      </a>
    `;
  };

  const createPagination = () => {
    const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

    if (totalPages <= 1) {
      return '';
    }

    return /*html */ `
      <div class="pagination" style="display: flex;">
        <button class="pagination-arrow" aria-label="${pagination.previous}">←</button>
        <div class="pagination-numbers">
          ${Array.from({ length: totalPages }, (_, i) => i + 1)
            .map(
              (page) => /*html */ `
              <button
                class="${clsx('pagination-number', page === 1 && 'active')}"
                aria-label="${pagination.goToPage} ${page}"
                aria-current="${page === 1 ? 'true' : 'false'}"
              >
                ${page}
              </button>
            `,
            )
            .join('')}
        </div>
        <button class="pagination-arrow" aria-label="${pagination.next}">→</button>
      </div>
    `;
  };

  return /*html */ `
    <section id="work">
      <div class="work-container">
        <h2>${title}</h2>
        <p class="overline">${description}</p>

        ${createSearchBar()}

        <div class="projects">
          ${projects.slice(0, PROJECTS_PER_PAGE).map(createProjectCard).join('')}
        </div>

        ${createPagination()}
      </div>
    </section>`;
}

/** Initializes the pagination and search bar. */
export function initPaginationAndSearchbar(props: WorkProps) {
  return /*html */ `
  <script>
    function renderProject({ id, images, industry, startedAt, displayName, summary }) {
      const heroImage = images[0];
      const year = startedAt.split('-')[0] ?? '';
      const ariaLabel = '${props.card.aria.leadingLabel} ' + displayName + ' ${props.card.aria.trailingLabel}' + industry + ', ' + year;

      return \`
        <a href="/project/\${id}" aria-label="\${ariaLabel}">
          <article>
            <div class="media">
              <img src="\${heroImage.src}" alt="\${heroImage.alt}" loading="lazy" />
            </div>

            <div class="content">
              <div class="meta">\${industry} — \${year}</div>

              <h3>\${displayName}</h3>
              <p class="overline">\${summary}</p>

              <span class="action">
                ${props.card.viewDetails}
              </span>
            </div>
          </article>
        </a>
      \`;
    }

    function renderProjects({ pageSize, projects, projectsContainer }) {
      const start = (currentPage - 1) * pageSize;
      const paginated = projects.slice(start, start + pageSize);

      if (paginated.length === 0) {
        projectsContainer.innerHTML = '<p class="empty">${props.noResults}</p>';
        return;
      }

      projectsContainer.innerHTML = paginated.map(renderProject).join('');
    }
  </script>
  `;
}
