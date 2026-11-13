/* ==========================================================================
   IP TEAM — data/events.js
   Sample events. Dates, venues, rules, capacities and results are SAMPLE
   DATA used to exercise the UI. Replace them with your real events.
   ---------------------------------------------------------------------------
   status            : "upcoming" | "ongoing" | "completed" | "closed"
   category          : "coding" | "workshop" | "tech" | "general"
   registrationMode  : "internal" | "external" | "none"
     - internal : renders the front-end demo form (no server involved)
     - external : opens `registrationUrl` in a new tab (null = not configured)
     - none     : no registration at all
   ========================================================================== */
(function () {
  "use strict";

  var PH = "assets/images/placeholders/";

  window.IP_EVENT_CATEGORIES = ["coding", "workshop", "tech", "general"];
  window.IP_EVENT_STATUSES = ["upcoming", "ongoing", "completed", "closed"];

  window.IP_EVENTS = [
    {
      id: "ip-code-sprint-2026",
      title: { en: "IP Code Sprint 2026", ar: "سباق البرمجة IP 2026" },
      category: "coding",
      status: "upcoming",
      date: "2026-12-05",
      dateEnd: null,
      time: "10:00 – 15:00",
      location: { en: "Main Computer Lab — sample venue", ar: "معمل الحاسوب الرئيسي — مكان تجريبي" },
      image: PH + "ph-event-01.svg",
      excerpt: {
        en: "A five-hour individual algorithm contest with live leaderboard, practice track and prizes for the top finishers.",
        ar: "مسابقة خوارزميات فردية لخمس ساعات بلوحة نتائج مباشرة ومسار تدريب وجوائز لأفضل المراكز.",
      },
      description: {
        en: "IP Code Sprint is our flagship competitive programming session. Participants work through a set of graded problems — from warm-up to hard — while mentors circulate to give hints on approach rather than on syntax. The event is designed for students who already know the basics of one language and want a structured first taste of contest-style problem solving. Bring your laptop, your charger and a valid student ID.",
        ar: "سباق البرمجة IP هو جلسة البرمجة التنافسية الرئيسية لدينا. يشارك الطلاب في مجموعة مسائل متدرجة — من الإحماء إلى الصعبة — بينما يتجول المشرعون لتقديم تلميحات حول الفكرة لا حول الصياغة. صُمّمت الفعالية لطلاب يعرفون أساسيات لغة برمجة واحدة ويريدون تجربة منظّمة أولى لحل مسائل المسابقات. أحضر حاسوبك وشاحنك وبطاقة الطالب.",
      },
      rules: {
        en: [
          "Individual participation — no team play in this round.",
          "Allowed languages: C++, Java, Python, JavaScript.",
          "Internet access and generative AI tools are not permitted during the contest.",
          "Problems are graded by test cases; partial solutions score partial marks.",
          "The organising committee may adjust time slots — check this page before the day.",
        ],
        ar: [
          "المشاركة فردية — لا اللعب الجماعي في هذه الجولة.",
          "اللغات المسموحة: C++ و Java و Python و JavaScript.",
          "لا يُسمح بالإنترنت أو بأدوات الذكاء الاصطناعي التوليدي أثناء المسابقة.",
          "تُقيَّم المسائل بحالات اختبار، والحلول الجزئية تحصل على درجات جزئية.",
          "يحق للجنة المنظمة تعديل الأوقات — راجع هذه الصفحة قبل يوم الفعالية.",
        ],
      },
      schedule: {
        en: [
          { time: "10:00", title: "Check-in & setup", desc: "Seat allocation and environment check." },
          { time: "10:30", title: "Rules briefing", desc: "Scoring, penalties and Q&A with the jury." },
          { time: "11:00", title: "Contest begins", desc: "Five hours of live problem solving." },
          { time: "15:00", title: "Results & closing", desc: "Leaderboard freeze, debrief and awards." },
        ],
        ar: [
          { time: "10:00", title: "التسجيل والتجهيز", desc: "توزيع المقاعد وفحص البيئة البرمجية." },
          { time: "10:30", title: "شرح القواعد", desc: "التصحيح والجزاءات وسؤال وجواب مع لجنة التحكيم." },
          { time: "11:00", title: "انطلاق المسابقة", desc: "خمس ساعات من حل المسائل مباشرة." },
          { time: "15:00", title: "النتائج والختام", desc: "تجميد النتائج ومناقشة وجوائز." },
        ],
      },
      registrationMode: "internal",
      registrationUrl: null,
      capacity: 60,
      registered: 34,
      deadline: "2026-11-28",
      sampleData: true,
    },

    {
      id: "front-end-bootcamp",
      title: { en: "Front-End Bootcamp", ar: "معسكر الواجهات الأمامية" },
      category: "workshop",
      status: "upcoming",
      date: "2026-11-21",
      dateEnd: null,
      time: "13:00 – 16:30",
      location: { en: "Innovation Hall — sample venue", ar: "قاعة الابتكار — مكان تجريبي" },
      image: PH + "ph-event-02.svg",
      excerpt: {
        en: "A hands-on three-hour workshop that takes you from an empty HTML file to a responsive, accessible page.",
        ar: "ورشة عملية لثلاث ساعات تأخذك من ملف HTML فارغ إلى صفحة متجاوبة وسهلة الوصول.",
      },
      description: {
        en: "We build a real page together, line by line: semantic HTML, modern CSS layout, and a little JavaScript for interaction. You will leave with a working project on your laptop and a checklist of habits that separate a tidy front-end from a messy one. No prior framework knowledge is required — only a browser and a text editor.",
        ar: "نبني معاً صفحة حقيقية سطراً بسطر: HTML دلالي، وتخطيط CSS حديث، وقليل من JavaScript للتفاعل. ستنطلق بمشروع يعمل على حاسوبك وبقائمة عادات تفصل الواجهة المرتبة عن الفوضوية. لا يُشترط معرفة أي إطار عمل — فقط متصفح ومحرر نصوص.",
      },
      rules: {
        en: [
          "Bring a laptop with a code editor installed.",
          "Beginners welcome — we start from the fundamentals.",
          "Seats are limited and allocated in registration order.",
          "Recording and notes are shared with registered participants.",
        ],
        ar: [
          "أحضر حاسوباً مثبتاً عليه محرر أكواد.",
          "المبتدئون مرحب بهم — نبدأ من الأساسيات.",
          "المقاعد محدودة وتُوزَّع حسب ترتيب التسجيل.",
          "يتم تسجيل الجلسة ومشاركة الملاحظات مع المسجّلين.",
        ],
      },
      schedule: {
        en: [
          { time: "13:00", title: "HTML foundations", desc: "Structure, semantics and accessibility basics." },
          { time: "14:00", title: "CSS layout", desc: "Flexbox, grid and responsive breakpoints." },
          { time: "15:15", title: "JavaScript touch", desc: "Events, the DOM and small interactions." },
          { time: "16:15", title: "Show & tell", desc: "Participants share what they built." },
        ],
        ar: [
          { time: "13:00", title: "أساسيات HTML", desc: "البنية والدلالة وأساسيات سهولة الوصول." },
          { time: "14:00", title: "تخطيط CSS", desc: "Flexbox و Grid ونقاط التوقف المتجاوبة." },
          { time: "15:15", title: "لمسة JavaScript", desc: "الأحداث و DOM والتفاعلات الصغيرة." },
          { time: "16:15", title: "عرض ومشاركة", desc: "يعرض المشاركون ما بنوه." },
        ],
      },
      registrationMode: "internal",
      registrationUrl: null,
      capacity: 40,
      registered: 40,
      deadline: "2026-11-18",
      sampleData: true,
    },

    {
      id: "overnight-hackathon",
      title: { en: "Overnight Hackathon", ar: "هاكاثون الليل" },
      category: "coding",
      status: "ongoing",
      date: "2026-11-13",
      dateEnd: "2026-11-14",
      time: "18:00 – 06:00",
      location: { en: "Innovation Hall & Lab 3 — sample venue", ar: "قاعة الابتكار والمعمل ٣ — مكان تجريبي" },
      image: PH + "ph-event-03.svg",
      excerpt: {
        en: "Twelve hours, one theme, teams of three. Mentors on site and breakfast at sunrise.",
        ar: "اثنتا عشرة ساعة، موضوع واحد، وفرق من ثلاثة. مشركون في الموقع وفطور مع الشروق.",
      },
      description: {
        en: "Teams pick a problem from the announced theme and ship a working prototype before sunrise. Judging weighs problem fit, technical execution, and the clarity of the final demo. This is a sample event — replace it with your real hackathon details.",
        ar: "تختار الفرق مشكلة من الموضوع المعلن وتبني نموذجاً عاملة قبل الشروق. يزن التحكيم ملاءمة المشكلة والتنفيذ التقني ووضوح العرض النهائي. هذه فعالية تجريبية — استبدلها بتفاصيل هاكاثونكم الحقيقية.",
      },
      rules: {
        en: [
          "Teams of two to four students.",
          "All code written during the event must be committed to your repository.",
          "Third-party libraries are allowed; pre-built full applications are not.",
          "Final demo is limited to three minutes.",
        ],
        ar: [
          "فرق من طالبين إلى أربعة.",
          "يجب رفع كل الكود المكتوب أثناء الفعالية إلى مستودع الفريق.",
          "يسمح بالمكتبات الخارجية، ولا يسمح بالتطبيقات الجاهزة مسبقاً.",
          "العرض النهائي محدود بثلاث دقائق.",
        ],
      },
      schedule: {
        en: [
          { time: "18:00", title: "Theme reveal", desc: "Problem statements released to all teams." },
          { time: "19:00", title: "Build block 1", desc: "Mentors rotate between tables." },
          { time: "01:00", title: "Midnight check", desc: "Progress review with the jury." },
          { time: "06:00", title: "Demos & judging", desc: "Three-minute pitch per team." },
        ],
        ar: [
          { time: "18:00", title: "إعلان الموضوع", desc: "إصدار نصوص المسائل لكل الفرق." },
          { time: "19:00", title: "جلسة بناء ١", desc: "يتجول المشرعون بين الطاولات." },
          { time: "01:00", title: "مراجعة منتصف الليل", desc: "مراجعة التقدم مع لجنة التحكيم." },
          { time: "06:00", title: "العروض والتحكيم", desc: "عرض من ثلاث دقائق لكل فريق." },
        ],
      },
      registrationMode: "internal",
      registrationUrl: null,
      capacity: 36,
      registered: 36,
      deadline: "2026-11-10",
      sampleData: true,
    },

    {
      id: "design-basics-for-devs",
      title: { en: "Design Basics for Developers", ar: "أساسيات التصميم للمبرمجين" },
      category: "workshop",
      status: "closed",
      date: "2026-11-27",
      dateEnd: null,
      time: "14:00 – 16:00",
      location: { en: "Design Studio — sample venue", ar: "استوديو التصميم — مكان تجريبي" },
      image: PH + "ph-event-04.svg",
      excerpt: {
        en: "Spacing, type scale, colour and layout — the small rules that make an interface feel intentional.",
        ar: "المسافات وسلّم الخطوط والألوان والتخطيط — القواعد الصغيرة التي تجعل الواجهة تبدو مقصودة.",
      },
      description: {
        en: "A short, opinionated session for engineers who want their interfaces to stop looking accidental. We work on spacing systems, readable type, restrained colour, and knowing when a layout is finished. Registration for this edition is closed while we confirm a larger room.",
        ar: "جلسة قصيرة وواضحة للمهندسين الذين يريدون أن تبدو واجهاتهم غير عشوائية. نعمل على أنظمة المسافات وخطوط واضحة وألوان مقتضبة ومتى يكتمل التخطيط. التسجيل لهذه الدورة مغلق بينما نؤكد قاعة أكبر.",
      },
      rules: {
        en: [
          "Open to all members regardless of experience.",
          "Bring a project you are unhappy with — we will critique it together.",
          "Registration for this edition is closed.",
        ],
        ar: [
          "متاح لجميع الأعضاء بغض النظر عن الخبرة.",
          "أحضر مشروعاً غير راضٍ عنه — سنناقشه معاً.",
          "التسجيل لهذه الدورة مغلق.",
        ],
      },
      schedule: {
        en: [
          { time: "14:00", title: "Spacing systems", desc: "Building a scale you actually reuse." },
          { time: "14:40", title: "Type that reads", desc: "Hierarchy, measure and line height." },
          { time: "15:20", title: "Colour restraint", desc: "Fewer colours, better decisions." },
        ],
        ar: [
          { time: "14:00", title: "أنظمة المسافات", desc: "بناء سلّم تعيد استخدامه فعلاً." },
          { time: "14:40", title: "خطوط تُقرأ", desc: "التسلسل الهرمي وعرض السطر وارتفاعه." },
          { time: "15:20", title: "ضبط الألوان", desc: "ألوان أقل وقرارات أفضل." },
        ],
      },
      registrationMode: "external",
      registrationUrl: null,
      capacity: 30,
      registered: 30,
      deadline: "2026-11-22",
      sampleData: true,
    },

    {
      id: "campus-tech-day",
      title: { en: "Campus Tech Day", ar: "اليوم التقني بالحرم" },
      category: "general",
      status: "upcoming",
      date: "2026-12-19",
      dateEnd: null,
      time: "09:00 – 17:00",
      location: { en: "University Central Plaza — sample venue", ar: "الساحة المركزية بالجامعة — مكان تجريبي" },
      image: PH + "ph-event-05.svg",
      excerpt: {
        en: "Our open day: project booths, short talks, mini contests and a place for the whole campus to stop by.",
        ar: "يومنا المفتوح: أركان مشاريع ومحاضرات قصيرة ومسابقات صغيرة ومكان للحرم كله يمرّ فيه.",
      },
      description: {
        en: "Campus Tech Day brings every part of the university together around technology. Student teams show what they built, companies and clubs run short sessions, and visitors can try a mini contest with no experience required. This entry is sample content — edit it in js/data/events.js.",
        ar: "يجمع اليوم التقني بالحرم كل أجزاء الجامعة حول التكنولوجيا. تعرض فرق الطلاب ما بنته، وتجري أندية وشركات جلسات قصيرة، ويمكن للزوار تجربة مسابقة صغيرة دون خبرة. هذا المحتوى تجريبي — عدّله من js/data/events.js.",
      },
      rules: {
        en: [
          "Free entry for all students and staff.",
          "Booth registration closes two weeks before the date.",
          "Photography is allowed in designated areas only.",
        ],
        ar: [
          "الدخول مجاني لجميع الطلاب والإدارة.",
          "تسجيل الأركان يغلق قبل الموعد بأسابيع.",
          "التصوير مسموح في المناطق المخصصة فقط.",
        ],
      },
      schedule: {
        en: [
          { time: "09:00", title: "Doors open", desc: "Booths and registration desks open." },
          { time: "11:00", title: "Talks block A", desc: "Three twenty-minute sessions." },
          { time: "14:00", title: "Mini contests", desc: "Open-access challenges with small prizes." },
          { time: "16:30", title: "Closing", desc: "Thanks, photos and next edition preview." },
        ],
        ar: [
          { time: "09:00", title: "فتح الأبواب", desc: "تشغيل الأركان وطاولات التسجيل." },
          { time: "11:00", title: "كتلة المحاضرات أ", desc: "ثلاث جلسات مدتها عشرون دقيقة." },
          { time: "14:00", title: "مسابقات صغيرة", desc: "تحديات مفتوحة بجوائز صغيرة." },
          { time: "16:30", title: "الختام", desc: "شكر وصور ومعاينة للنسخة القادمة." },
        ],
      },
      registrationMode: "external",
      registrationUrl: null,
      capacity: null,
      registered: null,
      deadline: "2026-12-05",
      sampleData: true,
    },

    {
      id: "intro-to-ai",
      title: { en: "Introduction to Artificial Intelligence", ar: "مقدمة في الذكاء الاصطناعي" },
      category: "tech",
      status: "completed",
      date: "2026-10-18",
      dateEnd: null,
      time: "11:00 – 13:00",
      location: { en: "Lecture Hall B — sample venue", ar: "قاعة المحاضرات ب — مكان تجريبي" },
      image: PH + "ph-event-06.svg",
      excerpt: {
        en: "A friendly overview of what modern AI can and cannot do, with a live demo you can follow along.",
        ar: "نظرة ودّية على ما يستطيع الذكاء الاصطناعي الحديث فعله وما لا يستطيعه، مع عرض مباشر يمكنك متابعته.",
      },
      description: {
        en: "We walked through the vocabulary of machine learning, looked at real examples from medicine and transport, and finished with a small demo built in front of the audience. This session has already taken place — registration is closed and the notes are with the content team.",
        ar: "مررنا بمفردات تعلّم الآلة، ونظرنا إلى أمثلة حقيقية من الطب والنقل، وانتهينا بعرض مباشر بُني أمام الحضور. انعقدت هذه الجلسة بالفعل — التسجيل مغلق والملاحظات لدى فريق المحتوى.",
      },
      rules: {
        en: ["No prerequisites.", "Session notes are shared after the event.", "Recording availability depends on speaker consent."],
        ar: ["لا توجد متطلبات سابقة.", "تُشارك ملاحظات الجلسة بعد الفعالية.", "توافر التسجيل يعتمد على موافقة المتحدث."],
      },
      schedule: {
        en: [
          { time: "11:00", title: "What is ML?", desc: "Types of learning, explained without maths." },
          { time: "11:45", title: "Real applications", desc: "Case studies from health and transport." },
          { time: "12:30", title: "Live demo", desc: "A model trained in front of the room." },
        ],
        ar: [
          { time: "11:00", title: "ما هو تعلّم الآلة؟", desc: "أنواع التعلّم مشروحة بلا رياضيات." },
          { time: "11:45", title: "تطبيقات حقيقية", desc: "دراسات حالة من الصحة والنقل." },
          { time: "12:30", title: "عرض مباشر", desc: "تدريب نموذج أمام الحضور." },
        ],
      },
      registrationMode: "none",
      registrationUrl: null,
      capacity: 120,
      registered: 112,
      deadline: null,
      sampleData: true,
    },

    {
      id: "algorithms-winter-contest",
      title: { en: "Algorithms Winter Contest", ar: "مسابقة الخوارزميات الشتوية" },
      category: "coding",
      status: "completed",
      date: "2026-09-27",
      dateEnd: null,
      time: "10:00 – 13:00",
      location: { en: "Main Computer Lab — sample venue", ar: "معمل الحاسوب الرئيسي — مكان تجريبي" },
      image: PH + "ph-event-07.svg",
      excerpt: {
        en: "Six problems, three hours, ninety contestants — and a leaderboard that changed in the final minutes.",
        ar: "ست مسائل وثلاث ساعات وتسعون متسابقاً — ولوحة نتائج تغيّرت في الدقائق الأخيرة.",
      },
      description: {
        en: "Our largest contest of the semester ran smoothly thanks to the technical and event teams. Ninety students registered, eighty-four started, and every submission was judged automatically. Final standings and the problem set are archived with the content team.",
        ar: "أكبر مسابقة هذا الفصل ان سارت بسلاسة بفضل الفريق التقني وفريق الفعاليات. سجّل تسعون طالباً وأربعون وثمانون بدأوا، وحُكم على كل حل آلياً. النتائج النهائية وملف المسائل مؤرشف لدى فريق المحتوى.",
      },
      rules: {
        en: ["Team size: one.", "Automatic judging.", "Penalty of ten minutes per wrong submission."],
        ar: ["حجم الفريق: فرد واحد.", "تصحيح آلي.", "جزاء عشر دقائق لكل حل خاطئ."],
      },
      schedule: {
        en: [
          { time: "10:00", title: "Start", desc: "Contest opens for all contestants." },
          { time: "12:40", title: "Freeze", desc: "Leaderboard frozen for the last twenty minutes." },
          { time: "13:00", title: "Results", desc: "Final standings published." },
        ],
        ar: [
          { time: "10:00", title: "البداية", desc: "فتح المسابقة لجميع المتسابقين." },
          { time: "12:40", title: "التجميد", desc: "تجميد النتائج في آخر عشرين دقيقة." },
          { time: "13:00", title: "النتائج", desc: "نشر الترتيب النهائي." },
        ],
      },
      registrationMode: "internal",
      registrationUrl: null,
      capacity: 100,
      registered: 90,
      deadline: "2026-09-24",
      sampleData: true,
    },

    {
      id: "women-in-tech-talk",
      title: { en: "Women in Tech — Guest Talk", ar: "سيدات التقنية — محاضرة ضيفة" },
      category: "tech",
      status: "upcoming",
      date: "2026-12-12",
      dateEnd: null,
      time: "17:00 – 18:30",
      location: { en: "Main Auditorium — sample venue", ar: "المدرج الرئيسي — مكان تجريبي" },
      image: PH + "ph-event-08.svg",
      excerpt: {
        en: "An open conversation about careers in technology, with time for honest questions from the audience.",
        ar: "حوار مفتوح عن مهن التقنية، مع وقت للأسئلة الصريحة من الحضور.",
      },
      description: {
        en: "A guest speaker shares a real career path — the detours included — and then takes questions. No registration is needed: walk in, sit anywhere, and stay for as long as you like. Speaker details will be published here once confirmed.",
        ar: "تشاركنا محاضرة ضيفة مساراً حقيقياً في المهنة — بما فيه المنعطفات — ثم تستقبل الأسئلة. لا حاجة للتسجيل: ادخل واجلس حيث تشاء وابقَ كما تحب. تُنشر تفاصيل المتحدث هنا فور تأكيدها.",
      },
      rules: {
        en: ["Open to everyone on campus.", "No registration required.", "Questions are taken from the floor."],
        ar: ["مفتوح للجميع في الحرم.", "لا يتطلب تسجيلاً.", "تُطرح الأسئلة من القاعة."],
      },
      schedule: {
        en: [
          { time: "17:00", title: "Welcome", desc: "Short introduction by the team." },
          { time: "17:10", title: "Guest talk", desc: "Forty minutes of real-world experience." },
          { time: "17:50", title: "Q&A", desc: "Open floor until half past eight." },
        ],
        ar: [
          { time: "17:00", title: "الترحيب", desc: "تقديم قصير من الفريق." },
          { time: "17:10", title: "كلمة الضيفة", desc: "أربعون دقيقة من الخبرة الواقعية." },
          { time: "17:50", title: "أسئلة", desc: "حوار مفتوح حتى الثامنة والنصف." },
        ],
      },
      registrationMode: "none",
      registrationUrl: null,
      capacity: null,
      registered: null,
      deadline: null,
      sampleData: true,
    },

    {
      id: "team-building-day",
      title: { en: "Team Building Day", ar: "يوم بناء الفريق" },
      category: "general",
      status: "completed",
      date: "2026-11-08",
      dateEnd: null,
      time: "12:00 – 17:00",
      location: { en: "Campus Courtyard — sample venue", ar: "فناء الحرم — مكان تجريبي" },
      image: PH + "ph-event-09.svg",
      excerpt: {
        en: "Games, workshops and a lot of whiteboards — a day to reset before the contest season.",
        ar: "ألعاب وورش وكمية كبيرة من السبورات — يوم لإعادة الضبط قبل موسم المسابقات.",
      },
      description: {
        en: "The whole team met off the usual schedule for an afternoon of problem-solving games, a retrospective on last semester, and planning for the year ahead. New members were paired with mentors from every department.",
        ar: "اجتمع الفريق بأكمله خارج الجدول المعتاد لبعد ظهر من ألعاب حل المشكلات ومراجعة للفصل الماضي وتخطيط للعام القادم. وقُسّم الأعضاء الجدد على مشرفين من كل أقسام.",
      },
      rules: {
        en: ["Attendance is optional but strongly encouraged.", "Comfortable clothes recommended."],
        ar: ["الحضور اختياري لكنه مُشجَّع عليه.", "يُنصح بملابس مريحة."],
      },
      schedule: {
        en: [
          { time: "12:00", title: "Icebreakers", desc: "Mixed groups across departments." },
          { time: "14:00", title: "Retrospective", desc: "What worked last semester, what did not." },
          { time: "16:00", title: "Planning", desc: "Draft roadmap for the coming months." },
        ],
        ar: [
          { time: "12:00", title: "كسر الجمود", desc: "مجموعات مختلطة عبر الأقسام." },
          { time: "14:00", title: "المراجعة", desc: "ما نجح العام الماضي وما لم ينجح." },
          { time: "16:00", title: "التخطيط", desc: "مسودة خارطة طريق للأشهر القادمة." },
        ],
      },
      registrationMode: "internal",
      registrationUrl: null,
      capacity: 30,
      registered: 27,
      deadline: "2026-11-05",
      sampleData: true,
    },
  ];
})();
