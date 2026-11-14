# YAMINABE Official Site

Astro 5 + Markdown, published on GitHub Pages.

## Update workflow

1. Tell ChatGPT explicitly which song to **publish**, and provide the final title, lyrics and canonical SoundCloud URL.
2. ChatGPT updates only the appropriate Markdown file under `src/content/songs/` and opens a Pull Request.
3. GitHub Actions checks song metadata and runs an Astro production build. The current workflow **does not automatically merge**.
4. Review and merge the PR. The existing deploy workflow validates, builds and publishes to GitHub Pages on pushes to `main`.

**Future phase:** consider auto-merging only song-data-only PRs after configuring GitHub branch protection, required checks and narrowly scoped permissions. Never enable blanket auto-merge for site code, workflows or configuration. Explicit publication approval remains required.

## Add a song

Copy `src/content/songs/_TEMPLATE.md.example` to `src/content/songs/your-song-slug.md`. Required: `title`, `published: true`, nonempty lyrics. Optional: `year`, `key`, `bpm`, `description`, `audioUrl`. For embedded audio, use a canonical `https://soundcloud.com/artist/track` URL, **not** an `on.soundcloud.com` short link. A trailing two-space Markdown line break creates a new lyric line.

**Privacy:** This is a public repository. Never commit drafts, private lyrics or personal information here, even with `published: false`: GitHub source remains public. Keep unfinished work elsewhere.

## Local development

Node.js 22 or later:

```bash
npm install
npm run validate:songs
npm run build
npm run dev
```

## Deployment

The `validate.yml` workflow runs for pull requests into `main`. The `deploy.yml` workflow runs on pushes to `main` and deploys to GitHub Pages after validation and build. In repository Settings → Pages, use GitHub Actions as the deployment source.

To enforce a green PR check before merging, configure a branch ruleset for `main` requiring the `Validate songs and build` check. This is a **repository setting** and is not automatically enabled by adding the workflow. GitHub plan/repository restrictions may apply.

The deploy job currently has no automated post-deployment browser or SoundCloud playback test; test embedded playback manually after changes. Automatic checks catch structural and build errors, not lyrical correctness, rights or creative approval.
