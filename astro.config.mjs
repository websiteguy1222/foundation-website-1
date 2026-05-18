import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://websiteguy1222.github.io',
  base: 'foundation-website-1',
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
  },
  redirects: {
    '/register': 'https://www.elmbrookspeedskating.org/register',
    '/signup': 'https://www.elmbrookspeedskating.org/register',
    '/join': 'https://www.elmbrookspeedskating.org/register',
  },
});
