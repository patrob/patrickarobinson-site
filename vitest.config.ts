import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: [],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/*.astro'
    ]
  },
})