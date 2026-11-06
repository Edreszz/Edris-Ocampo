document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-form-status");
  const submitButton = form?.querySelector('button[type="submit"]');
  const submitLabel = form?.querySelector(".contact-form__submit-label");

  if (!form || !status || !submitButton || !submitLabel) return;

  function showStatus(message, type) {
    status.textContent = message;
    status.className = `contact-form__status is-visible is-${type}`;
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const originalLabel = submitLabel.textContent;
    submitButton.disabled = true;
    submitLabel.textContent = "Sending...";
    form.classList.add("is-submitting");
    status.className = "contact-form__status";
    status.textContent = "";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "The message could not be sent.");
      }

      const senderName = form.elements.namedItem("name").value.trim();
      form.reset();
      showStatus(
        `Thank you${senderName ? `, ${senderName}` : ""}, for contacting me. I really appreciate it. Your message has been sent; please allow me some time to review it, and I’ll get back to you as soon as I can.`,
        "success"
      );
    } catch (error) {
      console.error("Contact form submission failed.", error);
      showStatus(
        "I couldn’t send your message just now. Please try again or email me directly at edrisocampo64@gmail.com.",
        "error"
      );
    } finally {
      form.classList.remove("is-submitting");
      submitButton.disabled = false;
      submitLabel.textContent = originalLabel;
    }
  });
});
