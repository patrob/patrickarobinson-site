# Patrick Robinson - Personal Website

Personal website and blog built with Astro, featuring thoughts on web development, technology, and more.

🌐 **Live Site**: [patrickarobinson.com](https://patrickarobinson.com)

## Features

- ✅ Built with Astro for optimal performance
- ✅ TypeScript with strict mode
- ✅ ESLint and Prettier for code quality
- ✅ Vitest for testing
- ✅ GitHub Actions for CI/CD
- ✅ Optimized for Cloudflare Pages deployment
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap and RSS feed support
- ✅ Markdown & MDX support for blog posts

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🚀 Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/patrickarobinson/patrickarobinson-site.git
   cd patrickarobinson-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🧞 Available Scripts

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run lint`            | Run ESLint to check code quality                |
| `npm run lint:fix`        | Run ESLint with auto-fix                        |
| `npm run type-check`      | Run TypeScript type checking                    |
| `npm run format`          | Format code with Prettier                       |
| `npm run format:check`    | Check code formatting with Prettier             |
| `npm run test`            | Run tests with Vitest                           |
| `npm run test:ui`         | Run tests with Vitest UI                        |

## 🚀 Deployment

### Cloudflare Pages

This site is optimized for deployment on Cloudflare Pages:

1. **Build Command**: `npm run build`
2. **Build Output Directory**: `dist`
3. **Node.js Version**: 18+ (recommended: 20)

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## 🔧 Code Quality

The project includes comprehensive tooling for code quality:

- **Linting**: ESLint with TypeScript and Astro support
- **Formatting**: Prettier with Astro plugin
- **Type Checking**: TypeScript in strict mode
- **Testing**: Vitest with happy-dom
- **CI/CD**: GitHub Actions for automated testing

Run all quality checks:
```bash
npm run lint && npm run type-check && npm run build && npm run test
```

## 📝 Content Management

Blog posts are written in Markdown/MDX and stored in `src/content/blog/`. Each post includes:

- **Frontmatter**: Title, description, publication date, tags, etc.
- **Content**: Markdown with full MDX component support
- **Type Safety**: Zod schema validation for frontmatter

## 🌐 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
