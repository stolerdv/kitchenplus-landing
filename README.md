# KitchenPlus landing

Static site for kitchenplus.kz: `site/index.html` plus `site/assets/` (scroll video, stills, icons, i18n dictionary in `assets/i18n.js`).

Vercel runs `node build.mjs`, which copies `site/` into `dist/`. No dependencies, no framework.

Legal pages live in `site/legal/`; `robots.txt`, `sitemap.xml` and the Google verification file are served from the site root.
