# Problem Statement
Create a contact page for the route `/contact` that follows the design patterns from patrickellis.io/contact, uses the existing profile image at `./public/images/profile.jpg`, and integrates existing social links from the codebase.

# Impacted Code Areas
- src/pages/contact.astro :: new file to be created for the contact page
- src/consts.ts :: NAV_ITEMS already includes contact route, no changes needed
- src/layouts/Layout.astro :: existing layout pattern to be used
- src/components/Footer.astro :: social links pattern to reference

# Patterns / Examples
- src/pages/index.astro :: hero section layout, grid structure, social links implementation
- src/layouts/HomeLayout.astro :: layout wrapper with main content styling
- src/components/Footer.astro :: social link icons and styling patterns
- patrickellis.io/contact :: reference design with profile image, contact info, and social grid

# Risks / Constraints
- Must maintain consistency with existing Astro.js patterns and component structure
- Social links must match existing footer implementation for consistency
- Profile image path is fixed to `./public/images/profile.jpg` which exists
- Contact route already defined in NAV_ITEMS, so navigation is ready
- Design should be responsive and match the site's existing aesthetic

# FAR Scores
- Factual: 5 (Clear requirements, existing patterns identified, reference site analyzed)
- Actionable: 5 (Specific file to create, clear layout patterns to follow)
- Reliable: 5 (Existing codebase patterns are stable, profile image exists)
- Relevant: 5 (Direct match to user requirements)
- **Average:** 5.0

# INVEST Flags
- Too Large: false (Single page creation with existing patterns)
- Unclear Requirement: false (Clear reference design and asset requirements)
- Risky Area: false (Straightforward page creation using established patterns)

# Testing Strategy
Based on the existing codebase structure with Vitest and Astro:

## Unit Tests
- Not immediately necessary for a static contact page
- Could test component props if contact form is added later

## Integration Tests
- Verify page renders correctly with proper layout structure
- Test social link functionality and external URL navigation
- Validate responsive design breakpoints match existing patterns

## End-to-End Tests
- Navigate to /contact route and verify page loads
- Test social link clicks open correct external sites
- Verify profile image loads correctly
- Test responsive behavior across viewport sizes

## Tools and Libraries
- Existing Vitest setup for any future component testing
- Astro's built-in dev server for manual testing
- Browser dev tools for responsive design verification
- Existing ESLint/TypeScript setup for code quality

## Mocking Strategy
- Mock external social media URLs in tests to avoid external dependencies
- Use test image paths for profile image loading tests
- Mock navigation components if testing in isolation

## Manual Testing Checklist
- [ ] Page accessible at /contact route
- [ ] Layout matches reference design aesthetic
- [ ] Profile image displays correctly
- [ ] All social links function properly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Navigation integration works (header/footer)
- [ ] Accessibility compliance (alt text, aria labels)