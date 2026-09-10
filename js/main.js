/* =============================================================
   Mehar Ali Corporation — main.js
   Header, mobile menu, scroll reveals, gallery lightbox, year.
   Vanilla JavaScript only. No dependencies.
   ============================================================= */
(function () {
  "use strict";

  /* ---------- Sticky header state ---------- */
  var header = document.querySelector("[data-header]");
  if (header && !header.classList.contains("site-header--static")) {
    var onScroll = function () {
      header.classList.toggle("is-solid", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile navigation ---------- */
  var nav = document.querySelector("[data-nav]");
  var openBtn = document.querySelector("[data-nav-open]");
  var closeBtn = document.querySelector("[data-nav-close]");

  function setNav(open) {
    if (!nav) return;
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("no-scroll", open);
    if (openBtn) openBtn.setAttribute("aria-expanded", String(open));
    if (open) {
      var first = nav.querySelector("a, button");
      if (first) first.focus();
    } else if (openBtn) {
      openBtn.focus();
    }
  }

  if (openBtn) openBtn.addEventListener("click", function () { setNav(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setNav(false); });
  if (nav) {
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    // Keep focus inside the open menu.
    nav.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !nav.classList.contains("is-open")) return;
      var items = nav.querySelectorAll("a, button");
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealables.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealables.forEach(function (el) { observer.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Gallery lightbox ---------- */
  var triggers = Array.prototype.slice.call(
    document.querySelectorAll("[data-lightbox]")
  );
  var box = document.querySelector("[data-lightbox-root]");

  if (triggers.length && box) {
    var boxImg = box.querySelector("[data-lightbox-image]");
    var boxCap = box.querySelector("[data-lightbox-caption]");
    var current = 0;
    var lastFocused = null;

    function show(index) {
      current = (index + triggers.length) % triggers.length;
      var source = triggers[current].querySelector("img");
      boxImg.src = source.getAttribute("data-full") || source.src;
      boxImg.alt = source.alt;
      boxCap.textContent = source.getAttribute("data-caption") || source.alt;
    }

    function openBox(index) {
      lastFocused = document.activeElement;
      show(index);
      box.classList.add("is-open");
      box.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      var close = box.querySelector("[data-lightbox-close]");
      if (close) close.focus();
    }

    function closeBox() {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
      if (lastFocused) lastFocused.focus();
    }

    triggers.forEach(function (trigger, index) {
      trigger.addEventListener("click", function () { openBox(index); });
    });

    box.addEventListener("click", function (e) {
      if (e.target.closest("[data-lightbox-close]") || e.target === box) closeBox();
      if (e.target.closest("[data-lightbox-prev]")) show(current - 1);
      if (e.target.closest("[data-lightbox-next]")) show(current + 1);
    });

    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") closeBox();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
