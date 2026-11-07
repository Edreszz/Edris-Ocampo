document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-form-status");
  const submitButton = form?.querySelector('button[type="submit"]');
  const submitLabel = form?.querySelector(".contact-form__submit-label");

  if (!form || !status || !submitButton || !submitLabel) return;

  const captchaContainer = form.querySelector(".h-captcha");

  function showStatus(message, type) {
    status.textContent = message;
    status.className = `contact-form__status is-visible is-${type}`;
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const captchaResponse = form.querySelector(
      'textarea[name="h-captcha-response"]'
    );
    if (captchaContainer && (!captchaResponse || !captchaResponse.value.trim())) {
      showStatus(
        "Please complete the hCaptcha check before sending your inquiry.",
        "error"
      );
      return;
    }

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
        `Thank you${senderName ? `, ${senderName}` : ""}. Your message has been sent successfully. I aim to reply within 2 business days.`,
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
