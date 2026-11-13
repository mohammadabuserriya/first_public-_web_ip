/* ==========================================================================
   IP TEAM — pages/achievements.js
   Category filtering over sample achievement records.
   The grid layout can later be swapped for a timeline without touching data.
   ========================================================================== */
(function () {
  "use strict";

  var UI = window.IPUI;
  var R = window.IPRender;

  var state = { category: "all", view: "grid" };

  function all() {
    return (window.IP_ACHIEVEMENTS || []).slice().sort(function (a, b) {
      return a.date < b.date ? 1 : -1;
    });
  }

  function renderChips() {
    var mount = document.getElementById("ach-cat-chips");
    if (!mount) return;

    var list = all();
    var counts = { all: list.length };
    list.forEach(function (a) {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });

    var values = window.IP_ACHIEVEMENT_CATEGORIES || [];
    mount.innerHTML =
      '<button type="button" class="chip' + (state.category === "all" ? " is-active" : "") +
        '" data-ach-filter="all">' + UI.esc(R.t("filter.all")) +
        '<span class="chip__count">' + counts.all + "</span></button>" +
      values
        .map(function (v) {
          if (!counts[v]) return "";
          return (
            '<button type="button" class="chip' + (state.category === v ? " is-active" : "") +
              '" data-ach-filter="' + UI.esc(v) + '">' +
              UI.esc(R.achievementLabel(v)) +
              '<span class="chip__count">' + counts[v] + "</span></button>"
          );
        })
        .join("");

    Array.prototype.forEach.call(mount.querySelectorAll("[data-ach-filter]"), function (btn) {
      btn.addEventListener("click", function () {
        state.category = btn.getAttribute("data-ach-filter");
        renderChips();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    var mount = document.getElementById("ach-grid");
    if (!mount) return;

    var list = all();
    var visible =
      state.category === "all"
        ? list
        : list.filter(function (a) {
            return a.category === state.category;
          });

    var count = document.getElementById("ach-count");
    if (count) {
      count.textContent = R.t("common.showing", { count: visible.length, total: list.length });
    }

    if (!visible.length) {
      mount.innerHTML =
        '<div class="empty" style="grid-column:1/-1">' + UI.icon("award") +
        "<h3>" + UI.esc(R.t("ach.emptyTitle")) + "</h3>" +
        "<p>" + UI.esc(R.t("ach.emptyText")) + "</p></div>";
      return;
    }

    mount.innerHTML = '<div class="grid-3">' + visible.map(R.achievementCard).join("") + "</div>";
    UI.bindImages(mount);
  }

  window.IPPageInit = function () {};

  window.IPPageRender = function () {
    renderChips();
    renderGrid();
    UI.bindImages(document);
  };
})();
