// Handle keyboard activation and loading state interactions
function initializeButtons() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach((button) => {
    if (button.tagName.toLowerCase() === 'button') {
      const buttonElement = button;

      // Handle keyboard activation (Enter/Space)
      buttonElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          buttonElement.click();
        }
      });

      // Prevent default action when loading
      buttonElement.addEventListener('click', (event) => {
        const isLoading = buttonElement.getAttribute('data-loading') === 'true';
        if (isLoading) {
          event.preventDefault();
          event.stopPropagation();
        }
      });
    }
  });
}

// This file is referenced via <script is:inline src="/scripts/button.js">
// once per <Button> instance on the page (Astro doesn't dedupe is:inline tags
// the way it dedupes its own hoisted scripts), so the auto-init below guards
// against running more than once and double-binding every listener.
if (!window.__buttonsAutoInit) {
  window.__buttonsAutoInit = true;

  // Initialize immediately and also on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeButtons);
  } else {
    initializeButtons();
  }
}

// Make function available globally for testing
window.initializeButtons = initializeButtons;
