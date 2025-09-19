# Static Site Setup Plan for patrickarobinson.com

## Project Setup Tasks

### 1. Initialize Astro Project
- [ ] Run `npm create astro@latest` with the following options:
  - Project name: `patrickarobinson-site`
  - Template: `blog` (or `minimal` if you want to build from scratch)
  - TypeScript: `Yes` (Strict)
  - Install dependencies: `Yes`

### 2. Configure Development Scripts
- [ ] Update `package.json` scripts to include:
  - `dev`: Astro dev server
  - `build`: Astro build
  - `preview`: Astro preview
  - `lint`: ESLint for code linting
  - `lint:fix`: ESLint with auto-fix
  - `type-check`: TypeScript type checking
  - `test`: Test runner (if adding tests)
  - `format`: Prettier formatting
  - `format:check`: Prettier check

### 3. Install and Configure Linting Tools
- [ ] Install ESLint: `npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-astro`
- [ ] Create `.eslintrc.cjs` configuration file
- [ ] Install Prettier: `npm install --save-dev prettier prettier-plugin-astro`
- [ ] Create `.prettierrc` configuration file
- [ ] Create `.prettierignore` file

### 4. Configure TypeScript
- [ ] Ensure `tsconfig.json` is properly configured with strict mode
- [ ] Add type checking script: `"type-check": "astro check && tsc --noEmit"`

### 5. Setup Testing Framework (Optional)
- [ ] Install Vitest: `npm install --save-dev vitest @vitest/ui happy-dom`
- [ ] Create `vitest.config.ts` configuration
- [ ] Add test script: `"test": "vitest"`
- [ ] Add test:ui script: `"test:ui": "vitest --ui"`

### 6. Create GitHub Actions Workflow
- [ ] Create `.github/workflows/pr-verify.yml` with:
  - Checkout code
  - Setup Node.js with version matrix
  - Cache npm dependencies using `actions/cache@v3`
  - Install dependencies
  - Run lint check
  - Run type check
  - Run build
  - Run tests (if configured)

### 7. Configure for Cloudflare Pages
- [ ] Add `dist` to `.gitignore` (if not already present)
- [ ] Ensure build output directory is set to `dist` in `astro.config.mjs`
- [ ] Set up environment variables file `.env.example`

### 8. Initial Content Structure
- [ ] Create `src/content/blog` directory for blog posts
- [ ] Create sample blog post in Markdown
- [ ] Configure Astro content collections in `src/content/config.ts`

### 9. Basic Site Configuration
- [ ] Update `astro.config.mjs` with:
  - Site URL: `https://patrickarobinson.com`
  - Base configuration
  - Markdown/MDX configuration
- [ ] Create basic layout component
- [ ] Create homepage with blog post listing

### 10. Documentation
- [ ] Update README.md with:
  - Project description
  - Development setup instructions
  - Available npm scripts
  - Deployment instructions for Cloudflare Pages

## CLI Commands Summary

```bash
# 1. Initialize project
npm create astro@latest

# 2. Install dev dependencies
npm install --save-dev \
  eslint \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-plugin-astro \
  prettier \
  prettier-plugin-astro \
  vitest \
  @vitest/ui \
  happy-dom

# 3. Run development server
npm run dev

# 4. Build for production
npm run build

# 5. Run all checks (for CI/CD)
npm run lint && npm run type-check && npm run build && npm run test
```

## Cloudflare Pages Deployment Settings
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variables: Configure as needed