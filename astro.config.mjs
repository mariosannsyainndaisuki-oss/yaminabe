import { defineConfig } from 'astro/config';

// GitHub Pages project repository: https://USERNAME.github.io/yaminabe/
// Set PUBLIC_SITE_URL and PUBLIC_BASE_PATH in GitHub Actions or your local shell.
const site = process.env.PUBLIC_SITE_URL || 'https://example.github.io';
const base = process.env.PUBLIC_BASE_PATH || '/yaminabe';
export default defineConfig({ site, base, trailingSlash: 'always', output: 'static' });
