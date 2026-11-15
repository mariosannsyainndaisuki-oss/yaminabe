import { defineConfig } from 'astro/config';

// Canonical GitHub Pages URL for YAMINABE.
// Override only when intentionally building for another deployment target.
const site = process.env.PUBLIC_SITE_URL || 'https://mariosannsyainndaisuki-oss.github.io';
const base = process.env.PUBLIC_BASE_PATH || '/yaminabe';
export default defineConfig({ site, base, trailingSlash: 'always', output: 'static' });
