# Hero Video Block

Full-bleed autoplaying video background with a bottom-anchored text overlay.
Visually identical to the `hero` block — the background image is replaced by a
looping, muted MP4 (or WebM) video sourced from any direct video URL (e.g. Replicate).

---

## How EDS document authoring tables work

In Google Docs or Microsoft Word, authors create blocks by drawing a table.
The rules are:

1. **First row, first cell** = block name (must match the folder name exactly, case-insensitive).
   Variants are added with a space: `Hero Video (dark)`.
2. **Remaining rows** = content fields, read top-to-bottom, left-to-right.
3. **Multiple columns** in one row = sibling content in that field (e.g. two images side by side).
4. Authors can paste links, images, headings, bullet lists, etc. directly into cells — the
   backend converts everything to clean semantic HTML before your JS decorates it.

The table is converted to this HTML structure at request time:

```
<div class="hero-video">          ← block root  (class = block name, kebab-cased)
  <div>                           ← row
    <div>…cell content…</div>     ← column
    <div>…cell content…</div>     ← column (if multi-column row)
  </div>
  <div>                           ← next row
    <div>…cell content…</div>
  </div>
</div>
```

---

## Content model

### Minimal (video + heading only)

`+-------------------+`
`| Hero Video        |`  ← block name row (one cell spanning full width)
`+-------------------+`
`| https://…/vid.mp4 |`  ← Row 1: direct MP4/WebM URL (plain link)
`+-------------------+`
`| # Page Title      |`  ← Row 2: h1 heading (gets rainbow wave animation)
`+-------------------+`

### Full (all fields)

`+----------------------------------------------+`
`| Hero Video                                   |`
`+----------------------------------------------+`
`| https://replicate.delivery/…/video.mp4       |`
`+----------------------------------------------+`
`| Adobe Summit 2025                            |`
`+----------------------------------------------+`
`| # The Future of Experience                   |`
`+----------------------------------------------+`
`| Join thousands of digital experience         |`
`| professionals at the world's largest         |`
`| digital experience conference.               |`
`+----------------------------------------------+`
`| [Register Now](https://…)                    |`
`+----------------------------------------------+`
`| [Learn More](https://…)                      |`
`+----------------------------------------------+`

### Field reference

| Row | Content | Notes |
|-----|---------|-------|
| 1 | Direct video URL (MP4, WebM, OGG, MOV) | Required. Pasted as a plain hyperlink. The block detects the file extension automatically. |
| 2 | Short text (< 50 chars, no link) | Optional. Rendered as a pill-shaped badge / eyebrow label above the heading. |
| 3 | Heading (H1 or H2) | Recommended. H1 gets the per-character rainbow wave animation. |
| 4 | Body paragraph | Optional. Rendered with a left cyan border as a description. Multiple paragraphs allowed. |
| 5+ | Single hyperlink per row | Optional. First link → primary CTA button, second → secondary. |

---

## Authoring tips

- Paste the raw video URL as a hyperlink in its own table row.
  The block matches `.mp4 / .webm / .ogg / .mov` at the end of the URL
  (query strings are fine: `video.mp4?v=2` still matches).
- The video row can appear anywhere in the table — the JS pulls it out before
  building the text overlay, so order does not matter for the video field.
- Autoplay is always **muted** (required by browsers). If the viewer's browser
  or data-saver setting blocks autoplay, video controls appear automatically.
- To add a block variant (e.g. a version without the wave animation) name the
  block `Hero Video (no-wave)` in the table. The extra class `no-wave` is added
  to the block element and can be targeted in CSS.

---

## DOM output (for developers)

```
.hero-video
  .hero-video-image
    video.hero-video-media   ← autoplay muted loop playsinline
  .hero-content
    .hero-text
      p.hero-badge?          ← eyebrow / badge (optional)
      h1                     ← heading
        span.hero-char       ← one per character (wave animation)
      p                      ← description (optional)
      .hero-buttons?         ← wraps CTA anchor tags
        p > a.button.primary
        p > a.button.secondary?
```

---

## Supported video sources

Any publicly accessible direct video file URL works:

- Replicate delivery CDN — `https://replicate.delivery/…/video.mp4`
- Any CDN-hosted `.mp4` or `.webm`
- Self-hosted video files served over HTTPS

YouTube and Vimeo embed URLs are **not** supported here — use the `embed` block for those.
