# Plan
Create a contact page at `/contact` route following patrickellis.io/contact design patterns, using existing profile image and social links from the codebase. This is a single-phase implementation leveraging established Astro.js patterns.

## Phase 1 - Contact Page Implementation
Create contact page using existing layout patterns, profile image, and social link components from the codebase.

### Tasks
- [ ] [P] Analyze existing social links implementation in src/components/Footer.astro
- [ ] [P] Analyze layout patterns in src/pages/index.astro and src/layouts/HomeLayout.astro
- [ ] [P] Verify profile image exists at ./public/images/profile.jpg
- [ ] Create src/pages/contact.astro following reference design at patrickellis.io/contact
- [ ] Implement responsive grid layout with profile image and contact information
- [ ] Integrate social links using existing Footer.astro patterns
- [ ] Test page accessibility (alt text, aria labels)
- [ ] Verify responsive design across viewport sizes
- [ ] Test navigation to /contact route
- [ ] Test all social link functionality
- [ ] Run tests, linter, type-check, and build

### Phase Acceptance Checks
- Unit tests pass (if applicable)
- Linter passes
- Typecheck passes
- Build passes
- Contact page accessible at /contact route
- Profile image displays correctly
- All social links function properly
- Responsive design works on mobile/tablet/desktop
- Navigation integration works properly

### Testing Strategy
Utilize manual testing primarily for this static page implementation.

**Manual Testing Focus:**
- Page rendering and layout verification using Astro dev server
- Social link functionality testing (external URL navigation)
- Responsive design verification using browser dev tools
- Accessibility compliance using browser accessibility tools

**Automated Testing (Future Enhancement):**
- Integration tests for page rendering if Vitest setup is extended
- E2E tests for navigation and social link functionality
- Mock external social media URLs to avoid external dependencies

**Key Testing Areas:**
- Layout matches reference design aesthetic
- Profile image loading from ./public/images/profile.jpg
- Social links match existing Footer.astro implementation
- Responsive breakpoints align with existing site patterns
- Navigation integration with existing header/footer components