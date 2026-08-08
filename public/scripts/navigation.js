// Navigation functionality for mobile menu toggle and keyboard navigation.
//
// This is a plain-JS mirror of src/scripts/navigation.ts, kept in public/ so
// Astro serves it as a real external asset instead of inlining it into every
// page (which is what CSP script-src 'unsafe-inline' was covering for).
// src/scripts/navigation.ts stays in place because tests/components/Navigation.test.ts
// imports it directly as a TS module. If you change the behavior here, change
// it in both files — there is no build step wiring them together.
export class NavigationManager {
  navToggle = null;
  mobileMenu = null;
  openIcon = null;
  closeIcon = null;
  navElement = null;
  isOpen = false;

  constructor(navElement) {
    this.navElement = navElement || null;
    this.init();
  }

  init() {
    // Use provided nav element or search in document
    const scope = this.navElement || document;

    this.navToggle = scope.querySelector('.mobile-menu-button') || scope.querySelector('.nav-toggle');
    this.mobileMenu = scope.querySelector('#mobile-menu') || scope.querySelector('.mobile-menu');
    this.openIcon = scope.querySelector('.menu-icon') || scope.querySelector('.nav-toggle-open');
    this.closeIcon = scope.querySelector('.close-icon') || scope.querySelector('.nav-toggle-close');

    if (this.navToggle && this.mobileMenu) {
      this.bindEvents();
      this.updateActiveLinks();
    }
  }

  bindEvents() {
    // Click events
    this.navToggle?.addEventListener('click', this.toggleMenu.bind(this));

    // Click outside to close
    document.addEventListener('click', this.handleDocumentClick.bind(this));

    // Keyboard events
    this.navToggle?.addEventListener('keydown', this.handleToggleKeydown.bind(this));
    document.addEventListener('keydown', this.handleDocumentKeydown.bind(this));

    // Viewport resize events
    window.addEventListener('resize', this.handleResize.bind(this));

    // Navigation events for active link updates
    window.addEventListener('popstate', this.updateActiveLinks.bind(this));

    // Focus management for mobile menu
    this.setupFocusManagement();
  }

  toggleMenu() {
    if (!this.mobileMenu || !this.navToggle) return;

    this.isOpen = !this.mobileMenu.classList.contains('hidden');

    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    if (!this.mobileMenu || !this.navToggle) return;

    this.mobileMenu.classList.remove('hidden');
    this.navToggle.setAttribute('aria-expanded', 'true');
    this.mobileMenu.setAttribute('aria-hidden', 'false');

    this.openIcon?.classList.add('hidden');
    this.closeIcon?.classList.remove('hidden');

    this.isOpen = true;

    // Focus first menu item for keyboard navigation
    const firstMenuItem = this.mobileMenu.querySelector('.nav-link-mobile');
    if (firstMenuItem) {
      firstMenuItem.focus();
    }
  }

  closeMenu() {
    if (!this.mobileMenu || !this.navToggle) return;

    this.mobileMenu.classList.add('hidden');
    this.navToggle.setAttribute('aria-expanded', 'false');
    this.mobileMenu.setAttribute('aria-hidden', 'true');

    this.openIcon?.classList.remove('hidden');
    this.closeIcon?.classList.add('hidden');

    this.isOpen = false;
  }

  handleToggleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleMenu();
    }
  }

  handleDocumentClick(event) {
    if (!this.isOpen || !this.mobileMenu || !this.navToggle) return;

    const target = event.target;
    const navContainer = this.navElement || this.navToggle.closest('nav');

    // Close menu if clicking outside the navigation
    if (navContainer && !navContainer.contains(target)) {
      this.closeMenu();
    }
  }

  handleDocumentKeydown(event) {
    if (event.key === 'Escape' && this.isOpen) {
      this.closeMenu();
      this.navToggle?.focus(); // Return focus to toggle button
    }
  }

  handleResize() {
    // Close mobile menu on desktop viewport
    if (window.innerWidth >= 768 && this.isOpen) {
      this.closeMenu();
    }
  }

  updateActiveLinks() {
    const currentPath = window.location.pathname;
    const scope = this.navElement || document;

    // Update desktop navigation links
    const desktopLinks = scope.querySelectorAll('.nav-link');
    desktopLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('nav-link-active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('nav-link-active');
        link.removeAttribute('aria-current');
      }
    });

    // Update mobile navigation links
    const mobileLinks = scope.querySelectorAll('.nav-link-mobile');
    mobileLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('nav-link-active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('nav-link-active');
        link.removeAttribute('aria-current');
      }
    });
  }

  setupFocusManagement() {
    if (!this.mobileMenu) return;

    const menuItems = this.mobileMenu.querySelectorAll('.nav-link-mobile');

    if (menuItems.length === 0) return;

    menuItems.forEach((item, index) => {
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
          event.preventDefault();

          if (event.shiftKey) {
            // Shift+Tab - go to toggle button if at first item
            if (index === 0) {
              this.navToggle?.focus();
            } else {
              menuItems[index - 1].focus();
            }
          } else {
            // Tab - go to toggle button if at last item
            if (index === menuItems.length - 1) {
              this.navToggle?.focus();
            } else {
              menuItems[index + 1].focus();
            }
          }
        }
      });
    });
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new NavigationManager();
});
