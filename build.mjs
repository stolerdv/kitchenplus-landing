// Vercel build: the site is static, so the build only copies site/ into dist/.
import { rmSync, cpSync } from 'node:fs';
rmSync('dist', { recursive: true, force: true });
cpSync('site', 'dist', { recursive: true });
console.log('dist ready');
