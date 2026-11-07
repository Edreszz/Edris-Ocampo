document.addEventListener("DOMContentLoaded", function () {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const revealTargets = document.querySelectorAll(
    [
      "main .content-container > header",
      "main .content-container section",
      "main .content-container article",
      "main .content-container .collection-stage"
    ].join(", ")
  );

  if (
    !reduceMotion &&
    "IntersectionObserver" in window &&
    revealTargets.length
  ) {
    document.body.classList.add("has-scroll-reveal");
    revealTargets.forEach(function (target) {
      target.classList.add("scroll-reveal");
    });

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle(
            "is-scroll-visible",
            entry.isIntersecting
          );
        });
      },
      {
        rootMargin: "-10% 0px -10% 0px",
        threshold: 0
      }
    );

    revealTargets.forEach(function (target) {
      revealObserver.observe(target);
    });
  }

  const progressBar = document.getElementById("scroll-progress");
  const backToTop = document.querySelector(".back-to-top");
  if (!progressBar || !backToTop) return;

  let scheduled = false;

  function updateScrollControls() {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const progress =
      scrollableHeight > 0
        ? Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100))
        : 0;

    progressBar.style.width = `${progress}%`;
    backToTop.classList.toggle("is-visible", scrollTop > 320);
    scheduled = false;
  }

  function requestUpdate() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateScrollControls);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth"
    });
  });

  updateScrollControls();
});
