/** New portal pages. English defines the shape; Arabic must match it. */
export const portalEn = {
  platform: {
    seoTitle: "AI Call Center Platform",
    seoDescription:
      "ZillionxAI AI Call Center answers inbound calls, runs outbound campaigns, books appointments, and hands over to your team with the full context.",
    hero: {
      badge: "AI Call Center is live 24/7",
      title: "Every call answered.",
      accent: "Every lead followed up.",
      body: "Alexi's AI Call Center picks up inbound calls, makes outbound ones, books appointments and updates your CRM. When a caller needs a person, it hands over with the full context.",
      primary: "Book a Demo",
      secondary: "Talk to Alexi",
      points: ["No hold music", "Human handoff built in", "Live in days, not months"],
    },
    sample: {
      label: "Inbound · Dental clinic",
      live: "Live call",
      lines: [
        { who: "Caller", text: "Hi, I need to move my cleaning to Thursday afternoon." },
        { who: "Alexi", text: "Of course, Sara. I can offer 2:30 or 4:15 on Thursday. Which suits you?" },
        { who: "Caller", text: "2:30 works." },
        { who: "Alexi", text: "Done. You're booked for Thursday at 2:30, and a text confirmation is on its way." },
      ],
      result: "Appointment moved · Calendar and CRM updated",
    },
    chips: ["Inbound calls", "Outbound campaigns", "Appointment booking", "Lead qualification", "Live human handoff"],
    coverage: {
      title: "One AI Call Center. Every conversation covered.",
      body: "Replace missed calls, voicemail and hold queues with an AI Call Center that talks like your best team member and works every hour of the day.",
      cards: [
        {
          title: "Inbound call handling",
          body: "Alexi answers on the first ring, understands why the person is calling, and resolves it or routes it. Questions, bookings, order status and after-hours coverage are handled without a queue.",
          points: ["Answers instantly, at any volume", "Remembers context within the call", "Never puts anyone on hold"],
        },
        {
          title: "Outbound campaigns",
          body: "Follow up new leads, confirm appointments, chase renewals and collect feedback, all in a natural voice and on your schedule.",
          points: ["Lead follow-up", "Appointment and order confirmations", "Renewals and feedback"],
        },
        {
          title: "Smart routing",
          body: "Send each caller to the right team, using intent, urgency and the customer's history.",
          points: ["Intent and urgency", "Customer history", "The right team first"],
        },
        {
          title: "Warm human handoff",
          body: "When it's time for a person, your agent gets a summary and the transcript before they say hello.",
          points: ["Summary before hello", "Full transcript", "Caller never repeats themselves"],
        },
        {
          title: "Multilingual by default",
          body: "Serve callers in their own language, with the same knowledge and tone in each.",
          points: ["Multiple languages", "Same knowledge", "One brand tone"],
        },
        {
          title: "Call intelligence",
          body: "Transcripts, summaries, outcomes and sentiment for every call, ready to review or export.",
          points: ["Transcripts and summaries", "Outcomes and sentiment", "Export to your tools"],
        },
      ],
    },
    tabsIntro: {
      title: "The full platform behind your AI Call Center",
      body: "Everything you need to build, run and improve your calls, in one place.",
    },
    tabs: [
      {
        id: "knowledge",
        label: "Knowledge base",
        title: "Give Alexi your business knowledge",
        body: "Upload the documents your team already uses. Alexi answers from them, in your words, and only says what your material supports.",
        points: ["PDF, Word and text uploads", "Answers grounded in your policies", "Update once, live on the next call"],
        sampleTitle: "Sample view",
        sample: ["Service guide.pdf — Indexed, ready", "Cancellation policy.docx — Indexed, ready", "Opening hours.txt — Indexed, ready"],
      },
      {
        id: "builder",
        label: "Agent builder",
        title: "Build a call agent in minutes",
        body: "Describe the job, set the tone and add escalation rules. Already have call scripts or recordings? Turn them into an agent instead of starting from scratch.",
        points: ["Goals, greeting and tone controls", "Import existing scripts", "Test calls before anything goes live"],
        sampleTitle: "Sample view",
        sample: ["Greeting — Warm, brief", "Goal — Book appointment", "Escalate when — Caller asks for a person"],
      },
      {
        id: "voice",
        label: "Voice studio",
        title: "A voice that sounds like your brand",
        body: "Pick a natural voice, set the language and speaking pace, and keep every call consistent across teams and campaigns.",
        points: ["Natural, expressive voices", "Multiple languages", "One brand voice on every line"],
        sampleTitle: "Sample view",
        sample: ["Amira — Arabic, calm", "Noah — English, friendly", "Lucía — Spanish, upbeat"],
      },
      {
        id: "campaigns",
        label: "Campaigns",
        title: "Run outbound calls at scale",
        body: "Upload a list, choose a script and schedule. Alexi calls, records the outcome and retries when nobody picks up.",
        points: ["Order and appointment confirmations", "Lead follow-up and reminders", "Retry and calling-hour rules"],
        sampleTitle: "Sample view",
        sample: ["Order confirmations", "Lead follow-up", "Renewal reminders"],
      },
      {
        id: "monitoring",
        label: "Live monitoring",
        title: "Watch calls as they happen",
        body: "See active calls and transcripts in real time, then step in with one click when a conversation needs a person.",
        points: ["Real-time transcripts", "One-click takeover", "Warm transfer with a summary"],
        sampleTitle: "Sample view",
        sample: ["Booking · 01:12 — In progress", "Support · 00:46 — In progress", "Sales · 02:05 — Transferred"],
      },
      {
        id: "analytics",
        label: "Analytics",
        title: "Know what every call achieved",
        body: "Every call gets a transcript, summary, outcome and sentiment. Spot patterns, fix gaps in your knowledge and prove the value.",
        points: ["Outcomes and call summaries", "Sentiment and topic trends", "Export to your reporting tools"],
        sampleTitle: "Sample view",
        sample: ["Resolved by Alexi", "Booked", "Handed to team"],
      },
    ],
    steps: {
      title: "Live in three steps",
      body: "Our team sets up and tunes your AI Call Center with you, so you're taking real calls quickly.",
      items: [
        {
          title: "Teach Alexi your business",
          body: "Share your services, policies, FAQs and call scripts. Alexi learns your tone and the answers your callers need.",
        },
        {
          title: "Connect your tools",
          body: "Link your phone numbers, calendar and CRM so Alexi can book, look up and update records during the call.",
        },
        {
          title: "Go live and improve",
          body: "Start with a pilot line, review real conversations, then scale to every call as your confidence grows.",
        },
      ],
    },
    useCases: {
      title: "Built for teams that live on the phone",
      body: "Start with the conversations your team already handles every day.",
      items: [
        { title: "Healthcare and clinics", body: "Booking, reminders, rescheduling and after-hours triage handoff." },
        { title: "Real estate", body: "Qualify inquiries, schedule viewings and follow up on every lead." },
        { title: "Home services", body: "Capture jobs, dispatch requests and quote callbacks around the clock." },
        { title: "Retail and hospitality", body: "Reservations, order questions and store information without the queue." },
        { title: "Financial services", body: "Appointment setting, payment reminders and secure call routing." },
        { title: "Education", body: "Admissions questions, campus tours and enrollment follow-up." },
        { title: "Logistics", body: "Delivery status, rescheduling and driver-to-customer coordination." },
        { title: "Support desks", body: "Tier-one resolution, with complex cases passed on with full context." },
      ],
    },
    cases: {
      title: "Where teams start with Alexi",
      body: "Three common first projects. Most teams begin with one line or campaign, then expand.",
      items: [
        {
          title: "Order confirmation calls",
          body: "Alexi calls each customer to confirm details and delivery windows, logs the result in your order system and flags problems for your team.",
        },
        {
          title: "Instant lead follow-up",
          body: "New enquiry comes in, Alexi calls within moments, qualifies the lead and books time with the right salesperson.",
        },
        {
          title: "After-hours reception",
          body: "Nights, weekends and holidays are covered. Callers get answers or bookings, and urgent cases reach your on-call team.",
        },
      ],
    },
    integrations: {
      title: "Fits the stack you already run",
      body: "Alexi connects to your phone system, calendar and CRM, so every call ends with the right record updated and nothing to re-key.",
      cta: "Book a Demo",
      items: ["Phone and SIP lines", "Google Calendar", "Outlook", "Salesforce", "HubSpot", "Zoho", "Slack", "SMS and WhatsApp", "Webhooks and API"],
    },
    faq: {
      title: "Questions, answered",
      items: [
        {
          q: "What is Alexi's AI Call Center?",
          a: "It's a phone service run by AI that answers inbound calls, makes outbound calls, books appointments, qualifies leads and updates your systems, and passes callers to your team whenever they need a person.",
        },
        {
          q: "Will callers know they're speaking to AI?",
          a: "Alexi sounds natural and conversational, and we recommend being open with callers that they're speaking with an AI assistant. You control the greeting and how it introduces itself.",
        },
        {
          q: "What happens when Alexi can't help?",
          a: "It transfers the call to the right person or team and shares a summary, so the caller never has to repeat themselves.",
        },
        {
          q: "How long does setup take?",
          a: "Most teams start with a pilot line within days. We help you configure scripts, connect tools and review early calls together.",
        },
        {
          q: "Can it call out as well as answer?",
          a: "Yes. Alexi runs outbound campaigns such as lead follow-up, reminders, confirmations and surveys, with outcomes logged automatically.",
        },
        {
          q: "Which languages are supported?",
          a: "Alexi can speak with callers in multiple languages. Tell us which ones you need and we'll confirm them during your demo.",
        },
      ],
    },
    demo: {
      title: "See the AI Call Center take a call",
      body: "Book a demo and we'll show Alexi handling your real scenarios. Prefer to chat first? Choose Talk to Alexi and we'll be in touch.",
      productSlug: "ai-call-center-platform",
      intents: [
        { value: "demo", label: "Book a Demo" },
        { value: "expert", label: "Talk to Alexi" },
      ],
      placeholder: "Tell us about your call volume or goals",
    },
  },
  storyPage: {
    seoTitle: "Company Story",
    seoDescription:
      "ZillionxAI combines SaaS, AI, automation, and implementation so businesses can turn technology into measurable outcomes.",
    hero: {
      badge: "Company Story",
      title: "Technology into",
      accent: "measurable outcomes",
      body: "Businesses struggle to turn technology into measurable outcomes. ZillionxAI was built to close that gap.",
    },
    problemTitle: "Where transformation stalls",
    problem: [
      "Businesses buy software, add an AI tool, and hire another vendor to connect them. The technology arrives. The outcome does not. Processes stay hard to see, and leadership cannot point to a result the business can measure.",
      "The gap is rarely a missing product. It is the distance between a tool and the way the company actually works, across systems, processes, and tools, on-premises and in the cloud.",
    ],
    approachTitle: "One DTaaS engagement",
    approachBody:
      "ZillionxAI combines SaaS, AI, automation, and implementation. Digital Transformation-as-a-Service is the platform and the multi-solution work around it, tailored to how the business operates.",
    approach: [
      { title: "SaaS", body: "Business platforms such as CRM, ERP, facility management, and custom applications, configured for the operation." },
      { title: "AI", body: "Applications that answer, qualify, and assist, with governance, audit trails, and a handoff to people." },
      { title: "Automation", body: "Workflows that move work between systems with clear approvals, instead of another manual step." },
      { title: "Implementation", body: "The work of putting that mix into daily use, from the first assessment through optimization." },
    ],
    journeyTitle: "From assessment through optimization",
    journeyBody: "Every engagement follows the same path, so the result stays visible from the first meeting to go-live and beyond.",
    journey: [
      { title: "Assess", body: "Understand the systems, processes, and the outcome the business needs to measure." },
      { title: "Design", body: "Choose the combination of SaaS, AI, and automation that fits the operation." },
      { title: "Implement", body: "Put the platform and solutions into daily work, with the teams who will run them." },
      { title: "Optimize", body: "Keep improving after go-live through managed services, as the business grows." },
    ],
  },
  officePage: {
    seoTitle: "Office Location",
    seoDescription: "ZillionxAI office on Sheikh Zayed Road, Dubai.",
    hero: {
      badge: "Office",
      title: "Sheikh Zayed Road,",
      accent: "Dubai",
      body: "The ZillionxAI office is on Sheikh Zayed Road, Dubai. The map pin marks the road.",
    },
    addressLabel: "Address",
    address: "Sheikh Zayed Road, Dubai",
    mapTitle: "Map of Sheikh Zayed Road, Dubai",
    note: "A building or suite number will be added here when it is confirmed. This pin is the road itself.",
  },
  partnerPage: {
    seoTitle: "Become a Partner",
    seoDescription:
      "Become a ZillionxAI Technology Solution Partner. Market and implement SaaS, AI, and automation with defined intellectual property, reverse-engineering, and indemnification rules.",
    hero: {
      badge: "Technology Solution Partner (TSP)",
      title: "Become a Partner",
      accent: "",
      body: "ZillionxAI – Technology Solution Partner (TSP)",
    },
    paragraphs: [
      "Leverage our technical resources to accelerate mass-scale customer and project requirements, including using our existing solutions in SaaS, AI, and Automation, and building a new custom application.",
      "Boost your business growth through progressive tiers that offer increasing levels of support and profit-sharing incentive benefits.",
    ],
    diagram: {
      title: "Global Partner Network",
      nodes: [
        { title: "Channel / VAR", body: "Resells SaaS and owns SIP lines" },
        { title: "Technology", body: "Integrates APIs with a local CRM" },
        { title: "Marketing", body: "Refers qualified B2B pipelines" },
      ],
    },
    diagramAlt:
      "Global Partner Network. Channel / VAR resells SaaS and owns SIP lines. Technology integrates APIs with a local CRM. Marketing refers qualified B2B pipelines.",
    rulesTitle: "General Legal Rules & Asset Rights",
    principles: [
      {
        title: "Intellectual Property (IP) Retention",
        body: "This program provides a limited, non-exclusive, revocable right to market and implement our services. All core codebases, application logic, patent portfolios, speech pipelines, dashboard frameworks, and brand assets remain the sole, un-transferable property of our company.",
      },
      {
        title: "Reverse-Engineering Ban",
        body: "Partners are explicitly forbidden from reverse-engineering, decompiling, extracting components from, or creating structural clones of our AI processing core, latency management engines, or API wrappers. Breach of this clause triggers immediate termination of partner access without refund and the immediate filing of injunctive legal claims.",
      },
      {
        title: "Indemnification Limits",
        body: "Partners agree to defend, indemnify, and hold our company harmless against any third-party legal claims, regulatory fines, or consumer losses resulting from unauthorized partner promises, broken local telecom integrations, or careless data handling by the partner's staff.",
      },
    ],
    apply: "Apply Now to become a Partner",
    dialogTitle: "Apply to become a Partner",
    dialogSubtitle: "Tell us about your company and the services you deliver. We will follow up on the next step.",
  },
  investorPage: {
    seoTitle: "Become an Investor",
    seoDescription:
      "Connect with ZillionxAI about curated alignment, predictable value creation, follow-on options, governance integrity, and transparent compliance.",
    hero: {
      badge: "Investors",
      title: "Alignment before",
      accent: "capital",
      body: "ZillionxAI speaks with investors who want a clear view of how Digital Transformation-as-a-Service creates value.",
    },
    points: [
      {
        title: "Curated alignment",
        body: "We look for investors who understand SaaS, AI, and implementation, and who share the aim of measurable business outcomes.",
      },
      {
        title: "Predictable value creation",
        body: "Engagements run as advisory, solutions, implementation, and managed services, so value is tied to delivery rather than a one-off licence.",
      },
      {
        title: "Follow-on options",
        body: "A relationship can deepen over time, from a first conversation to follow-on participation as the company grows.",
      },
      {
        title: "Asset and governance integrity",
        body: "Platform IP, client work, and company assets stay under defined ownership and governance, with clear decision rights.",
      },
      {
        title: "Transparent compliance",
        body: "Reporting, contracting, and communication stay straightforward, so investors can see how the company operates.",
      },
    ],
    connect: "Connect with us",
    dialogTitle: "Connect with us",
    dialogSubtitle: "Share a little context about your interest. The ZillionxAI team will follow up.",
  },
};

export const portalAr: typeof portalEn = {
  platform: {
    seoTitle: "منصة مركز الاتصال بالذكاء الاصطناعي",
    seoDescription:
      "مركز اتصال ZillionxAI بالذكاء الاصطناعي يرد على المكالمات الواردة، ويدير الحملات الصادرة، ويحجز المواعيد، ويحوّل المكالمة إلى فريقك مع السياق الكامل.",
    hero: {
      badge: "مركز الاتصال بالذكاء الاصطناعي يعمل على مدار الساعة",
      title: "كل مكالمة تُجاب.",
      accent: "وكل عميل محتمل يُتابع.",
      body: "يلتقط Alexi من ZillionxAI المكالمات الواردة، ويجري المكالمات الصادرة، ويحجز المواعيد، ويحدّث نظام علاقات العملاء. حين يحتاج المتصل إلى شخص، تُحوَّل المكالمة مع السياق الكامل.",
      primary: "احجز عرضًا توضيحيًا",
      secondary: "تحدّث إلى Alexi",
      points: ["بلا موسيقى انتظار", "تسليم بشري مدمج", "يعمل خلال أيام لا أشهر"],
    },
    sample: {
      label: "واردة · عيادة أسنان",
      live: "مكالمة مباشرة",
      lines: [
        { who: "Caller", text: "مرحبًا، أريد نقل موعد التنظيف إلى عصر الخميس." },
        { who: "Alexi", text: "بالتأكيد يا سارة. يمكنني عرض 2:30 أو 4:15 يوم الخميس. أيهما يناسبك؟" },
        { who: "Caller", text: "2:30 مناسب." },
        { who: "Alexi", text: "تم. حُجز لك الخميس الساعة 2:30، وتأكيد نصي في الطريق إليك." },
      ],
      result: "تم نقل الموعد · تم تحديث التقويم ونظام علاقات العملاء",
    },
    chips: ["مكالمات واردة", "حملات صادرة", "حجز المواعيد", "تأهيل العملاء المحتملين", "تسليم بشري مباشر"],
    coverage: {
      title: "مركز اتصال واحد بالذكاء الاصطناعي. كل محادثة مغطاة.",
      body: "استبدل المكالمات الفائتة والبريد الصوتي وطوابير الانتظار بمركز اتصال يتحدث كأفضل أفراد فريقك ويعمل في كل ساعة.",
      cards: [
        {
          title: "التعامل مع المكالمات الواردة",
          body: "يرد Alexi من الرنة الأولى، ويفهم سبب الاتصال، ثم يحل الطلب أو يوجّهه. الأسئلة والحجوزات وحالة الطلب والتغطية خارج الدوام تُدار بلا طابور.",
          points: ["إجابة فورية بأي حجم", "يتذكر السياق داخل المكالمة", "لا يضع أحدًا في الانتظار"],
        },
        {
          title: "الحملات الصادرة",
          body: "تابع العملاء المحتملين، وأكد المواعيد، وتابع التجديدات، واجمع الملاحظات، بصوت طبيعي ووفق جدولك.",
          points: ["متابعة العملاء المحتملين", "تأكيد المواعيد والطلبات", "التجديدات والملاحظات"],
        },
        {
          title: "توجيه ذكي",
          body: "أوصل كل متصل إلى الفريق المناسب حسب النية والاستعجال وتاريخ العميل.",
          points: ["النية والاستعجال", "تاريخ العميل", "الفريق المناسب أولًا"],
        },
        {
          title: "تسليم بشري دافئ",
          body: "حين يحين دور الشخص، يحصل وكيلك على ملخص ونص المكالمة قبل أن يلقي التحية.",
          points: ["ملخص قبل التحية", "النص الكامل", "لا يعيد المتصل شرح طلبه"],
        },
        {
          title: "متعدد اللغات افتراضيًا",
          body: "اخدم المتصلين بلغتهم، بالمعرفة والنبرة نفسها في كل لغة.",
          points: ["لغات متعددة", "المعرفة نفسها", "نبرة علامة واحدة"],
        },
        {
          title: "ذكاء المكالمات",
          body: "نصوص وملخصات ونتائج وانطباع لكل مكالمة، جاهزة للمراجعة أو التصدير.",
          points: ["نصوص وملخصات", "نتائج وانطباع", "تصدير إلى أدواتك"],
        },
      ],
    },
    tabsIntro: {
      title: "المنصة الكاملة خلف مركز الاتصال",
      body: "كل ما تحتاجه لبناء مكالماتك وتشغيلها وتحسينها في مكان واحد.",
    },
    tabs: [
      {
        id: "knowledge",
        label: "قاعدة المعرفة",
        title: "امنح Alexi معرفة أعمالك",
        body: "ارفع المستندات التي يستخدمها فريقك. يجيب Alexi منها، بكلماتك، ولا يقول إلا ما تدعمه موادك.",
        points: ["رفع PDF وWord ونص", "إجابات مبنية على سياساتك", "حدّث مرة واحدة، ويظهر في المكالمة التالية"],
        sampleTitle: "عرض نموذجي",
        sample: ["Service guide.pdf — مفهرس وجاهز", "Cancellation policy.docx — مفهرس وجاهز", "Opening hours.txt — مفهرس وجاهز"],
      },
      {
        id: "builder",
        label: "بناء الوكيل",
        title: "ابنِ وكيل مكالمات خلال دقائق",
        body: "صف المهمة، واضبط النبرة، وأضف قواعد التصعيد. لديك نصوص أو تسجيلات؟ حوّلها إلى وكيل بدل البدء من الصفر.",
        points: ["أهداف وتحية ونبرة", "استيراد النصوص الحالية", "مكالمات تجريبية قبل الإطلاق"],
        sampleTitle: "عرض نموذجي",
        sample: ["التحية — دافئة وموجزة", "الهدف — حجز موعد", "التصعيد — حين يطلب المتصل شخصًا"],
      },
      {
        id: "voice",
        label: "استوديو الصوت",
        title: "صوت يشبه علامتك",
        body: "اختر صوتًا طبيعيًا، وحدد اللغة وسرعة الحديث، وحافظ على اتساق كل مكالمة عبر الفرق والحملات.",
        points: ["أصوات طبيعية معبّرة", "لغات متعددة", "صوت علامة واحد على كل خط"],
        sampleTitle: "عرض نموذجي",
        sample: ["Amira — العربية، هادئ", "Noah — الإنجليزية، ودود", "Lucía — الإسبانية، حيوي"],
      },
      {
        id: "campaigns",
        label: "الحملات",
        title: "شغّل المكالمات الصادرة على نطاق واسع",
        body: "ارفع قائمة، واختر نصًا وجدولًا. يتصل Alexi، ويسجّل النتيجة، ويعيد المحاولة حين لا يرد أحد.",
        points: ["تأكيد الطلبات والمواعيد", "متابعة العملاء والتذكير", "قواعد إعادة المحاولة وساعات الاتصال"],
        sampleTitle: "عرض نموذجي",
        sample: ["تأكيد الطلبات", "متابعة العملاء المحتملين", "تذكير التجديد"],
      },
      {
        id: "monitoring",
        label: "المراقبة المباشرة",
        title: "راقب المكالمات وهي تحدث",
        body: "شاهد المكالمات النشطة ونصوصها لحظة بلحظة، ثم تدخل بنقرة حين تحتاج المحادثة إلى شخص.",
        points: ["نصوص فورية", "استلام بنقرة واحدة", "تحويل دافئ مع ملخص"],
        sampleTitle: "عرض نموذجي",
        sample: ["حجز · 01:12 — جارية", "دعم · 00:46 — جارية", "مبيعات · 02:05 — تم التحويل"],
      },
      {
        id: "analytics",
        label: "التحليلات",
        title: "اعرف ما حققته كل مكالمة",
        body: "لكل مكالمة نص وملخص ونتيجة وانطباع. لاحظ الأنماط، وسد فجوات المعرفة، وأثبت القيمة.",
        points: ["نتائج وملخصات", "اتجاهات الانطباع والموضوع", "تصدير إلى أدوات التقارير"],
        sampleTitle: "عرض نموذجي",
        sample: ["حلّها Alexi", "تم الحجز", "سُلّمت للفريق"],
      },
    ],
    steps: {
      title: "تعمل خلال ثلاث خطوات",
      body: "يهيئ فريقنا مركز الاتصال معك ويضبطه، لتبدأ مكالمات حقيقية بسرعة.",
      items: [
        {
          title: "علّم Alexi أعمالك",
          body: "شارك خدماتك وسياساتك والأسئلة الشائعة ونصوص المكالمات. يتعلم Alexi نبرتك والإجابات التي يحتاجها المتصلون.",
        },
        {
          title: "اربط أدواتك",
          body: "اربط أرقام الهاتف والتقويم ونظام علاقات العملاء ليتمكن Alexi من الحجز والبحث وتحديث السجلات أثناء المكالمة.",
        },
        {
          title: "انطلق وحسّن",
          body: "ابدأ بخط تجريبي، وراجع محادثات حقيقية، ثم توسّع إلى كل مكالمة مع نمو ثقتك.",
        },
      ],
    },
    useCases: {
      title: "مصمم للفرق التي تعيش على الهاتف",
      body: "ابدأ بالمحادثات التي يديرها فريقك كل يوم.",
      items: [
        { title: "الرعاية الصحية والعيادات", body: "الحجز والتذكير وإعادة الجدولة وتسليم الفرز خارج الدوام." },
        { title: "العقارات", body: "تأهيل الاستفسارات وجدولة المعاينات ومتابعة كل عميل محتمل." },
        { title: "الخدمات المنزلية", body: "التقاط الأعمال وطلبات الإرسال ومعاودة الاتصال لعروض الأسعار على مدار الساعة." },
        { title: "التجزئة والضيافة", body: "الحجوزات وأسئلة الطلبات ومعلومات الفرع بلا طابور." },
        { title: "الخدمات المالية", body: "حجز المواعيد وتذكير المدفوعات وتوجيه آمن للمكالمات." },
        { title: "التعليم", body: "أسئلة القبول وجولات الحرم ومتابعة التسجيل." },
        { title: "الخدمات اللوجستية", body: "حالة التوصيل وإعادة الجدولة والتنسيق بين السائق والعميل." },
        { title: "مكاتب الدعم", body: "حل المستوى الأول، مع تمرير الحالات المعقدة والسياق الكامل." },
      ],
    },
    cases: {
      title: "من أين تبدأ الفرق مع Alexi",
      body: "ثلاثة مشاريع أولى شائعة. تبدأ معظم الفرق بخط أو حملة واحدة ثم تتوسع.",
      items: [
        {
          title: "مكالمات تأكيد الطلب",
          body: "يتصل Alexi بكل عميل لتأكيد التفاصيل ونافذة التوصيل، ويسجّل النتيجة في نظام الطلبات، ويعلّم المشكلات لفريقك.",
        },
        {
          title: "متابعة فورية للعميل المحتمل",
          body: "يصل استفسار جديد، فيتصل Alexi خلال لحظات، ويؤهّل العميل، ويحجز وقتًا مع مندوب المبيعات المناسب.",
        },
        {
          title: "استقبال خارج الدوام",
          body: "الليالي وعطل الأسبوع والعطل مغطاة. يحصل المتصلون على إجابات أو حجوزات، وتصل الحالات العاجلة إلى فريق المناوبة.",
        },
      ],
    },
    integrations: {
      title: "يناسب المجموعة التي تعمل بها",
      body: "يتصل Alexi بنظام الهاتف والتقويم ونظام علاقات العملاء، فتنتهي كل مكالمة والسجل الصحيح محدَّث بلا إعادة إدخال.",
      cta: "احجز عرضًا توضيحيًا",
      items: ["خطوط الهاتف وSIP", "Google Calendar", "Outlook", "Salesforce", "HubSpot", "Zoho", "Slack", "SMS وWhatsApp", "Webhooks وAPI"],
    },
    faq: {
      title: "أسئلة وإجابات",
      items: [
        {
          q: "ما هو مركز اتصال Alexi بالذكاء الاصطناعي؟",
          a: "خدمة هاتف يديرها الذكاء الاصطناعي: ترد على المكالمات الواردة، وتجري الصادرة، وتحجز المواعيد، وتؤهّل العملاء، وتحدّث أنظمتك، وتمرر المتصل إلى فريقك حين يحتاج إلى شخص.",
        },
        {
          q: "هل يعرف المتصل أنه يتحدث إلى ذكاء اصطناعي؟",
          a: "صوت Alexi طبيعي وحوارى، ونوصي بالوضوح مع المتصلين بأنهم يتحدثون إلى مساعد ذكاء اصطناعي. أنت تتحكم في التحية وطريقة التعريف.",
        },
        {
          q: "ماذا يحدث حين لا يستطيع Alexi المساعدة؟",
          a: "يحوّل المكالمة إلى الشخص أو الفريق المناسب ويشارك ملخصًا، فلا يضطر المتصل إلى تكرار نفسه.",
        },
        {
          q: "كم يستغرق الإعداد؟",
          a: "تبدأ معظم الفرق بخط تجريبي خلال أيام. نساعدكم على ضبط النصوص وربط الأدوات ومراجعة المكالمات الأولى معًا.",
        },
        {
          q: "هل يتصل صادِرًا كما يرد؟",
          a: "نعم. يدير Alexi حملات صادرة مثل متابعة العملاء والتذكير والتأكيد والاستبيانات، وتُسجَّل النتائج تلقائيًا.",
        },
        {
          q: "ما اللغات المدعومة؟",
          a: "يمكن لـ Alexi التحدث بعدة لغات. أخبرنا باللغات التي تحتاجها وسنؤكدها أثناء العرض التوضيحي.",
        },
      ],
    },
    demo: {
      title: "شاهد مركز الاتصال يجري مكالمة",
      body: "احجز عرضًا وسنريك Alexi يتعامل مع سيناريوهاتك الحقيقية. تفضّل الحديث أولًا؟ اختر تحدّث إلى Alexi وسنتواصل معك.",
      productSlug: "ai-call-center-platform",
      intents: [
        { value: "demo", label: "احجز عرضًا توضيحيًا" },
        { value: "expert", label: "تحدّث إلى Alexi" },
      ],
      placeholder: "أخبرنا عن حجم مكالماتك أو أهدافك",
    },
  },
  storyPage: {
    seoTitle: "قصة الشركة",
    seoDescription: "تجمع ZillionxAI البرمجيات كخدمة والذكاء الاصطناعي والأتمتة والتنفيذ لتحويل التقنية إلى نتائج قابلة للقياس.",
    hero: {
      badge: "قصة الشركة",
      title: "التقنية إلى",
      accent: "نتائج قابلة للقياس",
      body: "تواجه الشركات صعوبة في تحويل التقنية إلى نتائج قابلة للقياس. تأسست ZillionxAI لسد هذه الفجوة.",
    },
    problemTitle: "أين يتعثر التحول",
    problem: [
      "تشتري الشركات برمجيات، وتضيف أداة ذكاء اصطناعي، وتستعين بمورّد آخر للربط بينها. تصل التقنية. ولا تصل النتيجة. تبقى العمليات صعبة الرؤية، ولا تستطيع القيادة الإشارة إلى نتيجة يمكن للأعمال قياسها.",
      "الفجوة نادرًا ما تكون منتجًا ناقصًا. إنها المسافة بين الأداة وطريقة عمل الشركة فعلًا، عبر الأنظمة والعمليات والأدوات، في الموقع وفي السحابة.",
    ],
    approachTitle: "مشاركة واحدة للتحول الرقمي كخدمة",
    approachBody:
      "تجمع ZillionxAI البرمجيات كخدمة والذكاء الاصطناعي والأتمتة والتنفيذ. التحول الرقمي كخدمة هو المنصة والعمل متعدد الحلول حولها، مصممًا لطريقة تشغيل الأعمال.",
    approach: [
      { title: "SaaS", body: "منصات أعمال مثل CRM وERP وإدارة المرافق والتطبيقات المخصصة، مهيأة للتشغيل." },
      { title: "AI", body: "تطبيقات ترد وتؤهّل وتساعد، مع حوكمة وسجلات تدقيق وتسليم للناس." },
      { title: "Automation", body: "مسارات تنقل العمل بين الأنظمة بموافقات واضحة، بدل خطوة يدوية أخرى." },
      { title: "Implementation", body: "عمل إدخال هذا المزيج في الاستخدام اليومي، من التقييم الأول حتى التحسين." },
    ],
    journeyTitle: "من التقييم حتى التحسين",
    journeyBody: "كل مشاركة تتبع المسار نفسه، فتبقى النتيجة ظاهرة من الاجتماع الأول حتى الإطلاق وما بعده.",
    journey: [
      { title: "التقييم", body: "فهم الأنظمة والعمليات والنتيجة التي تحتاج الأعمال إلى قياسها." },
      { title: "التصميم", body: "اختيار مزيج SaaS وAI والأتمتة الذي يناسب التشغيل." },
      { title: "التنفيذ", body: "إدخال المنصة والحلول في العمل اليومي مع الفرق التي ستشغّلها." },
      { title: "التحسين", body: "مواصلة التحسين بعد الإطلاق عبر الخدمات المُدارة مع نمو الأعمال." },
    ],
  },
  officePage: {
    seoTitle: "موقع المكتب",
    seoDescription: "مكتب ZillionxAI على Sheikh Zayed Road في Dubai.",
    hero: {
      badge: "المكتب",
      title: "Sheikh Zayed Road،",
      accent: "Dubai",
      body: "مكتب ZillionxAI على Sheikh Zayed Road في Dubai. دبوس الخريطة يشير إلى الطريق.",
    },
    addressLabel: "العنوان",
    address: "Sheikh Zayed Road, Dubai",
    mapTitle: "خريطة Sheikh Zayed Road, Dubai",
    note: "سيُضاف رقم المبنى أو الجناح هنا عند تأكيده. هذا الدبوس للطريق نفسه.",
  },
  partnerPage: {
    seoTitle: "كن شريكًا",
    seoDescription: "كن شريك حلول تقنية (TSP) مع ZillionxAI. سوّق خدمات SaaS والذكاء الاصطناعي والأتمتة ونفّذها وفق قواعد الملكية الفكرية والهندسة العكسية والتعويض.",
    hero: {
      badge: "شريك الحلول التقنية (TSP)",
      title: "كن شريكًا",
      accent: "",
      body: "ZillionxAI – شريك الحلول التقنية (TSP)",
    },
    paragraphs: [
      "استفد من مواردنا التقنية لتسريع متطلبات العملاء والمشاريع على نطاق واسع، بما في ذلك استخدام حلولنا القائمة في SaaS والذكاء الاصطناعي والأتمتة، وبناء تطبيق مخصص جديد.",
      "عزّز نمو أعمالك عبر مستويات متدرجة تقدّم دعمًا متزايدًا ومزايا مشاركة في الأرباح.",
    ],
    diagram: {
      title: "شبكة الشركاء العالمية",
      nodes: [
        { title: "Channel / VAR", body: "يعيد بيع SaaS ويملك خطوط SIP" },
        { title: "Technology", body: "يدمج واجهات API مع CRM محلي" },
        { title: "Marketing", body: "يحيل مسارات B2B مؤهلة" },
      ],
    },
    diagramAlt:
      "شبكة الشركاء العالمية. Channel / VAR يعيد بيع SaaS ويملك خطوط SIP. Technology يدمج واجهات API مع CRM محلي. Marketing يحيل مسارات B2B مؤهلة.",
    rulesTitle: "القواعد القانونية العامة وحقوق الأصول",
    principles: [
      {
        title: "الاحتفاظ بالملكية الفكرية (IP)",
        body: "يمنح هذا البرنامج حقًا محدودًا وغير حصري وقابلًا للإلغاء لتسويق خدماتنا وتنفيذها. تبقى جميع قواعد الشيفرة الأساسية ومنطق التطبيقات ومحافظ براءات الاختراع ومسارات الكلام وأُطر لوحات المعلومات وأصول العلامة الملكية الوحيدة غير القابلة للنقل لشركتنا.",
      },
      {
        title: "حظر الهندسة العكسية",
        body: "يُحظر على الشركاء صراحةً إجراء هندسة عكسية أو فك ترجمة أو استخراج مكوّنات أو إنشاء نسخ بنيوية من نواة معالجة الذكاء الاصطناعي أو محركات إدارة زمن الاستجابة أو أغلفة واجهات API. يؤدي خرق هذا البند إلى إنهاء فوري لوصول الشريك دون استرداد، ورفع دعاوى قضائية فورية بطلب أمر منع.",
      },
      {
        title: "حدود التعويض",
        body: "يوافق الشركاء على الدفاع عن شركتنا وتعويضها وإبراء ذمتها من أي مطالبات قانونية من الغير أو غرامات تنظيمية أو خسائر للمستهلكين ناتجة عن وعود غير مصرّح بها من الشريك، أو تكاملات اتصالات محلية معطلة، أو تعامل غير حذر مع البيانات من موظفي الشريك.",
      },
    ],
    apply: "قدّم الآن لتصبح شريكًا",
    dialogTitle: "قدّم لتصبح شريكًا",
    dialogSubtitle: "أخبرنا عن شركتك والخدمات التي تقدّمها. سنتابع معك الخطوة التالية.",
  },
  investorPage: {
    seoTitle: "كن مستثمرًا",
    seoDescription: "تواصل مع ZillionxAI حول المواءمة المنتقاة، وخلق القيمة المتوقع، وخيارات المتابعة، وسلامة الحوكمة، والامتثال الشفاف.",
    hero: {
      badge: "المستثمرون",
      title: "المواءمة قبل",
      accent: "رأس المال",
      body: "تتحدث ZillionxAI مع المستثمرين الذين يريدون صورة واضحة لكيفية خلق التحول الرقمي كخدمة للقيمة.",
    },
    points: [
      {
        title: "مواءمة منتقاة",
        body: "نبحث عن مستثمرين يفهمون SaaS والذكاء الاصطناعي والتنفيذ، ويشاركوننا هدف النتائج القابلة للقياس.",
      },
      {
        title: "خلق قيمة يمكن توقعه",
        body: "تسير المشاركات كاستشارات وحلول وتنفيذ وخدمات مُدارة، فترتبط القيمة بالتسليم لا بترخيص لمرة واحدة.",
      },
      {
        title: "خيارات متابعة",
        body: "يمكن للعلاقة أن تتعمق مع الوقت، من محادثة أولى إلى مشاركة لاحقة مع نمو الشركة.",
      },
      {
        title: "سلامة الأصول والحوكمة",
        body: "تبقى ملكية المنصة وعمل العملاء وأصول الشركة ضمن ملكية وحوكمة محددتين، مع صلاحيات قرار واضحة.",
      },
      {
        title: "امتثال شفاف",
        body: "تبقى التقارير والتعاقد والتواصل واضحة، ليرى المستثمر كيف تعمل الشركة.",
      },
    ],
    connect: "تواصل معنا",
    dialogTitle: "تواصل معنا",
    dialogSubtitle: "شارك سياقًا موجزًا عن اهتمامك. سيتابع فريق ZillionxAI معك.",
  },
};
