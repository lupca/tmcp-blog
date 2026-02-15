// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.tmcp.io',
  output: 'server',
  integrations: [mdx(), sitemap()],

  adapter: node({
    mode: 'standalone',
  }),
});