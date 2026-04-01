let dialog;
let currentHref = null;

function createDialog() {
  dialog = document.createElement('dialog');
  dialog.className = 'project-dialog';

  dialog.innerHTML = `
        <div class="dialog-content">
          <button class="dialog-close" aria-label="Close">×</button>
          <div class="dialog-body">
            <p>Modal opened</p>
          </div>
        </div>
      `;

  document.body.appendChild(dialog);

  // Close button
  dialog.querySelector('.dialog-close').addEventListener('click', closeDialog);

  // Click outside closes
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeDialog();
  });
}

function openDialog(href) {
  if (!dialog) createDialog();

  currentHref = href;

  // Push URL without reload
  window.history.pushState(null, null, href);

  dialog.showModal();
}

function closeDialog() {
  if (!dialog || !dialog.open) return;

  dialog.close();

  // Go back in history ONLY if we pushed state
  if (currentHref) {
    currentHref = null;
    window.history.back();
  }
}

// Handle clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;

  const href = link.getAttribute('href');

  if (!href || !href.startsWith('/project')) return;

  e.preventDefault();
  openDialog(href);
});

// Handle back/forward navigation
window.addEventListener('popstate', (event) => {
  if (dialog && dialog.open) {
    dialog.close();
    currentHref = null;
  }
});
