// Handle keyboard navigation and event responses for interactive cards
function initializeCardInteractions() {
  const interactiveCards = document.querySelectorAll('.card-interactive');

  interactiveCards.forEach(card => {
    const cardElement = card;

    // Handle keyboard activation
    cardElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        cardElement.click();
      }
    });

    // Handle hover effects for tests
    cardElement.addEventListener('mouseenter', () => {
      cardElement.style.transform = 'translateY(-4px) scale(1.02)';
    });

    cardElement.addEventListener('mouseleave', () => {
      cardElement.style.transform = '';
    });

    // Handle focus styles for tests
    cardElement.addEventListener('focus', () => {
      cardElement.style.outline = 'var(--focus-ring)';
      cardElement.style.outlineOffset = 'var(--focus-ring-offset)';
    });

    cardElement.addEventListener('blur', () => {
      cardElement.style.outline = '';
      cardElement.style.outlineOffset = '';
    });
  });
}

// This file is referenced via <script is:inline src="/scripts/card.js"> once
// per <Card interactive> instance on the page (Astro doesn't dedupe is:inline
// tags the way it dedupes its own hoisted scripts), so the auto-init below
// guards against running more than once and double-binding every listener.
if (!window.__cardInteractionsAutoInit) {
  window.__cardInteractionsAutoInit = true;

  // Initialize immediately if DOM is ready, otherwise wait for DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCardInteractions);
  } else {
    initializeCardInteractions();
  }
}

// Also expose function globally for test environments
if (typeof window !== 'undefined') {
  window.initializeCardInteractions = initializeCardInteractions;
}
