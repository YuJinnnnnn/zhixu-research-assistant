# Zhixu

Zhixu is a bilingual research-meeting prototype that connects meeting records, contributor analysis, and report generation in one project workspace.

## Demo features

- Project overview with direct access to meetings, contributors, and reports
- Meeting summaries and timestamped transcripts
- Semantic-overlap visualization for six contributors
- Single-, multi-, and all-meeting report generation
- Downloadable Markdown reports
- Chinese and English interface
- Browser-local demo state

All people, meetings, and research data in the IBS · 2D Materials scenario are fictional.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
```

The project uses a static export. GitHub Actions publishes `dist/client` to GitHub Pages whenever `main` is updated.

## GitHub Pages

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The included workflow automatically applies the repository subpath to internal links and static assets.
