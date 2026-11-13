/* ==========================================================================
   IP TEAM — data/achievements.js
   Sample awards, events, competition entries and milestones.
   ALL CONTENT BELOW IS SAMPLE DATA — replace it with verified results.
   ---------------------------------------------------------------------------
   category : "award" | "event" | "competition" | "milestone"
   ========================================================================== */
(function () {
  "use strict";

  var PH = "assets/images/placeholders/";

  window.IP_ACHIEVEMENT_CATEGORIES = ["award", "event", "competition", "milestone"];

  window.IP_ACHIEVEMENTS = [
    {
      id: "first-hackathon-entry",
      category: "competition",
      date: "2026-10-04",
      image: PH + "ph-achievement-01.svg",
      title: { en: "First inter-university hackathon entry", ar: "أول مشاركة في هاكاثون بين الجامعات" },
      summary: {
        en: "A four-student team represented IP TEAM at a regional hackathon and reached the final demo round.",
        ar: "مثّل فريق من أربعة طلاب فريق IP في هاكاثون إقليمي ووصل إلى جولة العرض النهائي.",
      },
      details: {
        en: "Our first external competition entry. The team prepared for three weeks, built a prototype around campus navigation, and made it through to the final demo. The jury highlighted the clarity of the presentation. Sample content — replace with your verified result.",
        ar: "أول مشاركة خارجية لنا. استعد الفريق لثلاثة أسابيع وبنى نموذجاً حول التنقل داخل الحرم ووصل إلى العرض النهائي. أشادت اللجنة بوضوح العرض. محتوى تجريبي — استبدلها بنتيجتكم الموثقة.",
      },
      sampleData: true,
    },

    {
      id: "code-sprint-edition-1",
      category: "event",
      date: "2026-09-27",
      image: PH + "ph-achievement-02.svg",
      title: { en: "First edition of our contest series", ar: "النسخة الأولى من سلسلة مسابقاتنا" },
      summary: {
        en: "Ninety students registered for our first open programming contest of the academic year.",
        ar: "سجّل تسعون طالباً في أول مسابقة برمجة مفتوحة لنا هذا العام الأكاديمي.",
      },
      details: {
        en: "We ran the contest with automatic judging, a frozen leaderboard in the final twenty minutes, and a full problem set published afterwards. Attendance exceeded our planning estimate by a wide margin. Sample data.",
        ar: "أجرينا المسابقة بتصحيح آلي ولوحة نتائج مجمّدة في آخر عشرين دقيقة وملف مسائل منشور بعدها. تجاوز الحضور تقديرات تخطيطنا بفارق كبير. بيانات تجريبية.",
      },
      sampleData: true,
    },

    {
      id: "workshop-series-milestone",
      category: "milestone",
      date: "2026-11-01",
      image: PH + "ph-achievement-03.svg",
      title: { en: "Workshop series crossed its first milestone", ar: "سلسلة الورش تجاوزت أول محطة لها" },
      summary: {
        en: "Our recurring workshop format reached its first planned milestone for the semester.",
        ar: "بلغت صيغة الورش المتكررة لدينا أول محطة مخططة لها هذا الفصل.",
      },
      details: {
        en: "Consistent timing, shared notes and a single registration flow made the workshops easier to run each time. The format is documented so future teams can repeat it. Sample metric — replace with your real figure.",
        ar: "جعلت المواعيد الثابتة والملاحظات المشتركة ومسار تسجيل واحد تشغيل الورش أسهل في كل مرة. وثّقنا الصيغة حتى تستطيع الفرق القادمة تكرارها. مقياس تجريبي — استبدله برقمكم الحقيقي.",
      },
      sampleData: true,
    },

    {
      id: "design-award-mention",
      category: "award",
      date: "2026-06-15",
      image: PH + "ph-achievement-04.svg",
      title: { en: "Design team received a faculty mention", ar: "فريق التصميم حصل على تكريم من الكلية" },
      summary: {
        en: "The design team was recognised for the visual identity used across campus activities.",
        ar: "حصل فريق التصميم على تقدير على الهوية البصرية المستخدمة في أنشطة الحرم.",
      },
      details: {
        en: "A mention from the faculty for the consistent poster and slide system the team produced over the year. Sample content — do not publish unverified awards.",
        ar: "تكريم من الكلية على نظام البوسترات والشرائح المتجانس الذي أنتجه الفريق طوال العام. محتوى تجريبي — لا تنشر جوائز غير موثقة.",
      },
      sampleData: true,
    },

    {
      id: "open-source-release",
      category: "milestone",
      date: "2026-08-20",
      image: PH + "ph-achievement-05.svg",
      title: { en: "Released our first open-source tool", ar: "إطلاق أول أداة مفتوحة المصدر لنا" },
      summary: {
        en: "A small utility built by the technical team was published publicly for other students to use.",
        ar: "أداة صغيرة بناها الفريق التقني ونُشرت علناً لاستخدام الطلاب الآخرين.",
      },
      details: {
        en: "The tool started as an internal script for managing contest submissions and was cleaned up, documented and released. Contributions from other students are welcome. Sample content.",
        ar: "بدأت الأداة كسكربت داخلي لإدارة حلول المسابقات ثم نُظّف ووُثّق ونُشر. نرحّب بمساهمات الطلاب الآخرين. محتوى تجريبي.",
      },
      sampleData: true,
    },

    {
      id: "community-partnership",
      category: "event",
      date: "2026-05-12",
      image: PH + "ph-achievement-06.svg",
      title: { en: "Joint session with a student club", ar: "جلسة مشتركة مع نادٍ طلابي" },
      summary: {
        en: "We co-hosted an evening session on version control with another student organisation.",
        ar: "استضفنا معاً جلسة مسائية حول التحكم بالإصدارات مع منظمة طلابية أخرى.",
      },
      details: {
        en: "A shared session that introduced git basics to students from both groups, followed by a hands-on exercise. Sample event record.",
        ar: "جلسة مشتركة قدمت أساسيات git لطلاب المجموعتين متبوعة بتمرين عملي. سجل فعالية تجريبي.",
      },
      sampleData: true,
    },

    {
      id: "campus-tech-day-2025",
      category: "event",
      date: "2025-12-20",
      image: PH + "ph-achievement-07.svg",
      title: { en: "First Campus Tech Day organised", ar: "تنظيم أول يوم تقني بالحرم" },
      summary: {
        en: "Our inaugural open day brought student projects, talks and mini contests to the central plaza.",
        ar: "أول يوم مفتوح لنا جمع مشاريع الطلاب ومحاضرات ومسابقات صغيرة في الساحة المركزية.",
      },
      details: {
        en: "The first edition ran on a single day with volunteer staff from every department of the team. It has since become a recurring item on our calendar. Sample record.",
        ar: "انعقدت النسخة الأولى في يوم واحد بمعونين من كل أقسام الفريق. وأصبحت منذ ذلك الحين بندًا متكرراً في جدولنا. سجل تجريبي.",
      },
      sampleData: true,
    },

    {
      id: "new-member-cohort",
      category: "milestone",
      date: "2026-10-10",
      image: PH + "ph-achievement-08.svg",
      title: { en: "New member cohort welcomed", ar: "استقبال دفعة جديدة من الأعضاء" },
      summary: {
        en: "A new intake completed onboarding and was paired with mentors across all departments.",
        ar: "أتمّت دفعة جديدة إجراءات الانضمام ووُزّعت على مشرفين في كل الأقسام.",
      },
      details: {
        en: "Every new member received an introduction session, a department placement and a named mentor for the first month. Sample figure — replace with the real number.",
        ar: "حصل كل عضو جديد على جلسة تمهيد ومكان في قسم ومرشد محدد لأول شهر. رقم تجريبي — استبدله بالرقم الحقيقي.",
      },
      sampleData: true,
    },
  ];
})();
