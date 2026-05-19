import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://letsskate.org',
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
