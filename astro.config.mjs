// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Cambia esto por tu dominio final de Vercel
  site: 'https://jordi-morera.vercel.app',
  vite: { plugins: [tailwindcss()] },
});
