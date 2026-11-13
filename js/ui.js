/* ==========================================================================
   IP TEAM — ui.js
   Generic UI helpers: icons, escaping, dates, toasts, modal, scroll reveal,
   image fallbacks, animated counters. No content knowledge lives here.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  var SVG_NS = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';
  var SVG_FILLED = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"';

  /* ------------------------------------------------------------------ icon */
  function icon(name, className) {
    var paths = window.IP_ICON_PATHS || {};
    var d = paths[name];
    if (!d) d = paths.info;
    var filled = (window.IP_ICON_FILLED || []).indexOf(name) !== -1;
    var attrs = filled ? SVG_FILLED : SVG_NS;
    var cls = className ? ' class="' + className + '"' : "";
    return "<svg " + attrs + cls + "><path d=\"" + d + "\"/></svg>";
  }

  /* ----------------------------------------------------------------- escape */
  function esc(value) {
    if (value === null || value === undefined) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ----------------------------------------------------------------- dates */
  function locale() {
    return window.I18N && window.I18N.get() === "ar" ? "ar" : "en-GB";
  }

  function toDate(iso) {
    if (!iso) return null;
    var parts = String(iso).split("-");
    if (parts.length !== 3) return null;
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return isNaN(d.getTime()) ? null : d;
  }

  function format(iso, options) {
    var d = toDate(iso);
    if (!d) return "—";
    try {
      return new Intl.DateTimeFormat(locale(), options || { day: "numeric", month: "long", year: "numeric" }).format(d);
    } catch (e) {
      return iso;
    }
  }

  function formatDate(iso) {
    return format(iso, { day: "numeric", month: "long", year: "numeric" });
  }

  function formatShort(iso) {
    return format(iso, { day: "2-digit", month: "short" });
  }

  function dateParts(iso) {
    var d = toDate(iso);
    if (!d) return { day: "—", month: "", year: "" };
    var short = formatShort(iso).split(" ");
    return {
      day: short[0] || String(d.getDate()),
      month: short[1] || "",
      year: String(d.getFullYear()),
    };
  }

  /* ----------------------------------------------------------------- toast */
  var toastStack = null;

  function ensureToastStack() {
    if (toastStack && document.body.contains(toastStack)) return toastStack;
    toastStack = document.createElement("div");
    toastStack.className = "toast-stack";
    toastStack.setAttribute("role", "status");
    toastStack.setAttribute("aria-live", "polite");
    document.body.appendChild(toastStack);
    return toastStack;
  }

  function toast(message, type) {
    var stack = ensureToastStack();
    var el = document.createElement("div");
    el.className = "toast toast--" + (type || "info");
    var glyph = type === "success" ? "checkCircle" : type === "warn" ? "alert" : "info";
    el.innerHTML = icon(glyph) + "<span></span>";
    el.querySelector("span").textContent = message;
    stack.appendChild(el);
    requestAnimationFrame(function () {
      el.classList.add("is-in");
    });
    window.setTimeout(function () {
      el.classList.remove("is-in");
      window.setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 400);
    }, 5200);
  }

  /* ----------------------------------------------------------------- modal */
  var modal = null;
  var lastFocused = null;
  var modalConfig = null;
  var modalOpen = false;

  function ensureModal() {
    if (modal && document.body.contains(modal)) return modal;
    modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "ip-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "ip-modal-title");
    modal.setAttribute("hidden", "");
    modal.innerHTML =
      '<div class="modal__backdrop" data-modal-close></div>' +
      '<div class="modal__dialog">' +
      '<button type="button" class="modal__close" data-modal-close aria-label="Close">' +
      icon("close") +
      "</button>" +
      '<div class="modal__body">' +
      '<h2 class="modal__title" id="ip-modal-title"></h2>' +
      '<div class="modal__content"></div>' +
      "</div></div>";
    document.body.appendChild(modal);

    modal.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("[data-modal-close]")) closeModal();
    });
    modal.addEventListener("keydown", onModalKeydown);
    return modal;
  }

  function focusables() {
    return Array.prototype.slice.call(
      modal.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(function (el) {
      return el.offsetParent !== null || el === document.activeElement;
    });
  }

  function onModalKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key !== "Tab") return;
    var list = focusables();
    if (!list.length) return;
    var first = list[0];
    var last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function openModal(config) {
    var el = ensureModal();
    modalOpen = true;
    modalConfig = config || {};
    el.querySelector(".modal__dialog").className =
      "modal__dialog" + (config.size === "wide" ? " modal__dialog--wide" : config.size === "media" ? " modal__dialog--media" : "");
    el.querySelector("#ip-modal-title").textContent = config.title || "";
    el.querySelector(".modal__content").innerHTML = config.html || "";
    el.querySelector(".modal__close").setAttribute(
      "aria-label",
      window.I18N ? window.I18N.t("a11y.closeModal") : "Close"
    );
    el.removeAttribute("hidden");
    lastFocused = document.activeElement;
    document.body.classList.add("modal-open");
    requestAnimationFrame(function () {
      if (!modalOpen) return;
      el.classList.add("is-open");
      var list = focusables();
      var preferred = el.querySelector("[data-autofocus]") || list[0];
      if (preferred) preferred.focus();
    });
    if (typeof config.onOpen === "function") config.onOpen(el.querySelector(".modal__content"));
  }

  function closeModal() {
    if (!modal || !modalOpen) return;
    modalOpen = false;
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    window.setTimeout(function () {
      if (!modal.classList.contains("is-open")) {
        modal.setAttribute("hidden", "");
        modal.querySelector(".modal__content").innerHTML = "";
      }
    }, 340);
    if (modalConfig && typeof modalConfig.onClose === "function") modalConfig.onClose();
    modalConfig = null;
    if (lastFocused && typeof lastFocused.focus === "function") {
      try {
        lastFocused.focus();
      } catch (e) { /* element no longer in the document */ }
    }
  }

  /* --------------------------------------------------------- scroll reveal */
  var revealObserver = null;

  function revealNow(el) {
    el.classList.add("is-visible");
    var counter = el.querySelector("[data-count]");
    if (!counter) counter = el.hasAttribute("data-count") ? el : null;
    if (counter) runCounter(counter);
  }

  function runCounter(el) {
    if (el.dataset.counted === "1") return;
    el.dataset.counted = "1";
    var target = Number(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion.matches) {
      el.textContent = target + suffix;
      return;
    }
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function scanReveals(root) {
    root = root || document;
    var els = root.querySelectorAll(".reveal:not(.is-visible)");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(els, revealNow);
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              revealNow(entry.target);
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
    }
    Array.prototype.forEach.call(els, function (el) {
      revealObserver.observe(el);
    });
  }

  /* ------------------------------------------------------- image fallbacks */
  function fallbackDataURI(alt) {
    var label = String(alt || "IP TEAM").slice(0, 46);
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#347DBB"/><stop offset="1" stop-color="#101827"/>' +
      "</linearGradient></defs>" +
      '<rect width="800" height="600" fill="url(#g)"/>' +
      '<circle cx="640" cy="120" r="170" fill="#F5B544" fill-opacity="0.18"/>' +
      '<g fill="none" stroke="#ffffff" stroke-opacity="0.28" stroke-width="2">' +
      '<rect x="40" y="40" width="720" height="520" rx="26"/></g>' +
      '<text x="60" y="540" fill="#ffffff" fill-opacity="0.85" font-family="Segoe UI,Arial" font-size="30" font-weight="700">IP TEAM</text>' +
      '<text x="60" y="300" fill="#F5B544" font-family="Segoe UI,Arial" font-size="26">Image unavailable</text>' +
      '<text x="60" y="345" fill="#ffffff" fill-opacity="0.8" font-family="Segoe UI,Arial" font-size="22">' +
      label.replace(/[<>&]/g, "") +
      "</text></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  function bindImages(root) {
    root = root || document;
    var imgs = root.querySelectorAll("img[data-fallback]");
    Array.prototype.forEach.call(imgs, function (img) {
      if (img.dataset.bound === "1") return;
      img.dataset.bound = "1";
      img.addEventListener(
        "error",
        function () {
          if (img.dataset.failed === "1") return;
          img.dataset.failed = "1";
          img.src = fallbackDataURI(img.getAttribute("alt"));
        },
        true
      );
      if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) {
        img.dispatchEvent(new Event("error"));
      }
    });
  }

  /* ------------------------------------------------------------- misc bits */
  function prefersReducedMotion() {
    return reduceMotion.matches;
  }

  window.IPUI = {
    icon: icon,
    esc: esc,
    toast: toast,
    openModal: openModal,
    closeModal: closeModal,
    isModalOpen: function () {
      return modalOpen;
    },
    formatDate: formatDate,
    formatShort: formatShort,
    dateParts: dateParts,
    toDate: toDate,
    scanReveals: scanReveals,
    bindImages: bindImages,
    fallbackDataURI: fallbackDataURI,
    prefersReducedMotion: prefersReducedMotion,
  };
})();
