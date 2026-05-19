import { defineConfig } from 'astro/config';

const isCI = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: isCI ? 'https://websiteguy1222.github.io' : 'http://localhost:4321',
  base: isCI ? '/foundation-website-1' : '/',
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
