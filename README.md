# Andrew Zhang Portfolio

Interactive chemistry-themed portfolio built for GitHub Pages with a custom Three.js molecular visualization.

## Highlights

- Real 3D chemistry model (doxorubicin, PubChem CID 31703) rendered from local SDF data.
- Sutera-inspired visual language: monochrome grid atmosphere, technical callouts, connector lines, and floating information panels.
- Molecule-first controls: drag orbit, zoom, raycast atom selection, and node cycling.
- Interactive labeled nodes with preview animation and rich profile popups for academics, competitions, research, leadership, athletics, and resume links.
- Resume PDF is integrated as a direct local asset link in the experience.
- Responsive behavior for desktop and mobile screens.
- No build step required.

## Run Locally

Because this project loads the molecule file with `fetch`, serve it through a local web server:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Deploy on GitHub Pages

1. Push this repository to GitHub.
2. Open repository settings.
3. Go to Pages.
4. Set source to `Deploy from a branch`.
5. Select branch `main` and folder `/ (root)`.
6. Save.

GitHub Pages will serve `index.html` directly from the repository root.

## Project Structure

- `index.html`: Layout, callout nodes, and info panel shell.
- `styles.css`: Visual style, responsive rules, and animation effects.
- `app.js`: Three.js renderer, SDF parser, molecule construction, connector routing, and popup logic.
- `assets/molecules/doxorubicin.sdf`: Real 3D molecular data source.
