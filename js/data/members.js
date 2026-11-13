/* ==========================================================================
   IP TEAM — data/members.js
   Team members. Every identity below is a SAMPLE PLACEHOLDER.
   Replace names, photos and bios with your real members before publishing.
   Multiple members may share the same `role` key.
   ========================================================================== */
(function () {
  "use strict";

  var PH = "assets/images/placeholders/";

  function member(n, role, enName, arName, enBio, arBio, opts) {
    opts = opts || {};
    return {
      id: opts.id || "m-" + String(n).padStart(2, "0"),
      name: { en: enName, ar: arName },
      role: role,
      bio: { en: enBio, ar: arBio },
      image: opts.image || PH + "ph-member-" + String(n).padStart(2, "0") + ".svg",
      featured: !!opts.featured,
      socials: opts.socials || [],
      sample: true,
    };
  }

  window.IP_MEMBERS = [
    member(1, "president",
      "Sample Member 01", "عضو تجريبي 01",
      "Leads the team vision, represents IP TEAM across campus and keeps every department moving in the same direction.",
      "يقود رؤية الفريق ويمثّل فريق IP أمام الحرم الجامعي ويحرص على توحيد مسارات جميع الأقسام.",
      { featured: true, socials: [{ id: "linkedin", url: null }, { id: "x", url: null }] }),

    member(2, "vice-president",
      "Sample Member 02", "عضو تجريبي 02",
      "Supports the president, coordinates between departments and steps in to lead whenever it is needed.",
      "يدعم الرئيس وينسّق بين الأقسام ويتولى القيادة عند الحاجة.",
      { featured: true, socials: [{ id: "linkedin", url: null }] }),

    member(3, "social-media",
      "Sample Member 03", "عضو تجريبي 03",
      "Plans the posting calendar, writes captions and tracks how our content performs.",
      "يعمل على جدول النشر ويكتب النصوص ويتابع أداء المحتوى.",
      { socials: [{ id: "instagram", url: null }] }),

    member(4, "social-media",
      "Sample Member 04", "عضو تجريبي 04",
      "Handles community replies, stories and day-to-day engagement across our channels.",
      "يتابع ردود المجتمع والقصص والتفاعل اليومي عبر قنواتنا.",
      { socials: [{ id: "facebook", url: null }] }),

    member(5, "design",
      "Sample Member 05", "عضو تجريبي 05",
      "Owns the visual identity of every event — posters, banners, slides and social graphics.",
      "مسؤول عن الهوية البصرية لكل فعالية — بوسترات وبانرات وشرائح وتصميمات السوشيال.",
      { featured: false, socials: [{ id: "instagram", url: null }] }),

    member(6, "design",
      "Sample Member 06", "عضو تجريبي 06",
      "Builds UI concepts and reviews layouts for consistency across print and digital.",
      "يبني مفاهيم واجهات ويراجع التصاميم لضمان التجانس بين المطبوع والرقمي."),

    member(7, "hr",
      "Sample Member 07", "عضو تجريبي 07",
      "Receives new member applications, runs onboarding and keeps the team culture healthy.",
      "يستقبل طلبات الأعضاء الجدد ويهتم بتهيئةهم ويحافظ على ثقافة الفريق."),

    member(8, "funding",
      "Sample Member 08", "عضو تجريبي 08",
      "Looks after budgets, sponsorship conversations and the paperwork behind every event.",
      "يتابع الميزانيات ومحافلات الرعاية والأوراق المختومة خلف كل فعالية."),

    member(9, "events",
      "Sample Member 09", "عضو تجريبي 09",
      "Plans the event from first idea to last attendee — logistics, rooms and run-of-show.",
      "يخطط الفعالية من أول فكرة إلى آخر ضيف — اللوجستيات والقاعات وسير الحدث."),

    member(10, "events",
      "Sample Member 10", "عضو تجريبي 10",
      "Coordinates speakers, judges and volunteers on the day of the event.",
      "ينسّق المتحدثين والحكام والمعينين يوم الفعالية."),

    member(11, "content-head",
      "Sample Member 11", "عضو تجريبي 11",
      "Sets the editorial direction and reviews everything the team publishes.",
      "يحدد الاتجاه التحريري ويراجع كل ما ينشره الفريق."),

    member(12, "content",
      "Sample Member 12", "عضو تجريبي 12",
      "Writes articles, announcements and recaps after each activity.",
      "يكتب المقالات والإعلانات وملخصات كل نشاط."),

    member(13, "content",
      "Sample Member 13", "عضو تجريبي 13",
      "Edits technical explainers and keeps our documentation readable.",
      "يحرر الشرحات التقنية ويحافظ على وثائق الفريق واضحة ومقروءة."),

    member(14, "visual",
      "Sample Member 14", "عضو تجريبي 14",
      "Shoots photos, edits short videos and produces the recap reels.",
      "يلتقط الصور ويقطع الفيديوهات القصيرة وينتج فيلمات الملخص."),

    member(15, "technical",
      "Sample Member 15", "عضو تجريبي 15",
      "Keeps the website, bots and internal tooling running for the whole team.",
      "يعتبر من موقع الويب والأدوات الداخلية العاملة للفريق."),

    member(16, "technical",
      "Sample Member 16", "عضو تجريبي 16",
      "Runs the contest environment, reviews submissions and supports workshop labs.",
      "يشغل بيئة المسابقات ويراجع الحلول ويدعم معامل الورش."),
  ];

  /* Position order used for hierarchy-aware rendering. */
  window.IP_ROLE_ORDER = [
    "president",
    "vice-president",
    "technical",
    "events",
    "design",
    "content-head",
    "content",
    "visual",
    "social-media",
    "hr",
    "funding",
  ];
})();
