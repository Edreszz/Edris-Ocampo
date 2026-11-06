document.addEventListener("DOMContentLoaded", function () {
  const filters = document.querySelectorAll("[data-technology-filter]");
  const cards = document.querySelectorAll("[data-technology-card]");
  const result = document.querySelector("[data-technology-result]");

  if (!filters.length || !cards.length || !result) return;

  filters.forEach(function (filter) {
    filter.addEventListener("click", function () {
      const selectedCategory = filter.dataset.technologyFilter;
      let visibleCount = 0;

      filters.forEach(function (button) {
        const isSelected = button === filter;
        button.classList.toggle("is-active", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
      });

      cards.forEach(function (card) {
        const isVisible = selectedCategory === "all" || card.dataset.category === selectedCategory;
        card.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      const categoryName = selectedCategory === "all"
        ? "tools"
        : selectedCategory === "web"
          ? "web tools"
          : selectedCategory === "design"
            ? "design tools"
            : selectedCategory === "platforms"
              ? "platforms"
              : "workflow tools";

      result.textContent = `Showing ${visibleCount} ${categoryName}`;
    });
  });
});
