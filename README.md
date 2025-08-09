# Imeth — Personal Website (React + Vite + Tailwind) — GitHub Pages Ready

## Upload steps (same as your successful test)
1. Create a repo named **imeth-site-pages** (or any name you like).
2. Upload everything from this folder to the repo root (no nesting).
3. Go to **Settings → Pages** → **Source: GitHub Actions**.
4. The included workflow builds & deploys automatically.
5. Your site will be at `https://YOUR-USERNAME.github.io/imeth-site-pages/`.

### If you choose a different repo name
Open `vite.config.js` and change:
```js
base: '/<your-repo-name>/'
```
Commit the change and Pages will redeploy.

### Add your assets
- Headshot: `public/images/imeth-profile.png`
- Optional logos: put PNG/SVG files in `public/logos/` (placeholders render if missing)
- Optional CV: place at repo root as `Imeth-Illamperuma-CV.pdf` (button included).

This template uses BASE-safe paths so assets work on GitHub Pages without blank screens.
 
