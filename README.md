# YAMINABE Official Site

Astro + Markdown. The public site contains only songs approved for publication.

## Run locally

Requires Node.js 22 or later.

```bash
npm install
npm run dev
```

Open the URL printed by Astro (usually http://localhost:4321/yaminabe/).

## Add a song

Create `src/content/songs/your-song-slug.md`. Include frontmatter (`title`, optional `year`, `key`, `bpm`, `description`, `featured`, and `published: true`) and the lyric body. Markdown line breaks inside verses use two spaces at the end of each line; blank lines separate verses. Section names (Verse/Chorus) need not appear.

**Privacy:** Never commit private lyrics, drafts, or personal information to a public repository. `published: false` prevents rendering, but does NOT prevent source visibility on GitHub. Keep unpublished work outside this repository.

## Publish on GitHub Pages

1. Create a GitHub repository named `yaminabe` and upload this project's contents (including `.github/workflows/deploy.yml`).
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. Push to the `main` branch. The workflow runs `npm install`, builds Astro, and deploys to GitHub Pages.
4. Open `https://YOUR-USERNAME.github.io/yaminabe/` after the workflow succeeds.

If the repository is named something other than `yaminabe`, the workflow automatically uses the repository name as the base path. The local dev default remains `/yaminabe`; override `PUBLIC_BASE_PATH` locally if needed.

For a custom domain, update site/base configuration and DNS after deployment.

## Content status

Only **開かずの踏切** is included. Lyrics were transcribed verbatim from the user's supplied text; instrumental labels and section headings are omitted. No streaming URL is published until confirmed.
