// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Cambia esto por tu dominio final (CloudFront o tu dominio propio)
  site: 'https://example.cloudfront.net',
  // Cada página se genera como carpeta/index.html -> encaja con S3 + CloudFront
  build: { format: 'directory' },
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
});
