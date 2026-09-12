// Build for Vercel: copies site/ into dist/, then bakes one page per language (/, /kk/, /en/) with the copy,
// the meta tags and the FAQ structured data filled in, and adds a content hash to every asset URL so caches never go stale.
import { rmSync, cpSync, readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

rmSync('dist', { recursive: true, force: true });
cpSync('site', 'dist', { recursive: true });

const ORIGIN = 'https://kitchenplus.kz';
const LANGS = { ru: { path: '/', locale: 'ru_RU' }, kk: { path: '/kk/', locale: 'kk_KZ' }, en: { path: '/en/', locale: 'en_US' } };

// dictionary
const w = {}; new Function('window', readFileSync('site/assets/i18n.js', 'utf8'))(w);
const I18N = w.KP_I18N;

// asset versions
const hashes = new Map();
const walk = d => { for (const n of readdirSync(d)) { const p = join(d, n); if (statSync(p).isDirectory()) walk(p); else hashes.set(p.slice('site/assets/'.length).split('\\').join('/'), createHash('md5').update(readFileSync(p)).digest('hex').slice(0, 8)); } };
walk('site/assets');
const version = html => html.replace(/\/assets\/([\w./-]+\.(?:mp4|jpg|png|js|woff2|svg|css))(?![\w?])/g, (m, f) => hashes.has(f) ? `/assets/${f}?v=${hashes.get(f)}` : m);

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = s => esc(s).replace(/"/g, '&quot;');

const src = readFileSync('site/index.html', 'utf8');
for (const [lang, cfg] of Object.entries(LANGS)) {
  const d = I18N[lang]; const t = k => d[k] ?? I18N.ru[k] ?? '';
  let h = src;
  // text of every element that carries data-i18n and has no child tags
  h = h.replace(/(<(\w+)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>)([^<]*)(<\/\2>)/g, (m, open, tag, key, _txt, close) => t(key) ? open + esc(t(key)) + close : m);
  h = h.replace(/aria-label="[^"]*"([^>]*\sdata-i18n-aria="([^"]+)")/g, (m, rest, key) => t(key) ? `aria-label="${attr(t(key))}"${rest}` : m);
  h = h.replace(/placeholder="[^"]*"([^>]*\sdata-i18n-ph="([^"]+)")/g, (m, rest, key) => t(key) ? `placeholder="${attr(t(key))}"${rest}` : m);
  // document language and meta
  const url = ORIGIN + cfg.path;
  h = h.replace('<html lang="ru">', `<html lang="${lang}">`);
  h = h.replace(/<title>[^<]*<\/title>/, `<title>${esc(t('meta.title'))}</title>`);
  h = h.replace(/(<meta name="description" content=")[^"]*(")/, `$1${attr(t('meta.desc'))}$2`);
  h = h.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${attr(t('meta.title'))}$2`);
  h = h.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${attr(t('meta.title'))}$2`);
  h = h.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${attr(t('meta.desc'))}$2`);
  h = h.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${attr(t('meta.desc'))}$2`);
  h = h.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  h = h.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  h = h.replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1${cfg.locale}$2`);
  h = h.replace(/<meta property="og:locale:alternate" content="[^"]*">\n?/g, '');
  h = h.replace('<meta property="og:site_name" content="KitchenPlus">', '<meta property="og:site_name" content="KitchenPlus">\n' + Object.entries(LANGS).filter(([l]) => l !== lang).map(([, c]) => `<meta property="og:locale:alternate" content="${c.locale}">`).join('\n'));
  if (lang !== 'ru') h = h.replace('<meta name="viewport"', `<meta name="kp-lang" content="${lang}">\n<meta name="viewport"`);
  // app screenshots per language
  h = h.replace(/(\/assets\/screens\/(list|kitchen))-ru\.jpg/g, `$1-${lang}.jpg`);
  // language buttons pressed state
  h = h.replace(/data-lang="(\w+)" aria-pressed="(true|false)"/g, (m, l) => `data-lang="${l}" aria-pressed="${l === lang}"`);
  // structured data
  const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [1, 2, 3, 4, 5, 6].map(i => ({ '@type': 'Question', name: t(`s11.q${i}`), acceptedAnswer: { '@type': 'Answer', text: t(`s11.a${i}`) } })) };
  h = h.replace(/<script type="application\/ld\+json" id="ld-faq">\{\}<\/script>/, `<script type="application/ld+json" id="ld-faq">${JSON.stringify(faq)}</script>`);
  h = h.replace(/(<script type="application\/ld\+json">\n)(\{"@context":"https:\/\/schema.org","@type":"MobileApplication".*?)(\n<\/script>)/s, (m, a, json, b) => { const o = JSON.parse(json); o.description = t('meta.desc'); o.url = url; return a + JSON.stringify(o) + b; });
  h = version(h);
  const out = 'dist' + (cfg.path === '/' ? '' : cfg.path);
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, 'index.html'), h);
}
// sitemap
const today = new Date().toISOString().slice(0, 10);
const alts = Object.entries(LANGS).map(([l, c]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${ORIGIN}${c.path}"/>`).join('\n') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/"/>`;
const urls = Object.values(LANGS).map(c => `  <url>\n    <loc>${ORIGIN}${c.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${c.path === '/' ? '1.0' : '0.9'}</priority>\n${alts}\n  </url>`).join('\n');
const legal = ['privacy-policy-ru', 'privacy-policy', 'terms-of-service-ru', 'terms-of-service'].map(n => `  <url><loc>${ORIGIN}/legal/${n}.html</loc><lastmod>2026-05-26</lastmod><changefreq>monthly</changefreq><priority>0.3</priority></url>`).join('\n');
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n${legal}\n</urlset>\n`);
console.log('dist ready:', Object.keys(LANGS).join(', '), '|', hashes.size, 'assets versioned');
