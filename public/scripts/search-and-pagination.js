const PAGE_SIZE = 3;

const search = document.getElementById('search-bar');
const searchInput = document.getElementById('search-bar-input');
const projectsContainer = document.querySelector('.projects');
const pagination = document.querySelector('.pagination');
const pageNumbersContainer = document.querySelector('.pagination-numbers');
const prevBtn = document.querySelector('.pagination-arrow:first-child');
const nextBtn = document.querySelector('.pagination-arrow:last-child');

let filteredProjects = [...window.projects];
let currentPage = 1;
let initialized = false;

// 🧠 Render pagination buttons
function renderPagination() {
  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);

  pageNumbersContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'pagination-number' + (i === currentPage ? ' active' : '');
    btn.textContent = i;
    btn.setAttribute('aria-label', `Go to page ${i}`);
    btn.setAttribute('aria-current', i === currentPage ? 'true' : 'false');

    btn.addEventListener('click', () => {
      currentPage = i;
      update();
      search.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    pageNumbersContainer.appendChild(btn);
  }

  // Disable arrows
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  // Show/hide pagination based on total pages
  if (totalPages <= 1) {
    pagination.style.display = 'none';
  } else {
    pagination.style.display = 'flex';
  }
}

function update() {
  renderProjects({
    pageSize: PAGE_SIZE,
    projects: filteredProjects,
    projectsContainer: projectsContainer,
  });
  renderPagination();
}

// 🔍 Search logic
function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();

  // Split query into individual tokens and normalize each
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

  const filtered = window.projects.filter((p) => {
    // Check if ALL tokens match AT LEAST ONE field each
    return tokens.every((t) => {
      const matchesDisplayName = p.displayName.toLowerCase().includes(t);
      const matchesIndustry = p.industry.toLowerCase().includes(t);
      const matchesTags = p.tags.some((tag) => tag.toLowerCase().includes(t));
      const matchesSummary = p.summary.toLowerCase().includes(t);
      const matchesRole = p.role.toLowerCase().includes(t);
      const matchesCompanyName = p.companyName.toLowerCase().includes(t);
      const matchesChallenge = p.challenge.description.toLowerCase().includes(t);
      const matchesSolution = p.solution.description.toLowerCase().includes(t);
      const matchesYear = p.startedAt.includes(t);

      return (
        matchesDisplayName ||
        matchesIndustry ||
        matchesTags ||
        matchesSummary ||
        matchesRole ||
        matchesCompanyName ||
        matchesChallenge ||
        matchesSolution ||
        matchesYear
      );
    });
  });

  filteredProjects = filtered;
  currentPage = 1;
  update();
}

// 🔁 Pagination arrows
function setupPaginationControls() {
  prevBtn?.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      search.scrollIntoView({ behavior: 'smooth', block: 'start' });
      update();
    }
  });

  nextBtn?.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);
    if (currentPage < totalPages) {
      currentPage++;
      search.scrollIntoView({ behavior: 'smooth', block: 'start' });
      update();
    }
  });
}

// ⚡ Lazy init (only when user interacts)
function init() {
  if (initialized) return;
  initialized = true;

  setupPaginationControls();
  searchInput?.addEventListener('input', handleSearch);
}

// 👇 Only activate when user interacts
init();
