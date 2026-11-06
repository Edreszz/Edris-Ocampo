document.addEventListener("DOMContentLoaded", function () {
  const projectSection = document.querySelector(".projects");
  const preview = document.querySelector("#project-preview");
  const miniProjects = document.querySelector(".mini-projects");
  const motionToggle = document.querySelector(".mini-projects__motion-toggle");

  if (!projectSection || !(preview instanceof HTMLDialogElement)) return;

  const previewImage = preview.querySelector(".project-preview__visual img");
  const previewTitle = preview.querySelector("#project-preview-title");
  const previewDescription = preview.querySelector(".project-preview__description");
  const previewTags = preview.querySelector(".project-preview__tags");
  const closeButton = preview.querySelector(".project-preview__close");
  const projects = {
    identity: {
      image: "assets/images/project-identity.svg",
      alt: "Visual identity concept with a monogram, lavender palette, and brand applications",
      title: "A personal identity with character.",
      description:
        "An identity concept shaped around confident typography, a memorable monogram, and a flexible visual system.",
      tags: ["Brand identity", "Art direction", "Visual system"],
    },
    portfolio: {
      image: "assets/images/project-interface.svg",
      alt: "Responsive portfolio interface concept with a project grid",
      title: "A portfolio built around the work.",
      description:
        "A responsive portfolio concept that brings clear navigation, focused project previews, and a direct contact path together.",
      tags: ["UI/UX", "Responsive design", "Web interface"],
    },
    campaign: {
      image: "assets/images/project-campaign.svg",
      alt: "Editorial campaign concept shown in poster and social formats",
      title: "One story, many formats.",
      description:
        "An editorial campaign concept that adapts one personal story across print and social layouts.",
      tags: ["Editorial", "Composition", "Art direction"],
    },
    "mini-brand": {
      image: "assets/images/project-identity.svg",
      alt: "Brand identity concept showing a monogram, palette, and applications",
      title: "Brand Identity",
      description:
        "A compact identity system exploring how a memorable mark, a clear palette, and a consistent voice can work together.",
      tags: ["Branding", "Visual identity", "Art direction"],
    },
    "mini-landing": {
      image: "assets/images/project-interface.svg",
      alt: "Landing page concept with an editorial hero and clear call to action",
      title: "Landing Page",
      description:
        "A focused landing page concept designed to make the message clear and the next step easy to find.",
      tags: ["Web design", "UI/UX", "Responsive"],
    },
    "mini-social": {
      image: "assets/images/project-campaign.svg",
      alt: "Social campaign concept adapted from an editorial visual direction",
      title: "Social Campaign",
      description:
        "A flexible social campaign direction that carries one recognizable story across a family of digital posts.",
      tags: ["Campaign", "Social design", "Art direction"],
    },
    "mini-mobile": {
      image: "assets/images/project-interface.svg",
      alt: "Mobile interface concept with a simple, readable project experience",
      title: "Mobile UI",
      description:
        "A mobile-first interface concept focused on legibility, thumb-friendly actions, and a calm visual rhythm.",
      tags: ["Mobile UI", "Interaction", "Accessibility"],
    },
    "mini-poster": {
      image: "assets/images/project-campaign.svg",
      alt: "Event poster concept with bold editorial typography",
      title: "Event Poster",
      description:
        "A bold poster direction that gives an event a clear visual hook while keeping its key details easy to scan.",
      tags: ["Print", "Typography", "Composition"],
    },
    "mini-editorial": {
      image: "assets/images/project-campaign.svg",
      alt: "Editorial layout concept pairing expressive imagery and clear typography",
      title: "Editorial Layout",
      description:
        "An editorial layout study balancing expressive imagery, confident headlines, and an easy reading flow.",
      tags: ["Editorial", "Layout", "Typography"],
    },
    "mini-icons": {
      image: "assets/images/project-identity.svg",
      alt: "Visual system concept with a cohesive palette and reusable graphic elements",
      title: "Icon Collection",
      description:
        "A small visual language study built around consistent shapes, friendly details, and clear recognition.",
      tags: ["Visual design", "Iconography", "Systems"],
    },
    "mini-email": {
      image: "assets/images/project-interface.svg",
      alt: "Email design concept with a clear editorial hierarchy and action",
      title: "Email Design",
      description:
        "A responsive email direction with a strong message hierarchy and a simple, focused call to action.",
      tags: ["Email design", "Digital", "Art direction"],
    },
  };

  projectSection.addEventListener("click", function (event) {
    if (!(event.target instanceof Element)) return;

    const trigger = event.target.closest("[data-project-preview]");
    if (!trigger || !projectSection.contains(trigger)) return;

    const project = projects[trigger.dataset.projectPreview];
    if (!project) return;

    previewImage.src = project.image;
    previewImage.alt = project.alt;
    previewTitle.textContent = project.title;
    previewDescription.textContent = project.description;
    previewTags.replaceChildren(
      ...project.tags.map(function (tag) {
        const item = document.createElement("li");
        item.textContent = tag;
        return item;
      })
    );
    preview.showModal();
  });

  if (miniProjects && motionToggle) {
    motionToggle.addEventListener("click", function () {
      const isPaused = miniProjects.classList.toggle("is-paused");
      motionToggle.setAttribute("aria-pressed", String(isPaused));
      motionToggle.setAttribute(
        "aria-label",
        isPaused ? "Resume project showcase animation" : "Pause project showcase animation"
      );
      motionToggle.textContent = isPaused ? "Resume motion" : "Pause motion";
    });
  }

  closeButton.addEventListener("click", function () {
    preview.close();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && preview.open) preview.close();
  });

  preview.addEventListener("click", function (event) {
    if (event.target === preview) preview.close();
  });
});
