// Ensures the value is never negative
const clamp = (value) => Math.max(0, value);

// Checks if a value is within a range (inclusive)
const isBetween = (value, floor, ceil) => value >= floor && value <= ceil;

/**
 * ScrollSpy
 * @param {Object} options
 * @param {string[]} options.ids
 * @param {string} [options.defaultSection]
 * @param {number} [options.offset]
 * @param {(id: string) => void} [options.onChange]
 */
function createScrollSpy(options) {
  const { ids, defaultSection = '', offset = 1, onChange } = options;

  let activeSectionId = defaultSection;
  let prevActiveSectionId = '';

  const elements = ids.map((section) => ({
    section,
    element: document.getElementById(section),
  }));

  const listener = () => {
    const scroll = window.scrollY;

    const position = elements.find(({ element }) => {
      if (!element) return false;

      const rect = element.getBoundingClientRect();
      const top = clamp(rect.top + scroll - offset);
      const bottom = clamp(rect.bottom + scroll - offset);

      return isBetween(scroll, top, bottom);
    });

    const currentSectionId = position ? position.section : '';

    if (prevActiveSectionId === currentSectionId) return;

    prevActiveSectionId = currentSectionId;
    activeSectionId = currentSectionId;

    // Callback when section changes
    if (onChange) onChange(activeSectionId);
  };

  // Init
  listener();

  window.addEventListener('scroll', listener);
  window.addEventListener('resize', listener);

  // Cleanup function (optional)
  return {
    getActive: () => activeSectionId,
    destroy: () => {
      window.removeEventListener('scroll', listener);
      window.removeEventListener('resize', listener);
    },
  };
}

/**
 * Active Indicator (vanilla version)
 * @param {Object} options
 * @param {string[]} options.ids
 * @param {HTMLElement} options.indicatorEl
 */
function createActiveIndicator({ ids, indicatorEl }) {
  const links = Object.fromEntries(ids.map((id) => [id, null]));

  // Helper to register links (instead of React ref)
  function registerLink(id, el) {
    links[id] = el;
  }

  // Update indicator position
  function updateIndicator(id) {
    const activeLink = links[id];
    if (!activeLink || !indicatorEl) return;

    indicatorEl.style.left = activeLink.offsetLeft + 'px';
    indicatorEl.style.width = activeLink.offsetWidth + 'px';
    activeLink.classList.add('active');
    Object.values(links).forEach((link) => {
      if (link !== activeLink) {
        link.removeAttribute('class');
      }
    });
  }

  // Use previous scroll spy
  const spy = createScrollSpy({
    ids,
    defaultSection: ids[0],
    offset: 65,
    onChange: (id) => {
      updateIndicator(id);
    },
  });

  // Initial position (important)
  setTimeout(() => {
    updateIndicator(spy.getActive());
  }, 0);

  return {
    registerLink,
    destroy: spy.destroy,
  };
}
