# Philip Warkentien II — portfolio

A static portfolio with two independent React generations. The new portfolio foundation uses **Next.js, React, and TypeScript**; the 2019 portfolio retains React 16, GSAP, and its original content. No database, login, API, or production Node.js server is required.

This is the engineering foundation, not the finished redesign. Project details, articles, imagery, and the final motion system are future work. English and Brazilian Portuguese are the initial locales. Deployment is manual so merging this foundation does not replace the live portfolio.

## Develop

Use Node.js 22.13+ (Node 22 is pinned for CI) and npm. With nvm: `nvm install && nvm use`.

```sh
npm ci
npm run dev          # new portfolio, http://localhost:3000/2026/
npm run dev:legacy   # old portfolio, http://127.0.0.1:5173/
```

The new app's archive links work in the combined production preview. During app development, use the separate legacy server to view archives.

```sh
npx playwright install chromium
npm run check        # TypeScript, both builds, artifact tests, browser + axe tests
npm run preview      # combined output, http://localhost:4173
```

Linux browser setup may require `npx playwright install --with-deps chromium` (CI does this).

## Structure and delivery boundary

| Path | Purpose | Published? |
| --- | --- | --- |
| `apps/web/src/` | New portfolio routes, components, static content | Compiled HTML/CSS/JS only |
| `apps/web/public/` | New portfolio public assets | Yes, copied verbatim |
| `apps/legacy/src/` | Archived React implementation | Compiled bundles only |
| `apps/legacy/public/` | Archived images and standalone projects | Yes, copied verbatim |
| `dist/` | Assembled hosting artifact | **The only directory to publish** |
| `docs/` | Architecture, content, deployment, original package manifest | No |
| `.agents/skills/`, `AGENTS.md` | AI contributor instructions | No |
| `scripts/`, `tests/`, `.github/` | Build, validation, automation | No |

Public assets are public even when no page links to them. Never put credentials or development documentation in either `public/` directory. Original banner HTML/JS remains intentionally public as part of the archive. Existing external font, icon, animation, and Bootstrap CDN dependencies in the archive are preserved; it is not an offline archive.

## Routes

| URL | Content |
| --- | --- |
| `/` | Original 2019 React portfolio, unchanged URL |
| `/projects/` | Original standalone projects, unchanged URL |
| `/2026/` | New portfolio language chooser |
| `/2026/en/`, `/2026/pt-BR/` | Localized landing sections |
| `/2026/{locale}/work/`, `about/`, `journal/` | New statically generated section pages |

All routes have physical HTML files for direct visits and refreshes on static hosts. Archive links use normal anchors to cross app boundaries. The original root and projects URLs keep serving their existing content even when this artifact is published. All new UI is temporarily mounted at `https://warkentien2.com/2026/`; promoting it to the domain root is a separate future decision. This path requires no subdomain or DNS changes.

## Further reading

- [Owner preferences and PR workflow](docs/preferences.md)
- [Architecture and technology decision](docs/architecture.md)
- [Publishing, GoDaddy DNS, and rollback](docs/deployment.md)
- [Content, localization, accessibility, and motion](docs/contributing.md)
- [AI contributor guidance](AGENTS.md)

GNU GPLv2; see [License.md](License.md).
