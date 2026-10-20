import type { IconName } from "@/components/zillion/Icon";

export type LinkItem = { label: string; href: string };
export type ServiceLineId = "software" | "ai" | "hardware";

export type ServiceLine = {
  id: ServiceLineId;
  slug: string;
  label: string;
  short: string;
  listTitle: string;
  items: LinkItem[];
  visuals: string[];
};

export type ServicePage = {
  seoTitle: string;
  seoDescription: string;
  hero: {
    badge: string;
    title: string;
    accent: string;
    body: string;
    primary: string;
    secondary: string;
    card: { title: string; body: string; checks: string[] };
  };
  capabilities: {
    pill: string;
    title: string;
    body: string;
    sideLabel: string;
    sideBody: string;
    items: { id: string; title: string; body: string; href?: string; icon: IconName }[];
  };
  why: { pill: string; title: string; body: string; items: { title: string; body: string; icon: IconName }[] };
  useCases: {
    pill: string;
    title: string;
    items: { title: string; body: string }[];
    side: { label: string; title: string; body: string; checks: string[] };
  };
  cta: { title: string; body: string; primary: string; secondary: string };
};

const en = {
  meta: {
    brand: "ZillionAI",
    homeTitle: "ZillionAI — Software, AI & Hardware Solutions",
    homeDescription:
      "ZillionAI builds custom software, delivers AI applications, integration and automation, and sources business IT hardware.",
  },
  nav: {
    home: "Home",
    about: "About Us",
    services: "Services",
    industries: "Industries",
    packages: "Packages",
    leadership: "Leadership",
    contact: "Contact",
    serviceLines: "Service lines",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    english: "English",
    arabic: "العربية",
    skip: "Skip to content",
    viewLine: "View service line",
  },
  lines: [
    {
      id: "software",
      slug: "software-services",
      label: "Software Services",
      short: "Software",
      listTitle: "Software services",
      items: [
        { label: "ERP System", href: "/products/erp-system" },
        { label: "CRM System", href: "/products/crm-system" },
        { label: "Facility Management", href: "/products/facility-management-system" },
        { label: "Helpdesk System", href: "/products/helpdesk-system" },
        { label: "E-commerce Platform", href: "/products/ecommerce-platform" },
        { label: "Genealogy Management", href: "/products/genealogy-management-system" },
        { label: "Custom Application Development", href: "/products/oqtane-custom-application-development" },
      ],
      visuals: [
        "/images/products/erp-system.png",
        "/images/products/crm-system.png",
        "/images/products/helpdesk-system.png",
      ],
    },
    {
      id: "ai",
      slug: "ai-integration-automation",
      label: "AI Applications & Automation",
      short: "AI & Automation",
      listTitle: "AI, integration & automation",
      items: [
        { label: "SiteAgent for Oqtane", href: "/products/siteagent" },
        { label: "AI Voice Agents", href: "/ai-voice-agents" },
        { label: "AI Workforce Platform", href: "/products/ai-workforce-platform" },
        { label: "AI Call Center Platform", href: "/products/ai-call-center-platform" },
        { label: "AI Trading Platform", href: "/products/ai-trading-platform" },
        { label: "System Integration", href: "/services/ai-integration-automation#integration" },
        { label: "Workflow Automation", href: "/services/ai-integration-automation#automation" },
      ],
      visuals: [
        "/images/products/ai-workforce-platform.png",
        "/images/products/ai-call-center-platform.png",
        "/images/products/ai-trading-platform.png",
      ],
    },
    {
      id: "hardware",
      slug: "hardware-procurement",
      label: "Hardware Procurement",
      short: "Hardware",
      listTitle: "Hardware procurement",
      items: [
        { label: "Laptops & Desktops", href: "/services/hardware-procurement#laptops" },
        { label: "Servers & Storage", href: "/services/hardware-procurement#servers" },
        { label: "Networking & Wi-Fi", href: "/services/hardware-procurement#networking" },
        { label: "Printers & Peripherals", href: "/services/hardware-procurement#printers" },
        { label: "Displays & Meeting Rooms", href: "/services/hardware-procurement#displays" },
        { label: "Buy-back & Resale", href: "/services/hardware-procurement#resale" },
      ],
      visuals: [
        "/images/zillion/hardware-stack.svg",
        "/images/zillion/hardware-laptop.svg",
        "/images/zillion/hardware-network.svg",
      ],
    },
  ] as ServiceLine[],
  hero: {
    badge: "Digital Transformation-as-a-Service",
    title: "Software, AI & Hardware Solutions",
    sub: "Custom business software, AI applications that connect and automate your systems, and the IT hardware your teams run on, all delivered by ZillionAI.",
    cta: "Request Demo",
    stats: [
      { value: "3", label: "Service lines", gradient: false },
      { value: "10+", label: "Ready platforms", gradient: false },
      { value: "AR/EN", label: "Bilingual", gradient: false },
      { value: "AI", label: "Powered", gradient: true },
    ],
    agent: {
      title: "AI Voice Agent",
      body: "Human-like AI that speaks Arabic and English, ready to answer calls.",
      cta: "Try it now",
    },
  },
  whatWeDo: {
    eyebrow: "What we do",
    cards: [
      {
        title: "Software services",
        body: "Custom software and business applications: ERP, CRM, helpdesk, facilities, commerce and more, built around how you work.",
      },
      {
        title: "AI applications",
        body: "AI voice agents, assistants and platforms that answer customers, qualify leads and support your teams in Arabic and English.",
      },
      {
        title: "Integration & automation",
        body: "Connect the systems you already use and turn repeat work into automated workflows with clear approvals and reporting.",
      },
      {
        title: "Hardware procurement",
        body: "Sourcing, buying and selling business IT hardware, from laptops and servers to networking, printers and meeting rooms.",
      },
    ],
  },
  platforms: {
    title: "Our platforms",
    items: [
      { name: "ERP", icon: "layers" },
      { name: "CRM", icon: "users" },
      { name: "Helpdesk", icon: "headset" },
      { name: "Facilities", icon: "building" },
      { name: "E-commerce", icon: "cart" },
      { name: "Genealogy", icon: "tree" },
      { name: "AI Workforce", icon: "sparkles" },
      { name: "AI Call Center", icon: "phone" },
      { name: "AI Trading", icon: "chart" },
      { name: "Voice Agents", icon: "wave" },
      { name: "SiteAgent", icon: "shield" },
    ] as { name: string; icon: IconName }[],
  },
  trust: {
    chip: "One accountable partner",
    title: "Software, AI and hardware under one contract",
    body: "Plan the application, the automation around it and the devices it runs on with a single team. Fewer hand-offs between vendors, one point of contact and one delivery plan.",
    cta: "Talk to an expert",
  },
  software: {
    crumb: "Core service",
    title: "Software Services",
    body: "Ready platforms you can configure quickly, or custom applications built on a modern .NET stack. Every system is designed to integrate with the rest of your operation.",
    prev: "Previous",
    next: "Next",
    learnMore: "Learn More",
    cards: [
      { slug: "erp-system", chip: "Finance & operations", title: "ERP System", body: "Finance, inventory, purchasing and HR in one system of record.", icon: "layers" },
      { slug: "crm-system", chip: "Sales pipeline", title: "CRM System", body: "Leads, deals, accounts and follow-ups with a clear pipeline view.", icon: "users" },
      { slug: "facility-management-system", chip: "Assets & maintenance", title: "Facility Management", body: "Work orders, assets, preventive maintenance and vendor visits.", icon: "building" },
      { slug: "helpdesk-system", chip: "Customer support", title: "Helpdesk System", body: "Tickets, SLAs and a shared inbox so every request has an owner.", icon: "headset" },
      { slug: "ecommerce-platform", chip: "Online sales", title: "E-commerce Platform", body: "Catalog, checkout, orders and fulfilment for B2B and B2C stores.", icon: "cart" },
      { slug: "genealogy-management-system", chip: "Records & archives", title: "Genealogy Management", body: "Family trees, records and archives with controlled access.", icon: "tree" },
      { slug: "oqtane-custom-application-development", chip: "Built for you", title: "Custom Applications", body: "Business applications designed and built around your exact workflow.", icon: "code" },
    ] as { slug: string; chip: string; title: string; body: string; icon: IconName }[],
  },
  simulator: {
    eyebrow: "Live automation simulator",
    titleBefore: "See ",
    titleAccent: "Real-Time",
    titleAfter: " Workflow Automation",
    phoneLabel: "Customer phone",
    phone: "+966 50 123 4567",
    messageLabel: "Customer message",
    message: "We need 20 laptops and a CRM for our new branch",
    run: "Start Test",
    running: "Routing…",
    note: "Simulated flow. Try a message with “refund” to see human review.",
    escalateWords: ["refund", "complaint", "cancel", "استرجاع", "شكوى", "إلغاء"],
    nodes: {
      request: { title: "Request received", sub: "Message in" },
      intent: { title: "AI intent", sub: "Classified" },
      rules: { title: "Rules check", sub: "Policy check" },
      systems: { title: "ERP / CRM update", sub: "Systems synced" },
      done: { title: "Customer notified", sub: "Confirmed" },
      human: { title: "Human review", sub: "Escalated" },
    },
  },
  hardware: {
    titleBefore: "Direct Hardware ",
    titleAccent: "Sourcing",
    tiles: [
      { label: "Laptops & desktops", icon: "laptop", href: "/services/hardware-procurement#laptops" },
      { label: "Servers & storage", icon: "server", href: "/services/hardware-procurement#servers" },
      { label: "Networking & Wi-Fi", icon: "wifi", href: "/services/hardware-procurement#networking" },
      { label: "Printers & peripherals", icon: "printer", href: "/services/hardware-procurement#printers" },
      { label: "Displays & meeting rooms", icon: "monitor", href: "/services/hardware-procurement#displays" },
    ] as { label: string; icon: IconName; href: string }[],
    legend: ["Sourcing", "Buying", "Selling"],
  },
  ai: {
    titleBefore: "Powered by ",
    titleAccent: "AI",
    body: "AI applications, system integration and workflow automation that take routine work off your teams and keep every system up to date.",
    learnMore: "Learn more",
    slides: [
      {
        title: "AI Applications",
        subtitle: "Voice agents and assistants that speak Arabic and English",
        body: "Answer calls, qualify leads, book appointments and support customers with AI agents that hand over to your team when needed.",
        bullets: ["AI voice agents", "Lead qualification", "Appointment booking", "Customer support around the clock"],
        href: "/ai-voice-agents",
        accent: "green",
      },
      {
        title: "System Integration",
        subtitle: "Connect ERP, CRM, helpdesk and the tools you already use",
        body: "Link your applications through APIs and webhooks so customer, order and stock data stays consistent everywhere it is used.",
        bullets: ["API and webhook integration", "Two-way data sync", "One customer record", "Role-based access"],
        href: "/services/ai-integration-automation#integration",
        accent: "violet",
      },
      {
        title: "Workflow Automation",
        subtitle: "Turn repeat work into automated workflows",
        body: "Route approvals, process documents and send reminders automatically, with dashboards that show what moved and what is waiting.",
        bullets: ["Approvals and routing", "Document and invoice processing", "Notifications and reminders", "Live reporting"],
        href: "/services/ai-integration-automation#automation",
        accent: "blue",
      },
    ] as { title: string; subtitle: string; body: string; bullets: string[]; href: string; accent: "green" | "violet" | "blue" }[],
    illus: {
      chatTitle: "ZillionAI Agent",
      chatStatus: "Online",
      chat: [
        { from: "user", text: "Hi, can I book a demo for Tuesday?" },
        { from: "agent", text: "Of course. Tuesday 11:00 AM is free. Shall I confirm it?" },
        { from: "user", text: "Yes please." },
        { from: "agent", text: "Booked. I've sent the invite to your email." },
      ],
      hub: "ZillionAI",
      hubNodes: ["ERP", "CRM", "Helpdesk", "E-commerce", "Email", "WhatsApp"],
      flowTitle: "Purchase approval",
      flow: [
        { label: "Request submitted", state: "done" },
        { label: "Budget check", state: "done" },
        { label: "Manager approval", state: "active" },
        { label: "Order placed", state: "todo" },
      ],
      flowStats: [
        { value: "42", label: "Automated today" },
        { value: "3", label: "Waiting" },
      ],
    },
  },
  footer: {
    quickLinksLabel: "Quick links",
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Packages", href: "/packages" },
      { label: "Industries", href: "/industries" },
      { label: "Contact us", href: "/contact" },
    ],
    servicesLabel: "Services",
    services: [
      { label: "Software services", href: "/services/software-services" },
      { label: "AI applications", href: "/services/ai-integration-automation" },
      { label: "Integration", href: "/services/ai-integration-automation#integration" },
      { label: "Automation", href: "/services/ai-integration-automation#automation" },
      { label: "Hardware", href: "/services/hardware-procurement" },
    ],
    tagline: "Custom software, AI applications and business IT hardware, delivered by one team.",
    stay: "Stay in touch!",
    emailPlaceholder: "Enter your email",
    subscribe: "Subscribe",
    subscribed: "Thanks. Your email app will open to confirm.",
    invalidEmail: "Enter a valid email address.",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    watermark: "Zillion",
  },
  floating: {
    connect: "Let's connect!",
    backToTop: "Back to top",
    linkedin: "LinkedIn",
    phone: "Call us",
    whatsapp: "WhatsApp",
    email: "Email us",
  },
  common: {
    requestDemo: "Request a Demo",
    contactTeam: "Contact Our Team",
    talkToUs: "Talk to us",
    learnMore: "Learn more",
    viewDetails: "View details",
  },
  pageHeroes: {
    products: {
      badge: "Product catalog",
      title: "Platforms Ready to",
      accent: "Run Your Business",
      body: "Business systems and AI platforms in one portfolio. Filter by family, then open any product for details.",
    },
    solutions: {
      badge: "Solutions",
      title: "Start From the",
      accent: "Outcome You Need",
      body: "Combinations of software, AI and automation shaped around a business result.",
    },
    industries: {
      badge: "Industries",
      title: "Built for the Work",
      accent: "Your Industry Runs",
      body: "Find the platforms and services that fit the way your sector operates.",
    },
    voice: {
      badge: "AI voice agents",
      title: "AI Agents That Speak,",
      accent: "Understand and Act",
      body: "Human-like AI voice agents that speak Arabic and English, qualify leads, book appointments and support customers.",
    },
    privacy: { badge: "Legal", title: "Privacy", accent: "Policy", body: "How ZillionAI handles the information you send us." },
    notFound: { badge: "404", title: "Page", accent: "Not Found", body: "The page you are looking for has moved or does not exist." },
  },
  about: {
    seoDescription: "ZillionAI delivers custom software, AI applications, integration and automation, and business IT hardware.",
    hero: {
      badge: "About ZillionAI",
      title: "Building Smarter",
      accent: "Business Technology",
      body: "ZillionAI brings software, AI and hardware together so businesses can plan, build and equip their operations with one team.",
    },
    stats: [
      { value: "3", label: "Service lines", icon: "layers" },
      { value: "10+", label: "Ready platforms", icon: "grid" },
      { value: "AR/EN", label: "Bilingual delivery", icon: "globe" },
      { value: "AI", label: "In every line", icon: "sparkles" },
    ] as { value: string; label: string; icon: IconName }[],
    storyTitle: "Our Story",
    story: [
      "ZillionAI started from a simple observation: the software a business runs, the automation around it and the hardware underneath are usually bought from three different vendors, and the gaps between them are where projects slow down.",
      "We design enterprise applications and AI platforms as one portfolio. Teams can start with a system of record, add AI agents and automation, or commission a custom application, and source the laptops, servers and network equipment to run it.",
      "Every engagement follows the same path: understand the operation, design the right mix, implement it with your team and keep improving it after launch.",
    ],
    valuesTitle: "Our Core Values",
    valuesBody: "Everything we build is guided by clarity, measured automation and long-term trust.",
    values: [
      { title: "Operational clarity", body: "Software should make complex work easier to see and run.", icon: "eye" },
      { title: "Measured automation", body: "AI is introduced where it reduces load, not where it creates noise.", icon: "sparkles" },
      { title: "Enterprise trust", body: "Security, access control and support are part of the product, not extras.", icon: "shield" },
      { title: "One team", body: "Software, AI and hardware planned together, with a single point of contact.", icon: "users" },
    ] as { title: string; body: string; icon: IconName }[],
    whyTitle: "Why Businesses Choose ZillionAI",
    why: [
      { title: "Full-stack delivery", body: "Applications, integrations and devices delivered as one plan.", icon: "layers" },
      { title: "Arabic and English", body: "Interfaces, AI agents and support in both languages.", icon: "globe" },
      { title: "Integration first", body: "Every system is designed to connect with the tools you already use.", icon: "plug" },
      { title: "Long-term support", body: "We stay after launch to support, iterate and expand.", icon: "headset" },
    ] as { title: string; body: string; icon: IconName }[],
    processPill: "How we work",
    processTitle: "From Discovery to Daily Operation",
    process: [
      { title: "Discover", body: "Understand current systems, workflows and the outcome you need." },
      { title: "Design", body: "Map modules, integrations, hardware and where AI should assist." },
      { title: "Implement", body: "Configure, migrate, deliver devices and train teams on real scenarios." },
      { title: "Operate", body: "Support, iterate and expand to more products over time." },
    ],
    cta: {
      title: "Ready to Transform Your Business Technology",
      body: "Partner with ZillionAI for software, AI and hardware delivered as one plan.",
    },
  },
  contact: {
    seoDescription: "Request a demo or talk to a ZillionAI expert about software, AI and hardware.",
    hero: {
      badge: "Contact our team",
      title: "Transform How You",
      accent: "Run Your Business",
      body: "Whether you need a business application, AI agents and automation, or new hardware for your team, tell us what you are planning and we will recommend the right mix.",
      card: { label: "Fast response", title: "Expert guidance", body: "Tell us about your goals and we'll recommend the right software, AI and hardware approach.", cta: "Speak with an expert" },
    },
    cards: {
      phone: { title: "Talk to us", body: "Speak with our team about your project." },
      email: { title: "Email us", body: "Send details and we will reply with next steps." },
      whatsapp: { title: "WhatsApp", body: "Message an expert directly." },
    },
    form: {
      pill: "Send a message",
      title: "Tell Us About Your Project",
      body: "Share your goals, the systems you use today and any hardware needs. We'll suggest a scope and next steps.",
      name: "Full name",
      company: "Company",
      email: "Work email",
      phone: "Phone / WhatsApp",
      interest: "Interested in",
      interestPlaceholder: "Select a service or product",
      groups: { services: "Service lines", agents: "AI voice agents", products: "Products" },
      message: "Project details",
      messagePlaceholder: "Tell us about your goals, current systems, number of users or devices.",
      submit: "Request a Consultation",
      sending: "Sending…",
      success: "Request received. A specialist will contact you shortly.",
      error: "Unable to send your request. Please try WhatsApp or email.",
    },
    side: {
      label: "Built for every request",
      title: "One request, routed to the right specialist.",
      body: "Software, AI and hardware specialists review every request together, so you get one answer instead of three.",
      checks: ["Software and platform scoping", "AI and integration guidance", "Hardware quotes and sourcing"],
    },
  },

  company: {
    eyebrow: "Digital Transformation-as-a-Service",
    overviewTitle: "Company Overview",
    overview: [
      "We partner with your company to help your digital transformation journey deliver measurable business results. From assessing your processes and designing practical solutions to implementing the right mix of SaaS, AI, automation and specialist expertise, every solution is designed to deliver proven outcomes and a strong return on investment.",
      "If you're driven by business growth and scale, accelerate your business with us today. We help solve your business problem for what's next.",
    ],
    modelPill: "Our model",
    modelTitle: "Digital Transformation-as-a-Service",
    modelBody: "One partner across the full journey: from understanding where you are today to running and improving what we build together.",
    pillars: [
      { title: "Advisory", body: "Digital maturity assessment of your processes, systems and data.", icon: "eye" },
      { title: "Solutions", body: "Automation, AI, SaaS, integrations and business applications.", icon: "sparkles" },
      { title: "Implementation", body: "Delivered with our partner ecosystem and specialist expertise.", icon: "users" },
      { title: "Managed Services", body: "Ongoing technology optimisation and continued collaboration.", icon: "refresh" },
    ] as { title: string; body: string; icon: IconName }[],
  },
  packages: {
    seoTitle: "Packages",
    seoDescription: "ZillionAI packages: Digital Maturity Assessment, AI for Customer Service, and Digital Transformation and AI Partner.",
    hero: {
      badge: "Packages",
      title: "Start Where It Matters,",
      accent: "Scale With Confidence",
      body: "Three ways to work with ZillionAI, from a clear roadmap to AI in customer service to an ongoing transformation partnership.",
    },
    pill: "Choose your starting point",
    title: "Packages Built Around Outcomes",
    body: "Each package is scoped to your business and designed to deliver measurable results and a strong return on investment.",
    deliverablesLabel: "Deliverables",
    exampleLabel: "Example scope",
    cta: "Discuss this package",
    items: [
      {
        id: "digital-maturity-assessment",
        number: "Package 1",
        title: "Digital Maturity Assessment",
        subtitle: "Assessment and consulting",
        body: "We assess your processes, systems and data to find where digital and AI will make the biggest difference, then turn the findings into a practical plan.",
        deliverables: ["Digital and AI Transformation Roadmap"],
        examples: ["Process and systems assessment", "Digital maturity scoring", "Prioritised opportunities and quick wins"],
        accent: "from-[#182793] to-[#07A0E7]",
        icon: "eye",
      },
      {
        id: "ai-for-customer-service",
        number: "Package 2",
        title: "AI for Customer Service",
        subtitle: "End-to-end AI call center integration",
        body: "Bring AI into every customer conversation, connected to the systems your team already uses so every interaction is captured and actioned.",
        deliverables: ["End-to-End AI Call Center Integration"],
        examples: ["CRM integration", "WhatsApp integration", "Cloud email integration", "Basic analytics", "Workflow automation"],
        accent: "from-[#505FD0] to-[#CA51AA]",
        icon: "headset",
      },
      {
        id: "digital-transformation-ai-partner",
        number: "Package 3",
        title: "Digital Transformation and AI Partner",
        subtitle: "Business automation",
        body: "An ongoing partnership that applies AI and automation across the business, from back-office documents to decision-making.",
        deliverables: ["Business automation programme"],
        examples: ["AI for document processing", "AI for reporting", "AI for employee productivity", "AI for business analytics"],
        accent: "from-[#7B3368] to-[#D97817]",
        icon: "workflow",
      },
    ] as { id: string; number: string; title: string; subtitle: string; body: string; deliverables: string[]; examples: string[]; accent: string; icon: IconName }[],
    ctaBand: { title: "Not sure which package fits?", body: "Start with a conversation. We'll recommend the right starting point for your business." },
  },
  leadership: {
    seoTitle: "Leadership Team",
    seoDescription: "Meet the founders and leadership team of ZillionAI.",
    hero: {
      badge: "Leadership",
      title: "The People Behind",
      accent: "ZillionAI",
      body: "A founding team that combines business strategy, sales and delivery, and product management to turn digital transformation into measurable results.",
    },
    pill: "Meet the founders",
    title: "Leadership Team",
    people: [
      {
        id: "shahul",
        name: "Shahul",
        role: "Founder and Managing Director",
        photo: "",
        initials: "S",
        quote: "Every engagement should end with a result the business can measure.",
        story: [
          "Shahul founded ZillionAI to give growing businesses a single partner for their digital transformation, from the first assessment to the systems they run every day.",
          "As Managing Director he sets the company's direction and leads the Digital Transformation-as-a-Service model: advisory, solutions, implementation and managed services under one roof.",
          "He works directly with business owners and leadership teams to understand where growth is being held back, and to agree what success should look like before any technology is chosen.",
          "His focus is practical outcomes and return on investment rather than technology for its own sake, which is why every ZillionAI package starts with the business problem.",
          "Shahul also leads the company's partnerships, bringing the right mix of SaaS, AI and specialist expertise to each client.",
        ],
      },
      {
        id: "malick",
        name: "Malick",
        role: "Co-founder and Sales & Delivery Director",
        photo: "",
        initials: "M",
        quote: "Clients should feel the same team from the first meeting to go-live and beyond.",
        story: [
          "Malick co-founded ZillionAI and leads both sales and delivery, so the people who understand a client's needs are the same people accountable for delivering them.",
          "He guides clients from the first conversation through scoping, proposal and implementation, keeping the plan tied to the outcomes agreed at the start.",
          "Malick oversees delivery across the partner ecosystem, coordinating specialists and making sure every project runs to a clear plan, timeline and quality standard.",
          "He places strong emphasis on communication and transparency, with regular reviews so clients always know what has been delivered and what comes next.",
          "After go-live he stays involved through managed services, helping clients keep improving and expanding what has been built.",
        ],
      },
      {
        id: "sarafudeen",
        name: "Sarafudeen",
        role: "Co-founder and Product Management",
        photo: "",
        initials: "S",
        quote: "Good products make powerful technology simple, safe and accountable.",
        story: [
          "Sarafudeen co-founded ZillionAI and leads product management across the company's software platforms and AI applications.",
          "He turns client needs and market insight into clear product roadmaps, deciding what to build, in what order, and how success will be measured.",
          "His product approach puts governance and control first: AI features are designed with approvals, audit trails and safety controls built in from the start.",
          "He works closely with engineering and delivery teams so that products are not only well designed but practical to implement and support.",
          "Sarafudeen champions usability, making sure business users can get value from AI and automation without needing to be technical experts.",
        ],
      },
    ],
    ctaBand: { title: "Work With Our Leadership Team", body: "Talk to us about your business goals and we'll show you where to start." },
  },
  servicePages: {} as Record<string, ServicePage>,
};

en.servicePages = {
  "software-services": {
    seoTitle: "Software Services",
    seoDescription: "Custom software and business applications from ZillionAI: ERP, CRM, helpdesk, facilities, e-commerce and custom development.",
    hero: {
      badge: "Software services",
      title: "Business Software",
      accent: "Built Around You",
      body: "Ready platforms you can configure quickly, or custom business applications designed around your exact workflow, delivered and supported by ZillionAI.",
      primary: "Talk to us",
      secondary: "Request a demo",
      card: {
        title: "Built for growing operations",
        body: "Systems of record that connect your teams, data and customers.",
        checks: ["Configure ready platforms fast", "Build custom applications", "Integrate with existing tools"],
      },
    },
    capabilities: {
      pill: "Service capabilities",
      title: "Everything your team needs to run",
      body: "Choose a ready platform or commission a custom build. Every system shares the same integration and support model.",
      sideLabel: "Software services",
      sideBody: "Designed to move teams from setup to daily use with clarity and reliable support.",
      items: [
        { id: "erp", title: "ERP System", body: "Finance, inventory, purchasing and HR in one system of record.", href: "/products/erp-system", icon: "layers" },
        { id: "crm", title: "CRM System", body: "Leads, deals and accounts with a clear pipeline and follow-up reminders.", href: "/products/crm-system", icon: "users" },
        { id: "facilities", title: "Facility Management", body: "Work orders, assets and preventive maintenance in one place.", href: "/products/facility-management-system", icon: "building" },
        { id: "helpdesk", title: "Helpdesk System", body: "Tickets, SLAs and a shared inbox so every request has an owner.", href: "/products/helpdesk-system", icon: "headset" },
        { id: "ecommerce", title: "E-commerce Platform", body: "Catalog, checkout, orders and fulfilment for B2B and B2C.", href: "/products/ecommerce-platform", icon: "cart" },
        { id: "genealogy", title: "Genealogy Management", body: "Family trees, records and archives with controlled access.", href: "/products/genealogy-management-system", icon: "tree" },
        { id: "custom", title: "Custom Application Development", body: "Applications built on a modern .NET stack around your workflow.", href: "/products/oqtane-custom-application-development", icon: "code" },
      ],
    },
    why: {
      pill: "Why ZillionAI",
      title: "Business Software Built for Scale",
      body: "Systems designed to integrate, grow with your team and stay supported after launch.",
      items: [
        { title: "Fast configuration", body: "Start from proven modules instead of a blank page.", icon: "zap" },
        { title: "Clear reporting", body: "Dashboards that show what moved and what is waiting.", icon: "chart" },
        { title: "Arabic and English", body: "Interfaces and documents in both languages.", icon: "globe" },
      ],
    },
    useCases: {
      pill: "Best-fit use cases",
      title: "Where software services help most",
      items: [
        { title: "Replacing spreadsheets", body: "Move finance, stock or customer lists into a real system of record." },
        { title: "Opening new branches", body: "Roll out the same processes and reporting to every location." },
        { title: "Unifying customer service", body: "Give support, sales and operations one view of every customer." },
        { title: "Unique workflows", body: "Build a custom application where off-the-shelf tools do not fit." },
      ],
      side: { label: "Built for growing businesses", title: "Software Services", body: "Connect your teams, systems and customers with reliable business software.", checks: ["Ready platforms or custom builds", "Integration with existing tools", "Training and ongoing support"] },
    },
    cta: { title: "Ready to get started?", body: "Share your requirements and our team will recommend the right platform, scope and rollout plan.", primary: "Request Demo", secondary: "Contact us" },
  },
  "ai-integration-automation": {
    seoTitle: "AI Applications, Integration & Automation",
    seoDescription: "AI-powered applications, system integration and business workflow automation from ZillionAI.",
    hero: {
      badge: "AI applications & automation",
      title: "AI That Connects",
      accent: "and Automates",
      body: "AI-powered applications, system integration and workflow automation that take routine work off your teams and keep every system in sync.",
      primary: "Talk to us",
      secondary: "Request a demo",
      card: {
        title: "Built for real operations",
        body: "AI that works inside the systems you already use.",
        checks: ["AI agents in Arabic and English", "Connected ERP, CRM and helpdesk", "Automated approvals and reminders"],
      },
    },
    capabilities: {
      pill: "Service capabilities",
      title: "Everything your team needs to automate",
      body: "From AI agents that talk to customers to integrations that keep data consistent, each capability can start small and grow.",
      sideLabel: "AI & automation",
      sideBody: "Introduced where it reduces load, measured by the work it removes.",
      items: [
        { id: "siteagent", title: "SiteAgent for Oqtane", body: "Administer your Oqtane site by asking: inspect, diagnose, plan and run approved actions with governance and audit trails.", href: "/products/siteagent", icon: "shield" },
        { id: "voice-agents", title: "AI Voice Agents", body: "Agents that answer calls, qualify leads and book appointments.", href: "/ai-voice-agents", icon: "wave" },
        { id: "workforce", title: "AI Workforce Platform", body: "AI assistants that support employees across daily tasks.", href: "/products/ai-workforce-platform", icon: "sparkles" },
        { id: "call-center", title: "AI Call Center Platform", body: "Routing, transcription and assistance for contact centers.", href: "/products/ai-call-center-platform", icon: "phone" },
        { id: "trading", title: "AI Trading Platform", body: "Signals, analysis and monitoring for trading operations.", href: "/products/ai-trading-platform", icon: "chart" },
        { id: "integration", title: "System Integration", body: "APIs, webhooks and data sync between your applications.", icon: "plug" },
        { id: "automation", title: "Workflow Automation", body: "Approvals, document processing, notifications and reporting.", icon: "workflow" },
      ],
    },
    why: {
      pill: "Why ZillionAI",
      title: "Automation Built for Scale",
      body: "AI and automation designed around measurable outcomes and clear human hand-offs.",
      items: [
        { title: "Human hand-off", body: "Agents escalate to your team with full context.", icon: "users" },
        { title: "Connected data", body: "Every action updates the right system automatically.", icon: "plug" },
        { title: "Measured results", body: "Dashboards track automated work and waiting items.", icon: "chart" },
      ],
    },
    useCases: {
      pill: "Best-fit use cases",
      title: "Where AI and automation help most",
      items: [
        { title: "High call volumes", body: "Answer, qualify and route calls in Arabic and English." },
        { title: "Disconnected systems", body: "Stop re-typing orders, customers and stock between tools." },
        { title: "Slow approvals", body: "Route requests automatically and remind the right people." },
        { title: "Manual reporting", body: "Build live dashboards from the systems you already run." },
      ],
      side: { label: "Built for operations teams", title: "AI & Automation", body: "Connect your teams, systems and customers with AI that acts.", checks: ["Start with one workflow", "Expand as results show", "Keep humans in control"] },
    },
    cta: { title: "Ready to get started?", body: "Tell us which work you want to automate and we'll recommend the agents, integrations and rollout plan.", primary: "Request Demo", secondary: "Contact us" },
  },
  "hardware-procurement": {
    seoTitle: "Hardware Procurement",
    seoDescription: "Sourcing, buying and selling business IT hardware with ZillionAI: laptops, servers, networking, printers and meeting rooms.",
    hero: {
      badge: "Hardware procurement",
      title: "Business IT Hardware",
      accent: "Sourced for You",
      body: "Sourcing, buying and selling business IT hardware, from a handful of laptops to full office rollouts, matched to the software your teams run.",
      primary: "Talk to us",
      secondary: "Request a quote",
      card: {
        title: "Built for every rollout",
        body: "One partner for the devices and the software on them.",
        checks: ["Sourcing to your specification", "Delivery and setup", "Buy-back of used equipment"],
      },
    },
    capabilities: {
      pill: "Procurement capabilities",
      title: "Everything your team needs to work",
      body: "Tell us the roles, users and locations. We source the right equipment and prepare it for your software.",
      sideLabel: "Hardware procurement",
      sideBody: "Sourcing, buying and selling business IT hardware with one point of contact.",
      items: [
        { id: "laptops", title: "Laptops & Desktops", body: "Business laptops and workstations specified by role and workload.", icon: "laptop" },
        { id: "servers", title: "Servers & Storage", body: "Rack and tower servers, storage and backup for on-site systems.", icon: "server" },
        { id: "networking", title: "Networking & Wi-Fi", body: "Switches, firewalls, access points and structured cabling needs.", icon: "wifi" },
        { id: "printers", title: "Printers & Peripherals", body: "Printers, scanners, docks, monitors and accessories.", icon: "printer" },
        { id: "displays", title: "Displays & Meeting Rooms", body: "Screens, cameras and audio for meeting and training rooms.", icon: "monitor" },
        { id: "resale", title: "Buy-back & Resale", body: "We buy and resell used business equipment when you upgrade.", icon: "refresh" },
      ],
    },
    why: {
      pill: "Why ZillionAI",
      title: "Hardware Matched to Your Software",
      body: "Devices specified for the applications and AI tools your teams will actually run.",
      items: [
        { title: "Right specification", body: "Equipment sized for real workloads, not guesswork.", icon: "check" },
        { title: "Ready on day one", body: "Delivered and prepared for your software.", icon: "zap" },
        { title: "Full lifecycle", body: "From purchase to buy-back when you upgrade.", icon: "refresh" },
      ],
    },
    useCases: {
      pill: "Best-fit use cases",
      title: "Where hardware procurement helps most",
      items: [
        { title: "New office or branch", body: "Equip a new location with devices, network and meeting rooms." },
        { title: "Team growth", body: "Add laptops and accessories as you hire, to one standard." },
        { title: "Infrastructure refresh", body: "Replace ageing servers, storage and network equipment." },
        { title: "Upgrades with resale", body: "Offset new equipment by selling the devices you retire." },
      ],
      side: { label: "Built for every rollout", title: "Hardware Procurement", body: "Sourcing, buying and selling business IT hardware.", checks: ["Quotes to your specification", "Delivery and setup", "Buy-back of used equipment"] },
    },
    cta: { title: "Ready to get started?", body: "Share the users, locations and equipment you need and our team will prepare a quote.", primary: "Request a Quote", secondary: "Contact us" },
  },
};

export default en;
export type ZillionCopy = typeof en;
