/* ==========================================================================
   IP TEAM — pages/events.js
   Category / status / search filtering over the sample event list.
   ========================================================================== */
(function () {
  "use strict";

  var UI = window.IPUI;
  var R = window.IPRender;

  var state = { category: "all", status: "all", query: "" };

  function all() {
    return (window.IP_EVENTS || []).slice().sort(function (a, b) {
      var order = { ongoing: 0, upcoming: 1, closed: 2, completed: 3 };
      var oa = order[a.status] === undefined ? 4 : order[a.status];
      var ob = order[b.status] === undefined ? 4 : order[b.status];
      if (oa !== ob) return oa - ob;
      return a.date < b.date ? -1 : 1;
    });
  }

  function matches(ev) {
    if (state.category !== "all" && ev.category !== state.category) return false;
    if (state.status !== "all" && ev.status !== state.status) return false;
    if (state.query) {
      var hay = (
        R.L(ev.title) + " " + R.L(ev.excerpt) + " " + R.L(ev.description) + " " +
        R.categoryLabel(ev.category) + " " + R.statusLabel(ev.status) + " " + R.L(ev.location)
      ).toLowerCase();
      if (hay.indexOf(state.query.toLowerCase()) === -1) return false;
    }
    return true;
  }

  function renderChips(mountId, values, key, labelFn, counts) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
    var html =
      '<button type="button" class="chip' + (state[key] === "all" ? " is-active" : "") +
      '" data-filter="' + key + '" data-value="all">' + UI.esc(R.t("filter.all")) +
      '<span class="chip__count">' + counts.all + "</span></button>" +
      values
        .map(function (v) {
          return (
            '<button type="button" class="chip' + (state[key] === v ? " is-active" : "") +
              '" data-filter="' + key + '" data-value="' + UI.esc(v) + '">' +
              UI.esc(labelFn(v)) +
              '<span class="chip__count">' + (counts[v] || 0) + "</span></button>"
          );
        })
        .join("");
    mount.innerHTML = html;
  }

  function countsFor(key) {
    var list = all();
    var counts = { all: list.length };
    list.forEach(function (ev) {
      counts[ev[key]] = (counts[ev[key]] || 0) + 1;
    });
    return counts;
  }

  function renderFilters() {
    renderChips(
      "events-cat-chips",
      window.IP_EVENT_CATEGORIES || [],
      "category",
      R.categoryLabel,
      countsFor("category")
    );
    renderChips(
      "events-status-chips",
      window.IP_EVENT_STATUSES || [],
      "status",
      R.statusLabel,
      countsFor("status")
    );

    Array.prototype.forEach.call(document.querySelectorAll("[data-filter]"), function (btn) {
      if (btn.dataset.bound === "1") return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", function () {
        state[btn.getAttribute("data-filter")] = btn.getAttribute("data-value");
        renderFilters();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    var mount = document.getElementById("events-grid");
    if (!mount) return;

    var list = all();
    var visible = list.filter(matches);

    var count = document.getElementById("events-count");
    if (count) {
      count.textContent = R.t("common.showing", { count: visible.length, total: list.length });
    }

    if (!visible.length) {
      mount.innerHTML =
        '<div class="empty">' + UI.icon("search") +
        "<h3>" + UI.esc(R.t("events.emptyTitle")) + "</h3>" +
        "<p>" + UI.esc(R.t("events.emptyText")) + "</p>" +
        '<button type="button" class="btn btn--primary" data-reset-filters-2>' +
        UI.esc(R.t("common.reset")) + "</button></div>";
      var r2 = mount.querySelector("[data-reset-filters-2]");
      if (r2) {
        r2.addEventListener("click", function () {
          state.category = "all";
          state.status = "all";
          state.query = "";
          var input = document.getElementById("events-search");
          if (input) input.value = "";
          renderFilters();
          renderGrid();
        });
      }
      return;
    }

    mount.innerHTML = '<div class="grid-3">' + visible.map(R.eventCard).join("") + "</div>";
    UI.bindImages(mount);
  }

  window.IPPageInit = function () {
    var input = document.getElementById("events-search");
    if (input && input.dataset.bound !== "1") {
      input.dataset.bound = "1";
      var timer = null;
      input.addEventListener("input", function () {
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          state.query = input.value.trim();
          renderGrid();
        }, 160);
      });
    }

    var reset = document.getElementById("events-reset");
    if (reset && reset.dataset.bound !== "1") {
      reset.dataset.bound = "1";
      reset.addEventListener("click", function () {
        state.category = "all";
        state.status = "all";
        state.query = "";
        input.value = "";
        renderFilters();
        renderGrid();
      });
    }
  };

  window.IPPageRender = function () {
    renderFilters();
    renderGrid();
    UI.bindImages(document);
  };
})();
