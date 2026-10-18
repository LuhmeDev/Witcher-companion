// Génère une démo autonome (un seul fichier HTML, CSS et JS intégrés) à partir de dist/.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const out = process.argv[2] || join(dist, 'witcher3-crafting-demo.html');
let html = readFileSync(join(dist, 'index.html'), 'utf8');

html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/(assets\/[^"]+\.css)"[^>]*>/, (_, p) =>
  `<style>${readFileSync(join(dist, p), 'utf8')}</style>`);
html = html.replace(/<script type="module"[^>]*src="\.\/(assets\/[^"]+\.js)"[^>]*><\/script>/, (_, p) =>
  `<script type="module">${readFileSync(join(dist, p), 'utf8').replace(/<\/script/gi, '<\\/script')}</script>`);

if (process.argv.includes('--fragment')) {
  // Pour l'outil Artifact : contenu sans <html>/<head>/<body> (le squelette est ajouté à la publication).
  html = html
    .replace(/<!doctype html>/i, '')
    .replace(/<\/?(html|head|body)[^>]*>/gi, '')
    .replace(/<meta charset[^>]*>|<meta name="viewport"[^>]*>/gi, '');
}
writeFileSync(out, html);
console.log('écrit', out, Math.round(html.length / 1024), 'Ko');
