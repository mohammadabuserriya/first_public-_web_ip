/* ==========================================================================
   IP TEAM — i18n.js
   Language state, translation lookup, DOM application and persistence.
   Default language: English (LTR). Arabic uses RTL.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "ip_lang";
  var SUPPORTED = ["en", "ar"];
  var DEFAULT = "en";
  var dict = window.IP_TRANSLATIONS || { en: {}, ar: {} };
  var current = DEFAULT;

  /* ---------------------------------------------------------------- utils */
  function normalise(value) {
    if (!value) return DEFAULT;
    value = String(value).toLowerCase();
    if (value.indexOf("ar") === 0) return "ar";
    return DEFAULT;
  }

  function readStored() {
    try {
      return normalise(window.localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return DEFAULT;
    }
  }

  function store(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* private mode / storage blocked — language still works for this session */
    }
  }

  function fill(template, vars) {
    if (!vars) return template;
    return template.replace(/\{(\w+)\}/g, function (match, name) {
      return Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match;
    });
  }

  /* ------------------------------------------------------------- translate */
  function t(key, vars) {
    if (!key) return "";
    var table = dict[current] || {};
    var value = table[key];
    if (typeof value !== "string") value = (dict[DEFAULT] || {})[key];
    if (typeof value !== "string") return key;
    return fill(value, vars);
  }

  /* ------------------------------------------------------------- language */
  function get() {
    return current;
  }

  function set(next, silent) {
    next = normalise(next);
    if (next === current && !silent) return;
    current = next;
    store(next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    if (!silent) {
      apply(document);
      document.dispatchEvent(new CustomEvent("ip:langchange", { detail: { lang: next } }));
    }
  }

  /* ------------------------------------------------------------ DOM apply */
  function apply(root) {
    root = root || document;

    var i, els;

    els = root.querySelectorAll("[data-i18n]");
    for (i = 0; i < els.length; i++) els[i].textContent = t(els[i].getAttribute("data-i18n"));

    els = root.querySelectorAll("[data-i18n-html]");
    for (i = 0; i < els.length; i++) els[i].innerHTML = t(els[i].getAttribute("data-i18n-html"));

    els = root.querySelectorAll("[data-i18n-ph]");
    for (i = 0; i < els.length; i++) els[i].setAttribute("placeholder", t(els[i].getAttribute("data-i18n-ph")));

    els = root.querySelectorAll("[data-i18n-aria]");
    for (i = 0; i < els.length; i++) els[i].setAttribute("aria-label", t(els[i].getAttribute("data-i18n-aria")));

    els = root.querySelectorAll("[data-i18n-title]");
    for (i = 0; i < els.length; i++) els[i].setAttribute("title", t(els[i].getAttribute("data-i18n-title")));

    els = root.querySelectorAll("[data-lang]");
    for (i = 0; i < els.length; i++) {
      var active = els[i].getAttribute("data-lang") === current;
      els[i].classList.toggle("is-active", active);
      els[i].setAttribute("aria-pressed", active ? "true" : "false");
    }

    applyDocumentMeta(root);
  }

  function applyDocumentMeta(root) {
    var scope = root === document ? document.body : root;
    var metaKey = scope && scope.getAttribute ? scope.getAttribute("data-meta") : null;
    if (!metaKey) return;
    document.title = t("meta." + metaKey + ".title");
    var tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", t("meta." + metaKey + ".desc"));
  }

  /* --------------------------------------------------------------- public */
  window.I18N = {
    init: function () {
      current = readStored();
      set(current, true);
      apply(document);
    },
    get: get,
    set: set,
    t: t,
    apply: apply,
    isRTL: function () {
      return current === "ar";
    },
    supported: SUPPORTED,
  };
})();
