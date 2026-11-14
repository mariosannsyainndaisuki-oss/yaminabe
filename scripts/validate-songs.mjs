import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const directory = 'src/content/songs';
const files = (await readdir(directory)).filter(name => name.endsWith('.md'));
const errors = [];
const allowed = new Set(['title','year','key','bpm','description','linerNotes','featured','published','audioUrl']);

for (const file of files) {
  const source = await readFile(join(directory, file), 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) { errors.push(`${file}: frontmatter is missing or malformed`); continue; }
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const entry = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
    if (!entry) { errors.push(`${file}: unsupported frontmatter line`); continue; }
    const [, key, raw] = entry;
    if (!allowed.has(key)) errors.push(`${file}: unexpected field ${key}`);
    if (Object.hasOwn(fields, key)) errors.push(`${file}: duplicate field ${key}`);
    fields[key] = raw.trim().replace(/^["']|["']$/g, '');
  }
  if (!fields.title?.trim()) errors.push(`${file}: title is required`);
  if (fields.published !== 'true') errors.push(`${file}: only explicitly published songs may be committed to this public repository`);
  if (!match[2].trim()) errors.push(`${file}: lyrics are required`);
  if (fields.audioUrl) {
    try {
      const url = new URL(fields.audioUrl);
      if (url.protocol !== 'https:' || url.hostname !== 'soundcloud.com' || url.pathname.split('/').filter(Boolean).length < 2) {
        errors.push(`${file}: audioUrl must be a canonical https://soundcloud.com/artist/track URL`);
      }
    } catch { errors.push(`${file}: audioUrl is not a valid URL`); }
  }
  if (fields.year && (!/^\d{4}$/.test(fields.year) || Number(fields.year) < 1900)) errors.push(`${file}: year must be a four-digit year`);
  if (fields.bpm && (!/^\d+$/.test(fields.bpm) || Number(fields.bpm) <= 0)) errors.push(`${file}: bpm must be a positive integer`);
  console.log(`Checked ${file}`);
}

if (errors.length) {
  for (const error of errors) console.error('ERROR:', error);
  process.exitCode = 1;
} else {
  console.log(`Validated ${files.length} published song(s).`);
}
