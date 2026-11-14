import { readFileSync } from 'node:fs';

const yaml = readFileSync('.github/workflows/auto-publish-songs.yml', 'utf8');
const lines = yaml.split('\n');
const marker = lines.findIndex((line) => line === '          script: |');
if (marker === -1) throw new Error('Missing github-script block');
const scriptLines = [];
for (const line of lines.slice(marker + 1)) {
  if (line.startsWith('            ')) scriptLines.push(line.slice(12));
  else if (line.trim() === '') scriptLines.push('');
  else break;
}
if (!scriptLines.some((line) => line.trim())) throw new Error('Empty github-script block');
new Function('github', 'context', 'core', `return (async () => {\n${scriptLines.join('\n')}\n})()`);
console.log('Auto-publish JavaScript syntax OK');
