import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

/** /shotlist exists only in `npm run dev`. It never ships. */
const devOnlyPages = {
  name: 'dev-only-pages',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command === 'dev') injectRoute({ pattern: '/shotlist', entrypoint: './src/dev/shotlist.astro' });
    },
  },
};

export default defineConfig({
  site: 'https://ejacodel.github.io',
  integrations: [mdx(), devOnlyPages],
  devToolbar: { enabled: false },
});
