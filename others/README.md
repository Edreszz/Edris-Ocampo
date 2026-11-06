# Personal portfolio foundation

This project is a static, framework-free portfolio foundation. Open `index.html`
directly in a browser or serve the project directory with a local static server.

## Structure

- `index.html` and `pages/` contain the five separate page documents.
- `style/` contains the shared theme, layout, navigation, and responsive styles.
- `script/` contains the shared theme, navigation, clock, and scroll behavior.
- `assets/` is reserved for future images, icons, and fonts.

The main content container on every page is intentionally empty. Shared colors
are defined in `style/themes.css`; the selected theme is saved in browser storage.
Lucide icons and the DM Sans font are loaded from their public CDNs.
