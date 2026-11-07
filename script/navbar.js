document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBreakpoint = 1200;
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".navbar__menu-toggle");
  const dropdowns = document.querySelectorAll(".navbar__dropdown");
  const links = document.querySelectorAll(
    ".navbar__link[data-page], .navbar__dropdown-item[data-page]"
  );

  const currentPath = window.location.pathname.replace(/\/+$/, "");
  const currentPage = currentPath.endsWith("/services.html")
    ? "services"
    : currentPath.endsWith("/technologies.html")
      ? "technologies"
      : currentPath.endsWith("/about.html")
        ? "about"
        : currentPath.endsWith("/certifications.html")
          ? "certifications"
        : currentPath.endsWith("/contact.html")
          ? "contact"
        : currentPath.endsWith("/blogs.html")
          ? "blogs"
          : currentPath.endsWith("/ecommerce.html")
            ? "ecommerce"
            : currentPath.endsWith("/websites.html")
              ? "websites"
              : currentPath.endsWith("/other-projects.html")
                ? "other-projects"
        : currentPath.endsWith("/404.html")
          ? "404"
        : "home";

  links.forEach(function (link) {
    if (link.dataset.page === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });

  if (!navbar || !menuToggle) return;

  function setDropdownOpen(targetDropdown, isOpen) {
    dropdowns.forEach(function (dropdown) {
      const shouldOpen = dropdown === targetDropdown && isOpen;
      const dropdownToggle = dropdown.querySelector(".navbar__dropdown-toggle");
      dropdown.classList.toggle("is-open", shouldOpen);
      if (dropdownToggle) {
        dropdownToggle.setAttribute("aria-expanded", String(shouldOpen));
      }
    });
  }

  function setMenuOpen(isOpen) {
    navbar.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    if (!isOpen) setDropdownOpen(null, false);
  }

  menuToggle.addEventListener("click", function () {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  dropdowns.forEach(function (dropdown) {
    const dropdownToggle = dropdown.querySelector(".navbar__dropdown-toggle");

    if (dropdownToggle) {
      dropdownToggle.addEventListener("click", function () {
        if (window.innerWidth <= mobileMenuBreakpoint) {
          const isOpen = dropdown.classList.contains("is-open");
          setDropdownOpen(dropdown, !isOpen);
        } else {
          setDropdownOpen(dropdown, true);
        }
      });
    }

    dropdown.addEventListener("mouseenter", function () {
      if (window.innerWidth > mobileMenuBreakpoint) setDropdownOpen(dropdown, true);
    });

    dropdown.addEventListener("mouseleave", function () {
      if (
        window.innerWidth > mobileMenuBreakpoint &&
        !dropdown.contains(document.activeElement)
      ) {
        setDropdownOpen(null, false);
      }
    });

    dropdown.addEventListener("focusin", function () {
      if (window.innerWidth > mobileMenuBreakpoint) setDropdownOpen(dropdown, true);
    });

    dropdown.addEventListener("focusout", function (event) {
      if (!dropdown.contains(event.relatedTarget)) setDropdownOpen(null, false);
    });
  });

  navbar.addEventListener("click", function (event) {
    const link = event.target instanceof Element
      ? event.target.closest("a")
      : null;
    if (link && navbar.contains(link)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;

    const hasOpenDropdown = Array.from(dropdowns).some(function (dropdown) {
      return dropdown.classList.contains("is-open");
    });

    if (hasOpenDropdown) {
      setDropdownOpen(null, false);
      return;
    }

    setMenuOpen(false);
  });

  document.addEventListener("click", function (event) {
    if (!navbar.contains(event.target)) {
      setMenuOpen(false);
    } else if (
      !Array.from(dropdowns).some(function (dropdown) {
        return dropdown.contains(event.target);
      })
    ) {
      setDropdownOpen(null, false);
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > mobileMenuBreakpoint) setMenuOpen(false);
  });
});
