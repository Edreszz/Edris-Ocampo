# Personal portfolio foundation

This project is a static, framework-free portfolio website. Open `index.html`
directly in a browser or serve the project directory with a local static server.

## Structure

- `index.html` and `pages/` contain the portfolio, category, and collection pages.
- `style/` contains the shared theme, layout, navigation, and responsive styles.
- `script/` contains the shared theme, navigation, clock, scroll, and form behavior.
- `assets/` is reserved for future images, icons, and fonts.

Shared colors are defined in `style/themes.css`; the selected theme is saved in
browser storage. Lucide icons and the DM Sans font are loaded from their public
CDNs.

## Contact form

The form on `pages/contact.html` submits to Web3Forms using the public access key
in the page. Web3Forms processes form details to deliver inquiries. To send an
automatic thank-you email to each sender, enable **Autoresponder** in the
Web3Forms form settings; Web3Forms documents this as a Pro/Agency feature.
