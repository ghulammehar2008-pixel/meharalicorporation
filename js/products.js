/* =============================================================
   Mehar Ali Corporation — products.js
   Product listing filter + "request quote for this product" links.
   ============================================================= */
(function () {
  "use strict";

  /* ---------- Category filter (products.html) ---------- */
  var filters = document.querySelectorAll("[data-filter]");
  var cards = document.querySelectorAll("[data-category]");

  if (filters.length && cards.length) {
    filters.forEach(function (button) {
      button.addEventListener("click", function () {
        var value = button.getAttribute("data-filter");

        filters.forEach(function (b) {
          b.classList.toggle("btn--dark", b === button);
          b.classList.toggle("btn--outline", b !== button);
          b.setAttribute("aria-pressed", String(b === button));
        });

        cards.forEach(function (card) {
          var match = value === "all" || card.getAttribute("data-category") === value;
          card.style.display = match ? "" : "none";
        });
      });
    });
  }

  /* ---------- Prefill the inquiry form from a product page ---------- */
  // Any link with data-quote="Product name" sends the name to contact.html.
  document.querySelectorAll("[data-quote]").forEach(function (link) {
    var name = link.getAttribute("data-quote");
    if (!name) return;
    var href = link.getAttribute("href") || "contact.html";
    var joiner = href.indexOf("?") === -1 ? "?" : "&";
    link.setAttribute("href", href + joiner + "product=" + encodeURIComponent(name));
  });
})();
