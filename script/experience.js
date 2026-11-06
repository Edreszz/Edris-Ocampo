document.addEventListener("DOMContentLoaded", function () {
  const experience = document.getElementById("experience");
  if (!experience) return;

  function showExperience() {
    if (window.location.hash !== "#experience") return;

    experience.classList.remove("is-arriving");
    void experience.offsetWidth;
    experience.classList.add("is-arriving");

    window.requestAnimationFrame(function () {
      const scrollMargin = Number.parseFloat(
        window.getComputedStyle(experience).scrollMarginTop
      ) || 0;
      const targetTop =
        window.scrollY + experience.getBoundingClientRect().top - scrollMargin;

      window.scrollTo({
        top: targetTop,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  }

  if (window.location.hash === "#experience") {
    window.setTimeout(showExperience, 80);
  }

  window.addEventListener("hashchange", showExperience);
});
