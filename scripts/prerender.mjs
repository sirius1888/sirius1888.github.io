import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../.prerender/entry-server.js';
const path = new URL('../dist/index.html', import.meta.url);
const template = await readFile(path, 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('Prerender root not found');
await writeFile(
  path,
  template.replace('<div id="root"></div>', `<div id="root">${render()}</div>`),
);
console.log('Prerendered portfolio content to dist/index.html.');
