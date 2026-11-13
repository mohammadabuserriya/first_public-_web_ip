/* ==========================================================================
   IP TEAM — render.js
   Shared data helpers and card/section renderers used by every page.
   All output is HTML strings; page scripts decide where to inject them.
   ========================================================================== */
(function () {
  "use strict";

  var UI = window.IPUI;

  function t(key, vars) {
    return window.I18N.t(key, vars);
  }

  function L(obj) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    var lang = window.I18N.get();
    return obj[lang] || obj.en || "";
  }

  /* ======================================================== domain helpers */

  function getEvent(id) {
    var list = window.IP_EVENTS || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function getMember(id) {
    var list = window.IP_MEMBERS || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function getAchievement(id) {
    var list = window.IP_ACHIEVEMENTS || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function todayISO() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }

  function roleLabel(role) {
    return t("role." + role);
  }
  function categoryLabel(cat) {
    return t("cat." + cat);
  }
  function statusLabel(status) {
    return t("status." + status);
  }
  function achievementLabel(cat) {
    return t("achCat." + cat);
  }

  /* --------------------------------------------------- registration state */
  /*  returns one of:
      "completed" | "none" | "closed" | "full" | "deadline" | "open"        */
  function registrationState(ev) {
    if (!ev) return "none";
    if (ev.status === "completed") return "completed";
    if (ev.registrationMode === "none") return "none";
    if (ev.status === "closed") return "closed";
    if (typeof ev.capacity === "number" && typeof ev.registered === "number" &&
        ev.registered >= ev.capacity) return "full";
    if (ev.deadline && ev.deadline < todayISO()) return "deadline";
    return "open";
  }

  function capacityInfo(ev) {
    if (typeof ev.capacity !== "number" || ev.capacity <= 0) {
      return { unlimited: true, left: null, total: null, percent: 0 };
    }
    var registered = typeof ev.registered === "number" ? ev.registered : 0;
    var left = Math.max(0, ev.capacity - registered);
    return {
      unlimited: false,
      left: left,
      total: ev.capacity,
      registered: registered,
      percent: Math.min(100, Math.round((registered / ev.capacity) * 100)),
    };
  }

  /* ============================================================ fragments */

  function statusBadge(status, extraClass) {
    var pulse = status === "ongoing" ? " dot--pulse" : "";
    return (
      '<span class="badge badge--status ' + (extraClass || "") + '" data-status="' + UI.esc(status) + '">' +
      '<span class="dot' + pulse + '"></span>' + UI.esc(statusLabel(status)) +
      "</span>"
    );
  }

  function categoryBadge(cat) {
    return '<span class="badge badge--cat">' + UI.esc(categoryLabel(cat)) + "</span>";
  }

  function sampleChip(text) {
    return '<span class="sample-chip">' + UI.esc(text || t("common.sampleData")) + "</span>";
  }

  /* ------------------------------------------------------------ socials */
  function socialItem(social) {
    var name = social.name || social.id;
    var glyph = UI.icon(social.id);
    if (social.url) {
      return (
        '<a class="social" href="' + UI.esc(social.url) + '" target="_blank" rel="noopener noreferrer" ' +
        'aria-label="' + UI.esc(name) + ' (' + UI.esc(t("common.newTab")) + ')">' + glyph + "</a>"
      );
    }
    return (
      '<button type="button" class="social" data-social="' + UI.esc(social.id) + '" ' +
      'data-social-name="' + UI.esc(name) + '" aria-label="' + UI.esc(name) + " — " + UI.esc(t("common.sample")) + '">' +
      glyph + "</button>"
    );
  }

  function socialsList(list) {
    return list.map(socialItem).join("");
  }

  function memberSocials(list) {
    if (!list || !list.length) return "";
    return (
      '<div class="member__social">' +
      list
        .map(function (s) {
          if (s.url) {
            return (
              '<a href="' + UI.esc(s.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' +
              UI.esc(s.name || s.id) + '">' + UI.icon(s.id) + "</a>"
            );
          }
          return (
            '<button type="button" data-social="' + UI.esc(s.id) + '" data-social-name="' +
            UI.esc(s.name || s.id) + '" aria-label="' + UI.esc(s.name || s.id) + " — " +
            UI.esc(t("common.sample")) + '">' + UI.icon(s.id) + "</button>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  /* ========================================================== EVENT CARD */

  function eventCard(ev, opts) {
    opts = opts || {};
    var parts = UI.dateParts(ev.date);
    var state = registrationState(ev);
    var cap = capacityInfo(ev);
    var loc = L(ev.location);

    var capacityHTML = "";
    if (state === "open" && !cap.unlimited) {
      capacityHTML =
        '<span class="event-card__capacity">' + UI.icon("users") +
        UI.esc(t("event.spots", { left: cap.left, total: cap.total })) + "</span>";
    } else if (state === "full") {
      capacityHTML = '<span class="event-card__capacity">' + UI.icon("users") + UI.esc(t("event.full")) + "</span>";
    }

    return (
      '<article class="event-card card reveal" data-status="' + UI.esc(ev.status) + '" data-event-id="' + UI.esc(ev.id) + '">' +
        '<div class="event-card__media">' +
          '<img src="' + UI.esc(ev.image) + '" alt="' + UI.esc(L(ev.title)) + '" loading="lazy" decoding="async" data-fallback width="800" height="500">' +
          statusBadge(ev.status, "event-card__status") +
          '<span class="badge event-card__cat">' + UI.esc(categoryLabel(ev.category)) + "</span>" +
          '<span class="event-card__date"><b>' + UI.esc(parts.day) + "</b><span>" + UI.esc(parts.month) + "</span></span>" +
        "</div>" +
        '<div class="event-card__body">' +
          '<div class="event-card__meta">' +
            "<span>" + UI.icon("calendar") + UI.esc(UI.formatDate(ev.date)) + "</span>" +
            "<span>" + UI.icon("clock") + UI.esc(ev.time || "—") + "</span>" +
          "</div>" +
          "<h3><a href=\"event.html?id=" + UI.esc(ev.id) + "\">" + UI.esc(L(ev.title)) + "</a></h3>" +
          '<p class="event-card__desc">' + UI.esc(L(ev.excerpt)) + "</p>" +
          '<div class="event-card__foot">' +
            (capacityHTML || "<span></span>") +
            '<div class="btn-row" style="gap:12px">' +
              '<button type="button" class="btn btn--sm btn--primary" data-quick-view="' + UI.esc(ev.id) + '">' +
                UI.esc(t("common.quickView")) + "</button>" +
              '<a class="link-arrow" href="event.html?id=' + UI.esc(ev.id) + '">' +
                UI.esc(t("common.viewDetails")) + UI.icon("arrowRight") + "</a>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  /* ========================================================== MEMBER CARD */

  function memberCard(m, opts) {
    opts = opts || {};
    var featured = opts.featured == null ? !!m.featured : !!opts.featured;
    var lead = !featured && (m.role === "president" || m.role === "vice-president");
    var cls =
      "member card reveal" +
      (featured ? " member--featured" : "") +
      (lead ? " member--lead" : "");
    var style = opts.delay ? ' style="--reveal-delay:' + opts.delay + 's"' : "";
    return (
      '<article class="' + cls + '"' + style + ' data-member-id="' + UI.esc(m.id) + '">' +
        '<div class="member__photo">' +
          '<img src="' + UI.esc(m.image) + '" alt="' + UI.esc(L(m.name)) + " — " + UI.esc(roleLabel(m.role)) + '" loading="lazy" decoding="async" data-fallback width="600" height="600">' +
          '<span class="badge badge--yellow member__flag">' + UI.esc(t("common.sample")) + "</span>" +
        "</div>" +
        '<div class="member__body">' +
          '<span class="member__role">' + UI.esc(roleLabel(m.role)) + "</span>" +
          '<h3 class="member__name">' + UI.esc(L(m.name)) + "</h3>" +
          '<p class="member__desc">' + UI.esc(L(m.bio)) + "</p>" +
          memberSocials(m.socials) +
        "</div>" +
      "</article>"
    );
  }

  /* ==================================================== ACHIEVEMENT CARD */

  var ACH_ICON = { award: "trophy", event: "flag", competition: "target", milestone: "chart" };

  function achievementCard(a) {
    return (
      '<article class="ach card reveal" data-status="completed" data-achievement-id="' + UI.esc(a.id) + '">' +
        '<div class="ach__media">' +
          '<img src="' + UI.esc(a.image) + '" alt="' + UI.esc(L(a.title)) + '" loading="lazy" decoding="async" data-fallback width="800" height="600">' +
          '<span class="badge badge--yellow ach__cat">' + UI.esc(achievementLabel(a.category)) + "</span>" +
          '<span class="ach__date">' + UI.esc(UI.formatDate(a.date)) + "</span>" +
          '<span class="ach__icon">' + UI.icon(ACH_ICON[a.category] || "award") + "</span>" +
        "</div>" +
        '<div class="ach__body">' +
          "<h3>" + UI.esc(L(a.title)) + "</h3>" +
          "<p>" + UI.esc(L(a.summary)) + "</p>" +
          '<button type="button" class="link-arrow" data-achievement="' + UI.esc(a.id) + '">' +
            UI.esc(t("ach.openDetails")) + UI.icon("arrowRight") + "</button>" +
        "</div>" +
      "</article>"
    );
  }

  /* ================================================== REGISTRATION BLOCK */

  function registrationBlock(ev, prefix) {
    prefix = prefix || "reg";
    var state = registrationState(ev);
    var cap = capacityInfo(ev);

    if (state === "completed") {
      return (
        '<div class="panel" id="' + prefix + '-panel">' +
          "<h3>" + UI.esc(t("event.registerTitle")) + "</h3>" +
          '<div class="reg-success" style="background:rgba(120,132,152,.10);border-color:rgba(120,132,152,.4)">' +
            UI.icon("info") +
            "<h4 style=\"color:var(--text-soft)\">" + UI.esc(t("event.completedTitle")) + "</h4>" +
            "<p>" + UI.esc(t("event.completedText")) + "</p>" +
          "</div>" +
        "</div>"
      );
    }

    if (state === "none") {
      return (
        '<div class="panel" id="' + prefix + '-panel">' +
          "<h3>" + UI.esc(t("event.registerTitle")) + "</h3>" +
          '<div class="reg-success" style="background:rgba(52,125,187,.10);border-color:rgba(52,125,187,.4)">' +
            UI.icon("info") +
            '<h4 style="color:var(--blue)">' + UI.esc(t("event.registerNone")) + "</h4>" +
            "<p>" + UI.esc(L(ev.description).split(".")[0] + ".") + "</p>" +
          "</div>" +
        "</div>"
      );
    }

    if (state === "closed" || state === "deadline" || state === "full") {
      var titleKey = state === "full" ? "status.regFull" : "event.regClosedTitle";
      var textKey = state === "full" ? "event.full" : "event.regClosedText";
      return (
        '<div class="panel" id="' + prefix + '-panel">' +
          "<h3>" + UI.esc(t("event.registerTitle")) + "</h3>" +
          '<div class="reg-success" style="background:rgba(217,83,79,.10);border-color:rgba(217,83,79,.4)">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d9534f" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
            '<h4 style="color:#d9534f">' + UI.esc(t(titleKey)) + "</h4>" +
            "<p>" + UI.esc(t(textKey)) + "</p>" +
            (ev.deadline ? "<p>" + UI.esc(t("event.deadlineNote", { date: UI.formatDate(ev.deadline) })) + "</p>" : "") +
          "</div>" +
        "</div>"
      );
    }

    /* state === "open" ---------------------------------------------------- */
    var head =
      "<h3>" + UI.esc(t("event.registerTitle")) + "</h3>" +
      (!cap.unlimited
        ? '<p class="field__hint" style="margin-block-end:14px">' +
          UI.esc(cap.left === 0 ? t("event.full") : t("event.spots", { left: cap.left, total: cap.total })) +
          "</p>"
        : "") +
      (ev.deadline
        ? '<p class="field__hint" style="margin-block-end:14px">' +
          UI.esc(t("event.deadlineNote", { date: UI.formatDate(ev.deadline) })) + "</p>"
        : "");

    if (ev.registrationMode === "external") {
      var btn = ev.registrationUrl
        ? '<a class="btn btn--primary btn--block" href="' + UI.esc(ev.registrationUrl) + '" target="_blank" rel="noopener noreferrer">' +
          UI.esc(t("event.registerExternal")) + UI.icon("external") + "</a>"
        : '<button type="button" class="btn btn--primary btn--block" data-external-pending>' +
          UI.esc(t("event.registerExternal")) + UI.icon("external") + "</button>";
      return (
        '<div class="panel" id="' + prefix + '-panel">' + head +
          btn +
          '<p class="form-note" style="margin-block-start:14px">' +
            UI.esc(ev.registrationUrl ? t("common.demoNote") : t("common.externalPending")) +
          "</p>" +
        "</div>"
      );
    }

    /* internal form ------------------------------------------------------- */
    return (
      '<div class="panel" id="' + prefix + '-panel">' + head +
        '<div data-reg-slot="' + UI.esc(prefix) + '">' + registrationForm(ev, prefix) + "</div>" +
      "</div>"
    );
  }

  function registrationForm(ev, prefix) {
    return (
      '<form class="reg-form" novalidate data-reg-form data-prefix="' + UI.esc(prefix) + '">' +
        '<div class="field">' +
          '<label class="field__label" for="' + prefix + '-name">' + UI.esc(t("event.formName")) + " *</label>" +
          '<input class="input" id="' + prefix + '-name" name="name" type="text" autocomplete="name" required data-i18n-ph="event.formNamePh">' +
          '<span class="field__error" data-error-for="name"></span>' +
        "</div>" +
        '<div class="field">' +
          '<label class="field__label" for="' + prefix + '-email">' + UI.esc(t("event.formEmail")) + " *</label>" +
          '<input class="input" id="' + prefix + '-email" name="email" type="email" autocomplete="email" required data-i18n-ph="event.formEmailPh">' +
          '<span class="field__error" data-error-for="email"></span>' +
        "</div>" +
        '<div class="field">' +
          '<label class="field__label" for="' + prefix + '-phone">' + UI.esc(t("event.formPhone")) + "</label>" +
          '<input class="input" id="' + prefix + '-phone" name="phone" type="tel" autocomplete="tel" data-i18n-ph="event.formPhonePh">' +
          '<span class="field__error" data-error-for="phone"></span>' +
        "</div>" +
        '<div class="field">' +
          '<label class="field__label" for="' + prefix + '-year">' + UI.esc(t("event.formYear")) + " *</label>" +
          '<input class="input" id="' + prefix + '-year" name="year" type="text" required data-i18n-ph="event.formYearPh">' +
          '<span class="field__error" data-error-for="year"></span>' +
        "</div>" +
        '<div class="field">' +
          '<label class="field__label" for="' + prefix + '-notes">' + UI.esc(t("event.formNotes")) + "</label>" +
          '<textarea class="textarea" id="' + prefix + '-notes" name="notes" rows="3" data-i18n-ph="event.formNotesPh"></textarea>' +
        "</div>" +
        '<div class="field">' +
          '<label class="checkbox"><input type="checkbox" name="agree" required>' +
          "<span>" + UI.esc(t("event.formAgree")) + "</span></label>" +
          '<span class="field__error" data-error-for="agree"></span>' +
        "</div>" +
        '<p class="form-note">' + UI.esc(t("common.demoNote")) + "</p>" +
        '<button type="submit" class="btn btn--yellow btn--block">' + UI.esc(t("event.formSubmit")) + UI.icon("send") + "</button>" +
      "</form>"
    );
  }

  /* ------------------------------------------------------ generic form UX */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(form, name, message) {
    var slot = form.querySelector('[data-error-for="' + name + '"]');
    var field = form.querySelector('[name="' + name + '"]');
    if (slot) slot.textContent = message || "";
    if (field) {
      if (message) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    }
  }

  /* validators: return "" when valid, otherwise a translation key */
  function validateRegistration(form) {
    var ok = true;
    var name = form.elements.name;
    var email = form.elements.email;
    var year = form.elements.year;
    var agree = form.elements.agree;

    if (!name.value.trim()) { setError(form, "name", t("event.errRequired")); ok = false; }
    else setError(form, "name", "");

    if (!email.value.trim()) { setError(form, "email", t("event.errRequired")); ok = false; }
    else if (!EMAIL_RE.test(email.value.trim())) { setError(form, "email", t("event.errEmail")); ok = false; }
    else setError(form, "email", "");

    if (!year.value.trim()) { setError(form, "year", t("event.errRequired")); ok = false; }
    else setError(form, "year", "");

    if (!agree.checked) { setError(form, "agree", t("event.errAgree")); ok = false; }
    else setError(form, "agree", "");

    if (!ok) {
      var firstBad = form.querySelector('[aria-invalid="true"]');
      if (firstBad) firstBad.focus();
    }
    return ok;
  }

  function successBlock(prefix) {
    return (
      '<div class="reg-success" role="status">' +
        UI.icon("checkCircle") +
        "<h3>" + UI.esc(t("event.formSuccessTitle")) + "</h3>" +
        "<p>" + UI.esc(t("event.formSuccessText")) + "</p>" +
        '<button type="button" class="btn btn--ghost btn--sm" data-reg-again="' + UI.esc(prefix) + '">' +
          UI.esc(t("event.formAgain")) + "</button>" +
      "</div>"
    );
  }

  function bindRegistration(root, ev) {
    root = root || document;

    Array.prototype.forEach.call(root.querySelectorAll("[data-reg-form]"), function (form) {
      if (form.dataset.bound === "1") return;
      form.dataset.bound = "1";
      var prefix = form.getAttribute("data-prefix") || "reg";

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!validateRegistration(form)) return;
        var slot = form.closest("[data-reg-slot]") || form.parentNode;
        slot.innerHTML = successBlock(prefix);
        var again = slot.querySelector("[data-reg-again]");
        if (again) again.focus();
      });

      Array.prototype.forEach.call(form.elements, function (field) {
        if (!field.name) return;
        field.addEventListener("input", function () {
          if (field.getAttribute("aria-invalid") === "true") setError(form, field.name, "");
        });
        field.addEventListener("change", function () {
          if (field.getAttribute("aria-invalid") === "true") setError(form, field.name, "");
        });
      });
    });

    Array.prototype.forEach.call(root.querySelectorAll("[data-reg-again]"), function (btn) {
      if (btn.dataset.bound === "1") return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", function () {
        var prefix = btn.getAttribute("data-reg-again") || "reg";
        var slot = btn.closest("[data-reg-slot]");
        if (slot) {
          slot.innerHTML = registrationForm(ev, prefix);
          bindRegistration(slot, ev);
          var first = slot.querySelector("input");
          if (first) first.focus();
        }
      });
    });

    Array.prototype.forEach.call(root.querySelectorAll("[data-external-pending]"), function (btn) {
      if (btn.dataset.bound === "1") return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", function () {
        UI.toast(t("common.externalPendingText"), "warn");
      });
    });
  }

  /* ==================================================== detail fragments */

  function factRow(label, value) {
    return "<li><span>" + UI.esc(label) + "</span><b>" + UI.esc(value) + "</b></li>";
  }

  function eventFacts(ev) {
    var cap = capacityInfo(ev);
    var state = registrationState(ev);
    var modeLabel =
      ev.registrationMode === "internal"
        ? t("event.registerInternal")
        : ev.registrationMode === "external"
          ? t("event.registerExternal")
          : t("event.registerNone");

    return (
      '<ul class="fact-list">' +
        factRow(t("event.factsDate"), UI.formatDate(ev.date) + (ev.dateEnd ? " → " + UI.formatDate(ev.dateEnd) : "")) +
        factRow(t("event.factsTime"), ev.time || t("event.notSet")) +
        factRow(t("event.factsLocation"), L(ev.location)) +
        factRow(t("event.factsCategory"), categoryLabel(ev.category)) +
        factRow(t("event.factsStatus"), statusLabel(ev.status)) +
        factRow(t("event.factsCapacity"), cap.unlimited ? t("event.unlimited") : String(cap.total)) +
        factRow(t("event.factsDeadline"), ev.deadline ? UI.formatDate(ev.deadline) : t("event.notSet")) +
        factRow(t("event.factsFormat"), modeLabel) +
      "</ul>" +
      (state === "open" && !cap.unlimited
        ? '<div style="margin-block-start:16px">' +
          '<div class="progress" role="img" aria-label="' + UI.esc(cap.percent + "%") + '">' +
          '<div class="progress__bar" style="width:' + cap.percent + '%"></div></div>' +
          '<p class="field__hint" style="margin-block-start:8px">' +
          UI.esc(t("event.spots", { left: cap.left, total: cap.total })) + "</p></div>"
        : "")
    );
  }

  /* ========================================================= modal bodies */

  function openQuickView(id) {
    var ev = getEvent(id);
    if (!ev) {
      UI.toast(t("event.notFoundText"), "warn");
      return;
    }
    var state = registrationState(ev);

    var html =
      '<div style="border-radius:16px;overflow:hidden;margin-block-end:18px;aspect-ratio:16/8;background:var(--navy)">' +
        '<img src="' + UI.esc(ev.image) + '" alt="" data-fallback style="width:100%;height:100%;object-fit:cover" width="800" height="400">' +
      "</div>" +
      '<div class="btn-row" style="gap:8px;margin-block-end:14px">' +
        statusBadge(ev.status) + categoryBadge(ev.category) +
        (ev.sampleData ? sampleChip() : "") +
      "</div>" +
      '<p class="lead" style="margin-block-end:16px">' + UI.esc(L(ev.description)) + "</p>" +
      '<ul class="fact-list" style="margin-block-end:18px">' +
        factRow(t("event.factsDate"), UI.formatDate(ev.date) + (ev.dateEnd ? " → " + UI.formatDate(ev.dateEnd) : "")) +
        factRow(t("event.factsTime"), ev.time || "—") +
        factRow(t("event.factsLocation"), L(ev.location)) +
      "</ul>" +
      registrationBlock(ev, "qv") +
      '<div class="btn-row" style="margin-block-start:18px">' +
        '<a class="btn btn--ghost" href="event.html?id=' + UI.esc(ev.id) + '">' +
          UI.esc(t("common.viewDetails")) + UI.icon("arrowRight") + "</a>" +
        '<button type="button" class="btn btn--ghost" data-modal-close>' + UI.esc(t("common.close")) + "</button>" +
      "</div>";

    UI.openModal({ title: L(ev.title), html: html, size: "wide" });

    var content = document.querySelector("#ip-modal .modal__content");
    if (content) {
      bindRegistration(content, ev);
      UI.bindImages(content);
    }
    void state;
  }

  function openAchievement(id) {
    var a = getAchievement(id);
    if (!a) {
      UI.toast(t("common.notFound"), "warn");
      return;
    }
    var html =
      '<div style="border-radius:16px;overflow:hidden;margin-block-end:18px;aspect-ratio:16/9;background:var(--navy)">' +
        '<img src="' + UI.esc(a.image) + '" alt="" data-fallback style="width:100%;height:100%;object-fit:cover" width="800" height="450">' +
      "</div>" +
      '<div class="btn-row" style="gap:8px;margin-block-end:14px">' +
        '<span class="badge badge--yellow">' + UI.esc(achievementLabel(a.category)) + "</span>" +
        '<span class="badge">' + UI.esc(UI.formatDate(a.date)) + "</span>" +
        (a.sampleData ? sampleChip() : "") +
      "</div>" +
      '<p class="lead">' + UI.esc(L(a.details)) + "</p>";

    UI.openModal({ title: L(a.title), html: html, size: "wide" });
    var content = document.querySelector("#ip-modal .modal__content");
    if (content) UI.bindImages(content);
  }

  function openGallery(id) {
    var items = window.IP_CONFIG.gallery;
    var idx = -1;
    for (var i = 0; i < items.length; i++) if (items[i].id === id) idx = i;
    if (idx < 0) return;

    var item = items[idx];
    var html =
      '<img class="lightbox-img" src="' + UI.esc(item.img) + '" alt="' + UI.esc(L(item.caption)) + '" data-fallback>' +
      '<p class="lightbox-cap">' + UI.esc(L(item.caption)) + "</p>" +
      '<div class="btn-row" style="justify-content:center;margin-block-start:16px;gap:10px">' +
        '<button type="button" class="btn btn--outline-light btn--sm" data-gallery-nav="-1">' +
          UI.icon("arrowLeft") + UI.esc("Prev") + "</button>" +
        '<span class="lightbox-cap" style="margin:0">' + (idx + 1) + " / " + items.length + "</span>" +
        '<button type="button" class="btn btn--outline-light btn--sm" data-gallery-nav="1">' +
          UI.esc("Next") + UI.icon("arrowRight") + "</button>" +
      "</div>";

    UI.openModal({ title: L(item.caption), html: html, size: "media" });

    var content = document.querySelector("#ip-modal .modal__content");
    if (!content) return;
    UI.bindImages(content);

    Array.prototype.forEach.call(content.querySelectorAll("[data-gallery-nav]"), function (btn) {
      btn.addEventListener("click", function () {
        var step = Number(btn.getAttribute("data-gallery-nav"));
        var next = (idx + step + items.length) % items.length;
        UI.closeModal();
        window.setTimeout(function () {
          openGallery(items[next].id);
        }, 220);
      });
    });
  }

  /* ============================================================== export */
  window.IPRender = {
    t: t,
    L: L,
    getEvent: getEvent,
    getMember: getMember,
    getAchievement: getAchievement,
    roleLabel: roleLabel,
    categoryLabel: categoryLabel,
    statusLabel: statusLabel,
    achievementLabel: achievementLabel,
    registrationState: registrationState,
    capacityInfo: capacityInfo,
    statusBadge: statusBadge,
    categoryBadge: categoryBadge,
    sampleChip: sampleChip,
    socialsList: socialsList,
    socialItem: socialItem,
    eventCard: eventCard,
    memberCard: memberCard,
    achievementCard: achievementCard,
    registrationBlock: registrationBlock,
    registrationForm: registrationForm,
    bindRegistration: bindRegistration,
    eventFacts: eventFacts,
    factRow: factRow,
    openQuickView: openQuickView,
    openAchievement: openAchievement,
    openGallery: openGallery,
    EMAIL_RE: EMAIL_RE,
    validateRegistration: validateRegistration,
    setError: setError,
  };
})();
