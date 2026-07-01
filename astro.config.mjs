import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vercel from '@astrojs/vercel';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://andrewsaeed.dev',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'server',
  adapter: vercel()
});