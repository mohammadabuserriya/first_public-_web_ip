/* ==========================================================================
   IP TEAM — pages/about.js
   About page dynamic lists (pillars + activities). Everything else on this
   page is static markup translated through data-i18n attributes.
   ========================================================================== */
(function () {
  "use strict";

  var UI = window.IPUI;
  var R = window.IPRender;

  var PILLARS = [
    { icon: "code", key: "about.pillar1" },
    { icon: "bulb", key: "about.pillar2" },
    { icon: "users", key: "about.pillar3" },
    { icon: "heart", key: "about.pillar4" },
    { icon: "book", key: "about.pillar5" },
    { icon: "shield", key: "about.pillar6" },
  ];

  var ACTIVITIES = [
    { icon: "trophy", key: "about.activity1" },
    { icon: "palette", key: "about.activity2" },
    { icon: "zap", key: "about.activity3" },
    { icon: "rocket", key: "about.activity4" },
    { icon: "edit", key: "about.activity5" },
    { icon: "sparkle", key: "about.activity6" },
  ];

  function renderList(mountId, items, type) {
    var mount = document.getElementById(mountId);
    if (!mount) return;

    mount.innerHTML = items
      .map(function (item, i) {
        var delay = ' style="--reveal-delay:' + (i % 3) * 0.08 + 's"';
        if (type === "pillar") {
          return (
            '<article class="pillar reveal"' + delay + ">" +
              '<span class="pillar__icon">' + UI.icon(item.icon) + "</span>" +
              "<h3>" + UI.esc(R.t(item.key + "t")) + "</h3>" +
              "<p>" + UI.esc(R.t(item.key + "d")) + "</p>" +
            "</article>"
          );
        }
        return (
          '<article class="activity reveal"' + delay + ">" +
            '<span class="activity__n">' + UI.icon(item.icon) + "</span>" +
            "<div><h3>" + UI.esc(R.t(item.key + "t")) + "</h3>" +
            "<p>" + UI.esc(R.t(item.key + "d")) + "</p></div>" +
          "</article>"
        );
      })
      .join("");
  }

  window.IPPageInit = function () {};

  window.IPPageRender = function () {
    renderList("about-pillars", PILLARS, "pillar");
    renderList("about-activities", ACTIVITIES, "activity");
    UI.bindImages(document);
  };
})();
