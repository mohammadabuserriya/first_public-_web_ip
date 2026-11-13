/* ==========================================================================
   IP TEAM — pages/home.js
   Renders the dynamic regions of index.html. Re-runs on language change.
   ========================================================================== */
(function () {
  "use strict";

  var UI = window.IPUI;
  var R = window.IPRender;
  var C = window.IP_CONFIG;

  function $(sel) {
    return document.querySelector(sel);
  }
  function set(sel, html) {
    var el = $(sel);
    if (el) el.innerHTML = html;
    return el;
  }

  function upcomingEvents(limit) {
    return (window.IP_EVENTS || [])
      .filter(function (ev) {
        return ev.status === "upcoming" || ev.status === "ongoing" || ev.status === "closed";
      })
      .sort(function (a, b) {
        if (a.date === b.date) return 0;
        return a.date < b.date ? -1 : 1;
      })
      .slice(0, limit || 3);
  }

  function featuredMembers() {
    var list = window.IP_MEMBERS || [];
    var picked = [];
    function take(role) {
      list.forEach(function (m) {
        if (m.role === role && picked.indexOf(m) === -1) picked.push(m);
      });
    }
    take("president");
    take("vice-president");
    take("technical");
    take("design");
    return picked.slice(0, 4);
  }

  function latestAchievements(limit) {
    return (window.IP_ACHIEVEMENTS || [])
      .slice()
      .sort(function (a, b) {
        if (a.date === b.date) return 0;
        return a.date < b.date ? 1 : -1;
      })
      .slice(0, limit || 3);
  }

  /* ------------------------------------------------------------ renderers */

  function renderHero() {
    var strip = C.strip || [];
    set(
      "#hero-strip",
      "<ul>" +
        strip
          .map(function (s, i) {
            return '<li style="--reveal-delay:' + i * 0.06 + 's">' + UI.esc(R.L(s)) + "</li>";
          })
          .join("") +
        "</ul>"
    );

    var chips = C.heroChips || [];
    set(
      "#hero-chips",
      chips
        .map(function (c, i) {
          return (
            '<span class="orb__chip orb__chip--' + (i + 1) + '">' +
              UI.icon(c.icon) + UI.esc(R.L(c.text)) +
            "</span>"
          );
        })
        .join("")
    );

    var meta = C.heroMeta || [];
    set(
      "#hero-meta",
      meta
        .map(function (m) {
          return (
            "<div>" +
              "<strong>" + UI.esc(R.L(m.value)) + "</strong>" +
              "<span>" + UI.esc(R.L(m.label)) + "</span>" +
            "</div>"
          );
        })
        .join("")
    );

    var logo = $("#hero-logo");
    if (logo) {
      logo.setAttribute("src", C.brand.logo);
      logo.setAttribute("alt", R.L(C.brand.logoAlt));
    }
  }

  function renderStats() {
    var stats = C.stats || [];
    set(
      "#stats-grid",
      stats
        .map(function (s, i) {
          return (
            '<div class="stat reveal" style="--reveal-delay:' + i * 0.08 + 's">' +
              '<div class="stat__num" data-count="' + UI.esc(s.value) + '" data-suffix="' +
                UI.esc(s.suffix || "") + '">0</div>' +
              '<span class="stat__label">' + UI.esc(R.L(s.label)) + "</span>" +
            "</div>"
          );
        })
        .join("")
    );
  }

  function renderEvents() {
    var list = upcomingEvents(3);
    set(
      "#home-events",
      list.length
        ? '<div class="grid-3">' + list.map(function (ev) { return R.eventCard(ev); }).join("") + "</div>"
        : '<div class="empty">' + UI.icon("calendar") +
          "<h3>" + UI.esc(R.t("events.emptyTitle")) + "</h3>" +
          "<p>" + UI.esc(R.t("events.emptyText")) + "</p>" +
          '<a class="btn btn--primary" href="events.html">' + UI.esc(R.t("common.viewAll")) + "</a></div>"
    );
  }

  function renderMembers() {
    var list = featuredMembers();
    set(
      "#home-members",
      '<div class="grid-4">' +
        list
          .map(function (m, i) {
            return R.memberCard(m, { featured: false, delay: i * 0.07 });
          })
          .join("") +
      "</div>"
    );
  }

  function renderAchievements() {
    var list = latestAchievements(3);
    set("#home-achievements", '<div class="grid-3">' + list.map(R.achievementCard).join("") + "</div>");
  }

  function renderGallery() {
    var items = C.gallery || [];
    set(
      "#home-gallery",
      '<div class="gallery">' +
        items
          .map(function (g, i) {
            var span = g.span ? " gallery__item--" + g.span : "";
            return (
              '<button type="button" class="gallery__item reveal' + span + '" data-gallery="' + UI.esc(g.id) +
                '" style="--reveal-delay:' + (i % 4) * 0.06 + 's" aria-label="' + UI.esc(R.L(g.caption)) + '">' +
                '<img src="' + UI.esc(g.img) + '" alt="' + UI.esc(R.L(g.caption)) +
                '" loading="lazy" decoding="async" data-fallback width="800" height="600">' +
                '<span class="gallery__cap">' + UI.esc(R.L(g.caption)) + "</span>" +
              "</button>"
            );
          })
          .join("") +
      "</div>"
    );
  }

  function renderContact() {
    set("#contact-socials", R.socialsList(C.socials || []));

    var info = C.contact;
    var items = [
      { icon: "mail", title: R.t("contact.emailLabel"), value: info.email.value, href: "mailto:" + info.email.value },
      { icon: "pin", title: R.L(info.location.label), value: R.L(info.location.value) },
      { icon: "clock", title: R.L(info.meeting.label), value: R.L(info.meeting.value) },
    ];
    if (info.phone) {
      items.push({ icon: "phone", title: R.t("contact.phoneLabel"), value: info.phone, href: "tel:" + info.phone });
    }

    set(
      "#contact-info",
      items
        .map(function (it) {
          return (
            '<div class="contact-item reveal">' +
              '<span class="contact-item__icon">' + UI.icon(it.icon) + "</span>" +
              "<div><h3>" + UI.esc(it.title) + "</h3>" +
                (it.href
                  ? '<a href="' + UI.esc(it.href) + '">' + UI.esc(it.value) + "</a>"
                  : "<p>" + UI.esc(it.value) + "</p>") +
              "</div>" +
            "</div>"
          );
        })
        .join("") +
      '<div class="reveal" style="margin-block-start:4px"><span class="sample-chip">' +
        UI.esc(R.t("common.sampleData")) + "</span></div>"
    );
  }

  /* --------------------------------------------------- contact form (demo) */
  function bindContactForm() {
    var form = $("#contact-form");
    if (!form || form.dataset.bound === "1") return;
    form.dataset.bound = "1";

    function err(name, msg) {
      var slot = form.querySelector('[data-error-for="' + name + '"]');
      var field = form.querySelector('[name="' + name + '"]');
      if (slot) slot.textContent = msg || "";
      if (field) {
        if (msg) field.setAttribute("aria-invalid", "true");
        else field.removeAttribute("aria-invalid");
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var name = form.elements.fullName;
      var email = form.elements.email;
      var subject = form.elements.subject;
      var message = form.elements.message;
      var agree = form.elements.agree;

      if (!name.value.trim()) { err("fullName", R.t("contact.errRequired")); ok = false; } else err("fullName", "");
      if (!email.value.trim()) { err("email", R.t("contact.errRequired")); ok = false; }
      else if (!R.EMAIL_RE.test(email.value.trim())) { err("email", R.t("contact.errEmail")); ok = false; }
      else err("email", "");
      if (!subject.value) { err("subject", R.t("contact.errSubject")); ok = false; } else err("subject", "");
      if (message.value.trim().length < 15) { err("message", R.t("contact.errMessage")); ok = false; } else err("message", "");
      if (!agree.checked) { err("agree", R.t("contact.errAgree")); ok = false; } else err("agree", "");

      if (!ok) {
        var first = form.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }

      var slot = $("#contact-success");
      form.hidden = true;
      if (slot) {
        slot.hidden = false;
        slot.focus();
      }
      UI.toast(R.t("contact.successTitle"), "success");
    });

    Array.prototype.forEach.call(form.elements, function (field) {
      if (!field.name) return;
      field.addEventListener("input", function () {
        if (field.getAttribute("aria-invalid") === "true") err(field.name, "");
      });
      field.addEventListener("change", function () {
        if (field.getAttribute("aria-invalid") === "true") err(field.name, "");
      });
    });
  }

  function resetContactForm() {
    var form = $("#contact-form");
    var slot = $("#contact-success");
    if (form) {
      form.reset();
      form.hidden = false;
      Array.prototype.forEach.call(form.querySelectorAll(".field__error"), function (s) {
        s.textContent = "";
      });
      Array.prototype.forEach.call(form.querySelectorAll("[aria-invalid]"), function (f) {
        f.removeAttribute("aria-invalid");
      });
    }
    if (slot) slot.hidden = true;
    var first = form && form.querySelector("input");
    if (first) first.focus();
  }

  /* ------------------------------------------------------------- lifecycle */
  window.IPPageInit = function () {
    bindContactForm();
    var again = $("#contact-again");
    if (again) again.addEventListener("click", resetContactForm);
  };

  window.IPPageRender = function () {
    renderHero();
    renderStats();
    renderEvents();
    renderMembers();
    renderAchievements();
    renderGallery();
    renderContact();
    UI.bindImages(document);
  };
})();
