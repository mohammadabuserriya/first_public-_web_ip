/* ==========================================================================
   IP TEAM — pages/event-detail.js
   Full detail view for event.html?id=EVENT_ID
   ========================================================================== */
(function () {
  "use strict";

  var UI = window.IPUI;
  var R = window.IPRender;

  function param(name) {
    try {
      return new URLSearchParams(window.location.search).get(name);
    } catch (e) {
      return null;
    }
  }

  function related(ev) {
    return (window.IP_EVENTS || [])
      .filter(function (other) {
        return other.id !== ev.id && other.status !== "completed";
      })
      .slice(0, 3);
  }

  function renderNotFound() {
    var nf = document.getElementById("event-notfound");
    var view = document.getElementById("event-view");
    if (nf) nf.hidden = false;
    if (view) view.hidden = true;
    document.title = R.t("meta.404.title");
  }

  function renderHero(ev) {
    var mount = document.getElementById("event-hero");
    if (!mount) return;

    mount.innerHTML =
      '<div class="detail-hero__media">' +
        '<img src="' + UI.esc(ev.image) + '" alt="' + UI.esc(R.L(ev.title)) +
        '" data-fallback width="1200" height="600">' +
        R.statusBadge(ev.status, "detail-hero__status") +
        '<span class="badge detail-hero__cat">' + UI.esc(R.categoryLabel(ev.category)) + "</span>" +
      "</div>" +
      '<div class="detail-hero__body">' +
        '<div class="btn-row" style="gap:8px;margin-block-end:14px">' +
          (ev.sampleData ? R.sampleChip() : "") +
        "</div>" +
        "<h2>" + UI.esc(R.L(ev.title)) + "</h2>" +
        '<p class="lead" style="margin-block-start:14px">' + UI.esc(R.L(ev.excerpt)) + "</p>" +
        '<div class="detail-hero__meta">' +
          '<div>' + UI.icon("calendar") + "<div><span>" + UI.esc(R.t("event.factsDate")) +
            "</span><b>" + UI.esc(UI.formatDate(ev.date)) +
            (ev.dateEnd ? " → " + UI.esc(UI.formatDate(ev.dateEnd)) : "") + "</b></div></div>" +
          '<div>' + UI.icon("clock") + "<div><span>" + UI.esc(R.t("event.factsTime")) +
            "</span><b>" + UI.esc(ev.time || R.t("event.notSet")) + "</b></div></div>" +
          '<div>' + UI.icon("pin") + "<div><span>" + UI.esc(R.t("event.factsLocation")) +
            "</span><b>" + UI.esc(R.L(ev.location)) + "</b></div></div>" +
          '<div>' + UI.icon("tag") + "<div><span>" + UI.esc(R.t("event.factsCategory")) +
            "</span><b>" + UI.esc(R.categoryLabel(ev.category)) + "</b></div></div>" +
        "</div>" +
      "</div>";
  }

  function renderSide(ev) {
    var mount = document.getElementById("event-side");
    if (!mount) return;
    mount.innerHTML =
      '<div class="panel">' +
        "<h3>" + UI.esc(R.t("event.detailsTitle")) + "</h3>" +
        R.eventFacts(ev) +
      "</div>" +
      R.registrationBlock(ev, "detail");
  }

  function renderContent(ev) {
    var mount = document.getElementById("event-content");
    if (!mount) return;

    var rules = (ev.rules && (ev.rules.en || ev.rules.ar)) || [];
    var schedule = (ev.schedule && (ev.schedule.en || ev.schedule.ar)) || [];

    mount.innerHTML =
      '<section class="prose reveal">' +
        "<h2>" + UI.esc(R.t("event.aboutTitle")) + "</h2>" +
        "<p>" + UI.esc(R.L(ev.description)) + "</p>" +
      "</section>" +

      '<section class="prose reveal">' +
        "<h2>" + UI.esc(R.t("event.rulesTitle")) + "</h2>" +
        '<ul class="bullets">' +
          rules.map(function (r) { return "<li>" + UI.esc(R.L(r)) + "</li>"; }).join("") +
        "</ul>" +
      "</section>" +

      '<section class="prose reveal">' +
        "<h2>" + UI.esc(R.t("event.scheduleTitle")) + "</h2>" +
        '<div class="schedule">' +
          schedule
            .map(function (row) {
              return (
                '<div class="schedule__row">' +
                  '<span class="schedule__time">' + UI.esc(row.time) + "</span>" +
                  "<div><h3>" + UI.esc(R.L(row.title)) + "</h3>" +
                  "<p>" + UI.esc(R.L(row.desc)) + "</p></div>" +
                "</div>"
              );
            })
            .join("") +
        "</div>" +
      "</section>";
  }

  function renderRelated(ev) {
    var mount = document.getElementById("event-related");
    if (!mount) return;
    var list = related(ev);
    if (!list.length) {
      mount.hidden = true;
      return;
    }
    mount.hidden = false;
    mount.innerHTML =
      '<div class="section-head"><div class="section-head__main">' +
        '<span class="eyebrow">' + UI.esc(R.t("events.previewEyebrow")) + "</span>" +
        "<h2>" + UI.esc(R.t("events.previewTitle")) + "</h2>" +
      "</div>" +
      '<a class="btn btn--ghost btn--sm" href="events.html">' + UI.esc(R.t("common.viewAll")) + "</a></div>" +
      '<div class="grid-3">' + list.map(R.eventCard).join("") + "</div>";
  }

  function scrollToRegister() {
    var panel = document.getElementById("detail-panel");
    if (!panel) return;
    panel.scrollIntoView({ behavior: UI.prefersReducedMotion() ? "auto" : "smooth", block: "center" });
    var focusable = panel.querySelector("input, button, a");
    if (focusable) window.setTimeout(function () { focusable.focus({ preventScroll: true }); }, 400);
  }

  window.IPPageInit = function () {
    var back = document.getElementById("event-back");
    if (back) {
      back.addEventListener("click", function () {
        if (window.history.length > 1) window.history.back();
        else window.location.href = "events.html";
      });
    }
  };

  window.IPPageRender = function () {
    var id = param("id");
    var ev = id ? R.getEvent(id) : null;

    if (!ev) {
      renderNotFound();
      return;
    }

    var nf = document.getElementById("event-notfound");
    var view = document.getElementById("event-view");
    if (nf) nf.hidden = true;
    if (view) view.hidden = false;

    document.title = R.L(ev.title) + " — " + R.L(window.IP_CONFIG.brand.name);
    var tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", R.L(ev.excerpt));

    renderHero(ev);
    renderSide(ev);
    renderContent(ev);
    renderRelated(ev);

    R.bindRegistration(document, ev);
    UI.bindImages(document);
    UI.scanReveals(document);

    if (window.location.hash === "#register") {
      window.setTimeout(scrollToRegister, 350);
    }
  };
})();
