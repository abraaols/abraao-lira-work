// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://abraaolira.work',
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: false },
    maxDuration: 8,
  }),
  integrations: [react()],
  server: {
    port: 4321,
  },
  vite: {
    ssr: {
      noExternal: ['motion'],
    },
  },
});
