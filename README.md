# Andrew Zhang Portfolio

Interactive chemistry-themed portfolio with a custom Three.js molecular visualization.

## JavaScript Features

- 3D chemistry model (doxorubicin, PubChem CID 31703) rendered from local SDF data.
- Monochrome grid layout with connector lines and floating information panels.
- Rendering controls:
  - Drag to orbit
  - Zoom
  - Raycast atom selection
  - Node cycling
- Interactive labeled nodes with preview animation and rich profile popups for academics, competitions, research, leadership, athletics, and resume links.
- Responsive design with CSS

## Run Locally

This project loads the molecule file with `fetch`. Run it through a local web server:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Deploy on GitHub Pages

1. Push local changes to GitHub
2. Open repository settings
3. Go to Pages
4. Set source to `Deploy from a branch`
5. Select branch `main` and folder `/ (root)`
6. Save
GitHub Pages loads `index.html` directly from the repository root.

## Project Structure

- `index.html`: Layout, callout nodes, and info panel shell.
- `styles.css`: Visual style, responsive rules, and animation effects.
- `app.js`: Three.js renderer, SDF parser, molecule construction, connector routing, and popup logic.
- `assets/molecules/doxorubicin.sdf`: 3D molecular data source.
