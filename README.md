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

## Automatic publication (song data only)

The `Auto-publish approved song changes` workflow can merge a song-only PR after the existing PR validation workflow succeeds. It does **not** auto-merge code or site-design changes.

To opt in for a song publication, ChatGPT must create a branch named `publish/song-...` and a PR with the exact standalone line:

```
YAMINABE-PUBLISH-APPROVED: yes
```

Include that marker **only after the site owner explicitly asks to publish the final song**. Drafts, tentative changes, and normal PRs must never use it.

The privileged workflow checks: successful PR validation; run initiated by the repository owner; PR opened by the owner from the same repository; branch prefix; approval marker; matching validated head SHA; and changed paths limited to non-deleted `src/content/songs/*.md` files. It never checks out or runs untrusted PR code. GitHub branch rules still apply. If the merge is blocked by required checks or permissions, the PR stays open for manual review.

**Important:** Verify that `Protect main` actually requires a PR and the `Validate songs and build` check, and has no bypass users. Also ensure GitHub Actions can create/approve pull requests if your repository settings require it. The first automatic publication should be tested on a harmless song-metadata-only PR. A passing build cannot confirm SoundCloud playback or lyric correctness.

## Song descriptions and self liner notes

Keep each song's `description` to one short sentence describing both the music and the theme. Do not use generic copy such as “lyrics and SoundCloud audio.”

To publish optional artist-written liner notes, add a **single-line, quoted** `linerNotes` field to the song's YAML frontmatter, for example:

```yaml
linerNotes: "制作当時のことや、歌詞に込めた思いを自由に書く。"
```

Only songs with a nonempty `linerNotes` value display the LINER NOTES link and the dedicated section on the song page. Notes are not prefilled with AI-generated text. The field is optional; do not invent personal reflections. Keep YAML strings on one line and quote them. For multiline notes, ask to extend the content format first.
