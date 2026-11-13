/* ==========================================================================
   IP TEAM — data/config.js
   Site-wide configuration, contact details, statistics and gallery.
   ---------------------------------------------------------------------------
   EVERY VALUE BELOW IS SAMPLE DATA. Replace the `value` fields with your
   real, official information before publishing. Nothing here is fetched
   from a server — this file is the single source of truth for site config.
   ========================================================================== */
(function () {
  "use strict";

  window.IP_CONFIG = {
    brand: {
      name: { en: "IP TEAM", ar: "فريق IP" },
      fullName: { en: "Innovation Pioneers Team", ar: "فريق رواد الابتكار" },
      tagline: {
        en: "A university student team for computer science, programming and technology.",
        ar: "فريق طلابي جامعي متخصص في علوم الحاسوب والبرمجة والتكنولوجيا.",
      },
      logo: "assets/images/logo.jpeg",
      /* The brief specifies assets/images/logo.png — the provided file is .jpeg.
         If you receive a .png, drop it at assets/images/logo.png and update this. */
      logoAlt: {
        en: "IP TEAM — Innovation Pioneers Team official logo",
        ar: "فريق IP — الشعار الرسمي لفريق رواد الابتكار",
      },
      year: 2026,
    },

    /* ---------------- Contact ---------------- */
    contact: {
      email: {
        label: { en: "Email", ar: "البريد الإلكتروني" },
        value: "your-team@example.com",
        sample: true,
      },
      location: {
        label: { en: "Campus", ar: "الحرم الجامعي" },
        value: {
          en: "University Campus — Faculty of Computer Science (sample)",
          ar: "الحرم الجامعي — كلية علوم الحاسوب (بيانات تجريبية)",
        },
        sample: true,
      },
      meeting: {
        label: { en: "Team meetings", ar: "اجتماعات الفريق" },
        value: {
          en: "Weekly, sample schedule — replace with your real slot",
          ar: "أسبوعياً — جدول تجريبي، استبدله بموعدكم الحقيقي",
        },
        sample: true,
      },
      /* Set to a real number to show a phone entry, or leave null to hide it. */
      phone: null,
    },

    /* ---------------- Social links ----------------
       `url: null` means "not configured yet". Unconfigured links render as a
       button that explains where to add the real URL — never a dead <a href>. */
    socials: [
      { id: "instagram", name: "Instagram", url: null },
      { id: "facebook", name: "Facebook", url: null },
      { id: "x", name: "X", url: null },
      { id: "linkedin", name: "LinkedIn", url: null },
      { id: "github", name: "GitHub", url: null },
      { id: "youtube", name: "YouTube", url: null },
      { id: "discord", name: "Discord", url: null },
    ],

    /* ---------------- Statistics (all sample) ---------------- */
    stats: [
      { id: "members", value: 25, suffix: "+", sample: true, label: { en: "Active members", ar: "عضو نشط" } },
      { id: "events", value: 12, suffix: "+", sample: true, label: { en: "Events organised", ar: "فعالية منظمة" } },
      { id: "workshops", value: 8, suffix: "+", sample: true, label: { en: "Workshops held", ar: "ورشة تدريبية" } },
      { id: "awards", value: 5, suffix: "+", sample: true, label: { en: "Awards & milestones", ar: "إنجاز وتقدير" } },
    ],

    /* ---------------- Photo gallery (all sample) ---------------- */
    gallery: [
      { id: "g1", img: "assets/images/placeholders/ph-gallery-01.svg", span: "big", caption: { en: "Team work session (sample photo)", ar: "جلسة عمل الفريق (صورة تجريبية)" } },
      { id: "g2", img: "assets/images/placeholders/ph-gallery-02.svg", span: "", caption: { en: "Coding competition (sample photo)", ar: "مسابقة برمجة (صورة تجريبية)" } },
      { id: "g3", img: "assets/images/placeholders/ph-gallery-03.svg", span: "tall", caption: { en: "Workshop in progress (sample photo)", ar: "ورشة عمل جارية (صورة تجريبية)" } },
      { id: "g4", img: "assets/images/placeholders/ph-gallery-04.svg", span: "", caption: { en: "Design review (sample photo)", ar: "مراجعة تصميم (صورة تجريبية)" } },
      { id: "g5", img: "assets/images/placeholders/ph-gallery-05.svg", span: "", caption: { en: "Award ceremony (sample photo)", ar: "حفل تكريم (صورة تجريبية)" } },
      { id: "g6", img: "assets/images/placeholders/ph-gallery-06.svg", span: "wide", caption: { en: "Campus tech day (sample photo)", ar: "اليوم التقني بالحرم (صورة تجريبية)" } },
      { id: "g7", img: "assets/images/placeholders/ph-gallery-07.svg", span: "", caption: { en: "Team building (sample photo)", ar: "بناء الفريق (صورة تجريبية)" } },
      { id: "g8", img: "assets/images/placeholders/ph-gallery-08.svg", span: "", caption: { en: "Project demo day (sample photo)", ar: "يوم عرض المشاريع (صورة تجريبية)" } },
    ],

    /* ---------------- Hero keyword strip ---------------- */
    strip: [
      { en: "Code", ar: "برمج" },
      { en: "Innovate", ar: "ابتكر" },
      { en: "Compete", ar: "تنافس" },
      { en: "Collaborate", ar: "تعاون" },
      { en: "Learn", ar: "تعلّم" },
    ],

    /* ---------------- Hero floating chips ---------------- */
    heroChips: [
      { icon: "code", text: { en: "Coding Competitions", ar: "مسابقات البرمجة" } },
      { icon: "bulb", text: { en: "Innovation Labs", ar: "معمل الابتكار" } },
      { icon: "trophy", text: { en: "Workshops & Talks", ar: "وراش ومحاضرات" } },
    ],

    /* ---------------- Hero meta numbers (sample) ---------------- */
    heroMeta: [
      { value: { en: "Since 2024", ar: "منذ ٢٠٢٤" }, label: { en: "Student-led, campus based", ar: "فريق طلابي بالحرم الجامعي" }, sample: true },
      { value: { en: "CS + Tech", ar: "حاسوب وتقنية" }, label: { en: "Our core focus", ar: "تركيزنا الأساسي" }, sample: true },
      { value: { en: "Open to all", ar: "مفتوح للجميع" }, label: { en: "Students welcome", ar: "كل الطلاب مرحّب بهم" }, sample: true },
    ],

    /* ---------------- Home CTA ---------------- */
    cta: {
      title: {
        en: "Ready to build something worth remembering?",
        ar: "جاهز لبناء شيء يستحق أن يُذكر؟",
      },
      text: {
        en: "Join a workshop, enter a competition, or simply come and learn with us. Sample content — edit it in js/data/config.js.",
        ar: "انضم إلى ورشة، شارك في مسابقة، أو اجلب فقط لتتعلّم معنا. محتوى تجريبية — عدّلها من js/data/config.js.",
      },
    },
  };
})();
