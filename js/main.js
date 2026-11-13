/* ==========================================================================
   IP TEAM — main.js
   Bootstrap for every page: language switcher, sticky navbar, mobile menu,
   scroll reveal, footer rendering and global delegated actions.
   ========================================================================== */
(function () {
  "use strict";

  var UI = window.IPUI;
  var R = window.IPRender;
  var C = window.IP_CONFIG;
  var reduceMotion = UI.prefersReducedMotion();

  /* ------------------------------------------------------------- helpers */
  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /* ============================================================ NAVBAR */
  function initNav() {
    var nav = $("#site-nav");
    if (!nav) return;

    var toggle = $("[data-nav-toggle]", nav);
    var menu = $("#site-menu", nav);

    function setOpen(open) {
      if (!toggle || !menu) return;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", R.t(open ? "a11y.menuClose" : "a11y.menu"));
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    }

    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
      });

      menu.addEventListener("click", function (e) {
        if (e.target.closest("a")) setOpen(false);
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
          setOpen(false);
          toggle.focus();
        }
      });

      window.addEventListener("resize", function () {
        if (window.innerWidth > 980) setOpen(false);
      });
    }

    /* stuck state on scroll */
    var stuck = false;
    function onScroll() {
      var next = window.scrollY > 24;
      if (next !== stuck) {
        stuck = next;
        nav.classList.toggle("is-stuck", stuck);
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* active link from body[data-page] */
    var page = document.body.getAttribute("data-page");
    if (page) {
      $$(".nav__link[data-nav]", nav).forEach(function (link) {
        link.classList.toggle("is-active", link.getAttribute("data-nav") === page);
        if (link.getAttribute("data-nav") === page) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    }
  }

  /* ====================================================== LANGUAGE SWITCH */
  function initLanguage() {
    $$("[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.I18N.set(btn.getAttribute("data-lang"));
      });
    });

    document.addEventListener("ip:langchange", function () {
      renderFooter();
      if (typeof window.IPPageRender === "function") window.IPPageRender();
      UI.scanReveals(document);
      UI.bindImages(document);
    });
  }

  /* =============================================================== FOOTER */
  var NAV_ITEMS = [
    { key: "home", href: "index.html", icon: "bulb" },
    { key: "about", href: "about.html", icon: "info" },
    { key: "team", href: "team.html", icon: "users" },
    { key: "events", href: "events.html", icon: "calendar" },
    { key: "achievements", href: "achievements.html", icon: "trophy" },
    { key: "contact", href: "index.html#contact", icon: "mail" },
  ];

  function renderFooter() {
    var mount = $("#site-footer");
    if (!mount) return;
    var socials = (C.socials || []).map(R.socialItem).join("");
    var contact = C.contact;

    mount.innerHTML =
      '<div class="container">' +
        '<div class="footer__grid">' +
          '<div class="footer__about">' +
            '<span class="footer__brand-plate">' +
              '<img src="' + UI.esc(C.brand.logo) + '" alt="' + UI.esc(R.L(C.brand.logoAlt)) + '" width="150" height="52" data-fallback>' +
            "</span>" +
            "<p>" + UI.esc(R.t("footer.tagline")) + "</p>" +
            '<div class="socials">' + socials + "</div>" +
          "</div>" +

          '<div><h2>' + UI.esc(R.t("footer.explore")) + "</h2>" +
            '<ul class="footer__links">' +
              NAV_ITEMS.map(function (item) {
                return '<li><a href="' + item.href + '">' + UI.esc(R.t("nav." + item.key)) + "</a></li>";
              }).join("") +
            "</ul></div>" +

          '<div><h2>' + UI.esc(R.t("footer.activities")) + "</h2>" +
            '<ul class="footer__links">' +
              [1, 2, 3, 4].map(function (n) {
                return "<li><span style=\"color:rgba(206,218,236,.78);font-size:.93rem\">" +
                  UI.esc(R.t("footer.act" + n)) + "</span></li>";
              }).join("") +
            "</ul></div>" +

          '<div><h2>' + UI.esc(R.t("footer.contactTitle")) + "</h2>" +
            '<ul class="footer__contact">' +
              '<li><a href="mailto:' + UI.esc(contact.email.value) + '">' +
                UI.icon("mail") + UI.esc(contact.email.value) + "</a></li>" +
              "<li><span style=\"display:inline-flex;gap:9px;align-items:flex-start;color:rgba(206,218,236,.78);font-size:.93rem\">" +
                UI.icon("pin") + UI.esc(R.L(contact.location.value)) + "</span></li>" +
              "<li><span style=\"display:inline-flex;gap:9px;align-items:flex-start;color:rgba(206,218,236,.78);font-size:.93rem\">" +
                UI.icon("clock") + UI.esc(R.L(contact.meeting.value)) + "</span></li>" +
            "</ul>" +
            '<div class="btn-row" style="margin-block-start:18px">' +
              '<span class="sample-chip">' + UI.esc(R.t("common.sampleData")) + "</span>" +
            "</div>" +
          "</div>" +
        "</div>" +

        '<div class="footer__bar">' +
          "<span>© <span data-year></span> <strong>" + UI.esc(R.L(C.brand.fullName)) + "</strong>. " +
            UI.esc(R.t("footer.rights")) + "</span>" +
          "<span>" + UI.esc(R.t("footer.built")) + "</span>" +
        "</div>" +
      "</div>";

    var year = $("[data-year]", mount);
    if (year) year.textContent = new Date().getFullYear();

    UI.bindImages(mount);
  }

  /* ============================================================ REVEALS */
  function initReveals() {
    UI.scanReveals(document);
  }

  /* ============================================== GLOBAL DELEGATED ACTIONS */
  function initGlobalActions() {
    /* Quick view of an event ------------------------------------------- */
    document.addEventListener("click", function (e) {
      var quick = e.target.closest && e.target.closest("[data-quick-view]");
      if (quick) {
        e.preventDefault();
        R.openQuickView(quick.getAttribute("data-quick-view"));
        return;
      }

      var ach = e.target.closest && e.target.closest("[data-achievement]");
      if (ach) {
        e.preventDefault();
        R.openAchievement(ach.getAttribute("data-achievement"));
        return;
      }

      var gal = e.target.closest && e.target.closest("[data-gallery]");
      if (gal) {
        e.preventDefault();
        R.openGallery(gal.getAttribute("data-gallery"));
        return;
      }

      var social = e.target.closest && e.target.closest("[data-social]");
      if (social) {
        e.preventDefault();
        UI.toast(
          R.t("common.socialPendingText", { name: social.getAttribute("data-social-name") || "" }),
          "warn"
        );
        return;
      }

      /* smooth-scroll anchor links inside the same page ------------------ */
      var anchor = e.target.closest && e.target.closest('a[href*="#"]');
      if (anchor && !reduceMotion) {
        var url = new URL(anchor.href, window.location.href);
        if (url.pathname === window.location.pathname && url.hash) {
          var target = document.querySelector(url.hash);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            history.replaceState(null, "", url.hash);
          }
        }
      }
    });

    /* Close modal with Escape globally (also covers dynamically added) ---- */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && UI.isModalOpen()) UI.closeModal();
    });
  }

  /* ================================================================ BOOT */
  function boot() {
    window.I18N.init();
    initNav();
    initLanguage();
    renderFooter();
    initReveals();
    initGlobalActions();
    UI.bindImages(document);

    document.documentElement.classList.add("js-ready");

    if (typeof window.IPPageInit === "function") window.IPPageInit();
    if (typeof window.IPPageRender === "function") window.IPPageRender();

    UI.scanReveals(document);
    UI.bindImages(document);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.IPMain = { renderFooter: renderFooter, NAV_ITEMS: NAV_ITEMS };
})();
