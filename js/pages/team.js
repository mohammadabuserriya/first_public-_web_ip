/* ==========================================================================
   IP TEAM — pages/team.js
   Featured leadership pair, position filter and the full member grid.
   ========================================================================== */
(function () {
  "use strict";

  var UI = window.IPUI;
  var R = window.IPRender;

  var selectedRole = "all";

  function ordered() {
    var order = window.IP_ROLE_ORDER || [];
    var list = (window.IP_MEMBERS || []).slice();
    return list.sort(function (a, b) {
      var ia = order.indexOf(a.role);
      var ib = order.indexOf(b.role);
      if (ia === -1) ia = 99;
      if (ib === -1) ib = 99;
      if (ia !== ib) return ia - ib;
      return a.id < b.id ? -1 : 1;
    });
  }

  function presentRoles() {
    var order = window.IP_ROLE_ORDER || [];
    var seen = [];
    ordered().forEach(function (m) {
      if (seen.indexOf(m.role) === -1) seen.push(m.role);
    });
    return order.filter(function (r) {
      return seen.indexOf(r) !== -1;
    });
  }

  function featuredLeaders() {
    return ordered().filter(function (m) {
      return m.role === "president" || m.role === "vice-president";
    });
  }

  function renderFeatured() {
    var mount = document.getElementById("team-featured");
    if (!mount) return;
    var leaders = featuredLeaders();
    mount.innerHTML = leaders
      .map(function (m, i) {
        return R.memberCard(m, { featured: true, delay: i * 0.1 });
      })
      .join("");
    mount.hidden = leaders.length === 0;
  }

  function renderChips() {
    var mount = document.getElementById("team-role-chips");
    if (!mount) return;
    var roles = presentRoles();

    var html =
      '<button type="button" class="chip' + (selectedRole === "all" ? " is-active" : "") +
        '" data-role="all">' + UI.esc(R.t("filter.all")) + "</button>" +
      roles
        .map(function (role) {
          return (
            '<button type="button" class="chip' + (selectedRole === role ? " is-active" : "") +
              '" data-role="' + UI.esc(role) + '">' +
              UI.esc(R.roleLabel(role)) +
              '<span class="chip__count">' +
              (window.IP_MEMBERS || []).filter(function (m) {
                return m.role === role;
              }).length +
              "</span></button>"
          );
        })
        .join("");

    mount.innerHTML = html;

    Array.prototype.forEach.call(mount.querySelectorAll("[data-role]"), function (btn) {
      btn.addEventListener("click", function () {
        selectedRole = btn.getAttribute("data-role");
        renderChips();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    var mount = document.getElementById("team-grid");
    if (!mount) return;

    var all = ordered();
    var leaders = featuredLeaders();
    var list;

    if (selectedRole === "all") {
      list = all.filter(function (m) {
        return leaders.indexOf(m) === -1;
      });
    } else {
      list = all.filter(function (m) {
        return m.role === selectedRole;
      });
    }

    var count = document.getElementById("team-count");
    if (count) count.textContent = R.t("team.count", { count: list.length });

    if (!list.length) {
      mount.innerHTML =
        '<div class="empty" style="grid-column:1/-1">' + UI.icon("users") +
        "<h3>" + UI.esc(R.t("team.noMembers")) + "</h3>" +
        "<p>" + UI.esc(R.t("team.noMembersText")) + "</p>" +
        '<button type="button" class="btn btn--primary" data-role-reset>' +
        UI.esc(R.t("common.reset")) + "</button></div>";
      var reset = mount.querySelector("[data-role-reset]");
      if (reset) {
        reset.addEventListener("click", function () {
          selectedRole = "all";
          renderChips();
          renderGrid();
        });
      }
      return;
    }

    mount.innerHTML = '<div class="grid-4">' +
      list
        .map(function (m, i) {
          return R.memberCard(m, { featured: false, delay: (i % 4) * 0.06 });
        })
        .join("") +
      "</div>";
  }

  window.IPPageInit = function () {};

  window.IPPageRender = function () {
    renderFeatured();
    renderChips();
    renderGrid();
    UI.bindImages(document);
  };
})();
