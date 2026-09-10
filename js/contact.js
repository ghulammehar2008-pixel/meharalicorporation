/* =============================================================
   Mehar Ali Corporation — contact.js
   Client-side validation for the inquiry form.

   CONNECTING A BACKEND LATER
   --------------------------
   This form does NOT send email on its own. To make it deliver
   messages, replace the body of sendInquiry() below with a call to
   Formspree, EmailJS, or your own API endpoint. Everything else
   (validation, success message, reset) keeps working.
   ============================================================= */
(function () {
  "use strict";

  var form = document.querySelector("[data-inquiry-form]");
  if (!form) return;

  var status = form.querySelector("[data-form-status]");
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* Prefill "Product / Material Required" from ?product=... */
  var params = new URLSearchParams(window.location.search);
  var productParam = params.get("product");
  var productField = form.querySelector("#product");
  if (productParam && productField) productField.value = productParam;

  function setError(field, message) {
    var wrapper = field.closest(".field");
    if (!wrapper) return;
    var slot = wrapper.querySelector(".field__error");
    wrapper.classList.toggle("has-error", Boolean(message));
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (slot) slot.textContent = message || "";
  }

  function validateField(field) {
    var value = (field.value || "").trim();

    if (field.required && !value) {
      setError(field, "This field is required.");
      return false;
    }
    if (field.type === "email" && value && !emailPattern.test(value)) {
      setError(field, "Enter a valid email address.");
      return false;
    }
    if (field.type === "tel" && value && value.replace(/[^0-9]/g, "").length < 7) {
      setError(field, "Enter a valid phone number.");
      return false;
    }
    setError(field, "");
    return true;
  }

  var fields = Array.prototype.slice.call(
    form.querySelectorAll("input, select, textarea")
  );

  fields.forEach(function (field) {
    field.addEventListener("blur", function () { validateField(field); });
    field.addEventListener("input", function () {
      if (field.closest(".field").classList.contains("has-error")) validateField(field);
    });
  });

  /* Replace this function to connect a real delivery service. */
  function sendInquiry(data) {
    // Example (Formspree):
    // return fetch("https://formspree.io/f/XXXXXXX", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json", Accept: "application/json" },
    //   body: JSON.stringify(data)
    // });
    console.info("Inquiry captured (no backend connected yet):", data);
    return Promise.resolve();
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var valid = true;
    fields.forEach(function (field) {
      if (!validateField(field)) valid = false;
    });

    if (!valid) {
      var firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
      if (firstError) firstError.focus();
      return;
    }

    var payload = {};
    new FormData(form).forEach(function (value, key) { payload[key] = value; });

    sendInquiry(payload).then(function () {
      if (status) {
        status.textContent =
          "Thank you. Your inquiry has been recorded. Our team will get back to you shortly — for an immediate response, call or WhatsApp 0320 886 2187.";
        status.classList.add("is-visible");
        status.focus();
      }
      form.reset();
    });
  });
})();
