(function () {
  const storageKey = "portfolio-theme";
  const root = document.documentElement;

  function readTheme() {
    try {
      const savedTheme = window.localStorage.getItem(storageKey);
      return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
    } catch (error) {
      console.error("Unable to read the saved theme preference.", error);
      return "dark";
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.content = theme === "dark" ? "#252734" : "#ECEEF5";
    }
    const toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      const nextTheme = theme === "dark" ? "light" : "dark";
      toggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
      toggle.setAttribute("aria-pressed", String(theme === "light"));
    }
  }

  applyTheme(readTheme());

  document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;

    applyTheme(root.dataset.theme);
    toggle.addEventListener("click", function () {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      try {
        window.localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        console.error("Unable to save the theme preference.", error);
      }
    });
  });
})();
