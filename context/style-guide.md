# Full Product Dev Style Guide

> A comprehensive design system inspired by Linear's minimalist efficiency and Stripe's sophisticated polish.

## Design Philosophy

### Core Principles
- **Clarity First**: Every element should have a clear purpose and be immediately understandable
- **Speed & Performance**: Optimize for fast load times and instant interactions
- **Minimalist Aesthetic**: Remove unnecessary elements, focus on content
- **Sophisticated Simplicity**: Simple doesn't mean boring - use subtle details to create polish
- **Consistency**: Maintain uniform patterns across all interfaces
- **Accessibility**: WCAG AA compliance minimum, AAA where possible

### Design Values
1. **Functional Beauty**: Form follows function, but beauty enhances usability
2. **Intentional Constraints**: Limit choices to guide users toward success
3. **Progressive Disclosure**: Show only what's needed, when it's needed
4. **Micro-interactions**: Small details that create delightful experiences
5. **Data-Driven Design**: Let content and user needs drive design decisions

## Typography System

### Font Stack
```css
--font-sans: 'Inter var', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;
```

### Type Scale
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

### Letter Spacing
```css
--tracking-tighter: -0.05em;
--tracking-tight: -0.025em;
--tracking-normal: 0;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;
```

## Color System

### Brand Colors
```css
/* Primary */
--primary-50: #f0f9ff;
--primary-100: #e0f2fe;
--primary-200: #bae6fd;
--primary-300: #7dd3fc;
--primary-400: #38bdf8;
--primary-500: #0ea5e9;
--primary-600: #0284c7;
--primary-700: #0369a1;
--primary-800: #075985;
--primary-900: #0c4a6e;
--primary-950: #082f49;

/* Secondary */
--secondary-50: #faf5ff;
--secondary-100: #f3e8ff;
--secondary-200: #e9d5ff;
--secondary-300: #d8b4fe;
--secondary-400: #c084fc;
--secondary-500: #a855f7;
--secondary-600: #9333ea;
--secondary-700: #7e22ce;
--secondary-800: #6b21a8;
--secondary-900: #581c87;
--secondary-950: #3b0764;
```

### Neutral Colors
```css
--gray-50: #fafafa;
--gray-100: #f4f4f5;
--gray-200: #e4e4e7;
--gray-300: #d4d4d8;
--gray-400: #a1a1aa;
--gray-500: #71717a;
--gray-600: #52525b;
--gray-700: #3f3f46;
--gray-800: #27272a;
--gray-900: #18181b;
--gray-950: #09090b;
```

### Semantic Colors
```css
/* Success */
--success-light: #10b981;
--success-default: #059669;
--success-dark: #047857;

/* Error */
--error-light: #f87171;
--error-default: #ef4444;
--error-dark: #dc2626;

/* Warning */
--warning-light: #fbbf24;
--warning-default: #f59e0b;
--warning-dark: #d97706;

/* Info */
--info-light: #60a5fa;
--info-default: #3b82f6;
--info-dark: #2563eb;
```

### Gradient System
```css
/* Linear-inspired gradient */
--gradient-linear: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Stripe-inspired gradient */
--gradient-stripe: linear-gradient(135deg, #a960ee 0%, #ff333d 50%, #90e0ff 100%);

/* Subtle gradient for backgrounds */
--gradient-subtle: linear-gradient(180deg, var(--gray-50) 0%, var(--gray-100) 100%);

/* Dark mode gradient */
--gradient-dark: linear-gradient(135deg, var(--gray-900) 0%, var(--gray-950) 100%);
```

## Spacing System

### Base Unit: 8px

```css
--space-0: 0;
--space-px: 1px;
--space-0.5: 0.125rem;  /* 2px */
--space-1: 0.25rem;     /* 4px */
--space-1.5: 0.375rem;  /* 6px */
--space-2: 0.5rem;      /* 8px */
--space-2.5: 0.625rem;  /* 10px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
--space-32: 8rem;       /* 128px */
```

### Container Widths
```css
--container-xs: 20rem;   /* 320px */
--container-sm: 24rem;   /* 384px */
--container-md: 28rem;   /* 448px */
--container-lg: 32rem;   /* 512px */
--container-xl: 36rem;   /* 576px */
--container-2xl: 42rem;  /* 672px */
--container-3xl: 48rem;  /* 768px */
--container-4xl: 56rem;  /* 896px */
--container-5xl: 64rem;  /* 1024px */
--container-6xl: 72rem;  /* 1152px */
--container-7xl: 80rem;  /* 1280px */
--container-full: 100%;
```

### Breakpoints
```css
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;
```

## Component Patterns

### Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--primary-600);
  color: white;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  transition: all 150ms ease-in-out;
}

.btn-primary:hover {
  background: var(--primary-700);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: white;
  color: var(--gray-700);
  border: 1px solid var(--gray-300);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  transition: all 150ms ease-in-out;
}

.btn-secondary:hover {
  background: var(--gray-50);
  border-color: var(--gray-400);
}
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--gray-600);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  transition: all 150ms ease-in-out;
}

.btn-ghost:hover {
  background: var(--gray-100);
  color: var(--gray-900);
}
```

### Form Elements

#### Input Fields
```css
.input {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  transition: all 150ms ease-in-out;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.input-error {
  border-color: var(--error-default);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

#### Labels
```css
.label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--gray-700);
  margin-bottom: var(--space-1);
}
```

#### Helper Text
```css
.helper-text {
  font-size: var(--text-xs);
  color: var(--gray-500);
  margin-top: var(--space-1);
}

.helper-text-error {
  color: var(--error-default);
}
```

### Cards

```css
.card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: all 200ms ease-in-out;
}

.card-interactive:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-header {
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--gray-200);
  margin-bottom: var(--space-4);
}
```

### Tables

```css
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  text-align: left;
  font-weight: var(--font-semibold);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--gray-500);
  padding: var(--space-3);
  border-bottom: 1px solid var(--gray-200);
}

.table td {
  padding: var(--space-3);
  border-bottom: 1px solid var(--gray-100);
  font-size: var(--text-sm);
}

.table tr:hover {
  background: var(--gray-50);
}
```

## Visual Elements

### Border Radius
```css
--radius-none: 0;
--radius-sm: 0.125rem;   /* 2px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-3xl: 1.5rem;    /* 24px */
--radius-full: 9999px;
```

### Shadows
```css
--shadow-xs: 0 0 0 1px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
--shadow-none: none;
```

### Z-Index Scale
```css
--z-0: 0;
--z-10: 10;
--z-20: 20;
--z-30: 30;
--z-40: 40;
--z-50: 50;
--z-auto: auto;
```

## Motion & Interactions

### Animation Durations
```css
--duration-75: 75ms;
--duration-100: 100ms;
--duration-150: 150ms;
--duration-200: 200ms;
--duration-300: 300ms;
--duration-500: 500ms;
--duration-700: 700ms;
--duration-1000: 1000ms;
```

### Easing Functions
```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Standard Transitions
```css
/* Default transition for most interactions */
--transition-default: all 150ms var(--ease-in-out);

/* Slower transition for larger movements */
--transition-slow: all 300ms var(--ease-in-out);

/* Fast transition for micro-interactions */
--transition-fast: all 75ms var(--ease-in-out);

/* Specific property transitions */
--transition-colors: background-color 150ms var(--ease-in-out), 
                     border-color 150ms var(--ease-in-out), 
                     color 150ms var(--ease-in-out);
--transition-transform: transform 150ms var(--ease-in-out);
--transition-opacity: opacity 150ms var(--ease-in-out);
```

### Hover States
- Buttons: Slightly darker background, subtle lift (translateY)
- Cards: Increased shadow, slight lift
- Links: Color change, underline on hover
- Form elements: Border color change, focus ring

### Loading States
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.spinner {
  animation: spin 1s linear infinite;
}

.skeleton {
  background: linear-gradient(90deg, 
    var(--gray-200) 25%, 
    var(--gray-100) 50%, 
    var(--gray-200) 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}
```

## Icons

### Icon System Guidelines
- **Size**: Use consistent sizes (16px, 20px, 24px)
- **Stroke Width**: 1.5px or 2px for consistency
- **Style**: Outlined icons preferred, filled for emphasis
- **Color**: Inherit from parent text color by default

### Common Icon Sizes
```css
--icon-xs: 12px;
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
```

## Dark Mode

### Dark Mode Colors
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: var(--gray-950);
    --bg-secondary: var(--gray-900);
    --bg-tertiary: var(--gray-800);
    
    --text-primary: var(--gray-50);
    --text-secondary: var(--gray-300);
    --text-tertiary: var(--gray-400);
    
    --border-primary: var(--gray-800);
    --border-secondary: var(--gray-700);
  }
}
```

## Accessibility Guidelines

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

### Color Contrast
- Normal text: Minimum 4.5:1 contrast ratio
- Large text: Minimum 3:1 contrast ratio
- Interactive elements: Minimum 3:1 contrast ratio

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Logical tab order
- Clear focus indicators
- Skip links for main navigation

### Screen Reader Support
- Semantic HTML elements
- Proper ARIA labels where needed
- Alt text for all images
- Descriptive link text

## Implementation Examples

### Component Composition
```html
<!-- Button with icon -->
<button class="btn-primary">
  <svg class="icon-sm mr-2">...</svg>
  <span>Click me</span>
</button>

<!-- Form field group -->
<div class="form-group">
  <label for="email" class="label">Email address</label>
  <input type="email" id="email" class="input" placeholder="you@example.com">
  <p class="helper-text">We'll never share your email with anyone else.</p>
</div>

<!-- Card with header -->
<div class="card">
  <div class="card-header">
    <h3 class="text-lg font-semibold">Card Title</h3>
  </div>
  <div class="card-body">
    <p class="text-sm text-gray-600">Card content goes here...</p>
  </div>
</div>
```

### Responsive Patterns
```css
/* Mobile-first responsive design */
.container {
  padding: var(--space-4);
}

@media (min-width: 640px) {
  .container {
    padding: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--space-8);
    max-width: var(--container-6xl);
    margin: 0 auto;
  }
}
```

## Utility Classes

### Display
```css
.block { display: block; }
.inline-block { display: inline-block; }
.inline { display: inline; }
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.grid { display: grid; }
.hidden { display: none; }
```

### Flexbox
```css
.flex-row { flex-direction: row; }
.flex-col { flex-direction: column; }
.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }
.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.flex-1 { flex: 1 1 0%; }
.flex-auto { flex: 1 1 auto; }
.flex-none { flex: none; }
```

### Spacing
```css
/* Margin utilities */
.m-0 { margin: 0; }
.m-1 { margin: var(--space-1); }
.m-2 { margin: var(--space-2); }
/* ... continue pattern */

.mt-1 { margin-top: var(--space-1); }
.mr-1 { margin-right: var(--space-1); }
.mb-1 { margin-bottom: var(--space-1); }
.ml-1 { margin-left: var(--space-1); }

/* Padding utilities */
.p-0 { padding: 0; }
.p-1 { padding: var(--space-1); }
.p-2 { padding: var(--space-2); }
/* ... continue pattern */
```

### Typography
```css
.text-xs { font-size: var(--text-xs); }
.text-sm { font-size: var(--text-sm); }
.text-base { font-size: var(--text-base); }
.text-lg { font-size: var(--text-lg); }
.text-xl { font-size: var(--text-xl); }

.font-normal { font-weight: var(--font-normal); }
.font-medium { font-weight: var(--font-medium); }
.font-semibold { font-weight: var(--font-semibold); }
.font-bold { font-weight: var(--font-bold); }

.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
```

## Best Practices

### Performance
1. Use CSS custom properties for dynamic theming
2. Minimize CSS specificity
3. Leverage CSS Grid and Flexbox for layouts
4. Optimize animations with `transform` and `opacity`
5. Use `will-change` sparingly for heavy animations

### Maintainability
1. Follow consistent naming conventions
2. Document design decisions
3. Create reusable components
4. Use design tokens for all values
5. Keep specificity low and flat

### Scalability
1. Design mobile-first
2. Use relative units (rem, em) for typography
3. Create flexible grid systems
4. Build modular components
5. Plan for internationalization

## Version History

- **v1.0.0** - Initial style guide inspired by Linear and Stripe
- Last updated: 2025-08-18

---

*This style guide is a living document and should be updated as the design system evolves.*