export type ProductType = "business-software" | "ai-agent";
export type ProductCategory = "business-software" | "ai-products";
export type ProductStatus = "active" | "coming-soon";
export type CtaAction = "demo" | "expert" | "whatsapp" | "route";
export type DemoIntent = "demo" | "expert";
export type SubmitMode = "mailto" | "endpoint";

export interface Seo {
  title: string;
  description: string;
  ogImage?: string;
}

export interface Cta {
  label: string;
  action?: CtaAction;
  href?: string;
}

export interface TextBlock {
  title: string;
  body: string;
}

export interface ProductSection {
  type:
    | "hero"
    | "overview"
    | "capabilities"
    | "workflow"
    | "modules"
    | "benefits"
    | "integrations"
    | "industries"
    | "use-cases"
    | "conversation"
    | "how-it-works"
    | "faqs"
    | "related"
    | "cta";
  title?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  type: ProductType;
  category: ProductCategory;
  status: ProductStatus;
  tagline: string;
  description: string;
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    visual: string;
    visualAlt: string;
  };
  seo: Seo;
  overview: string;
  features: TextBlock[];
  capabilities: TextBlock[];
  benefits: TextBlock[];
  useCases: TextBlock[];
  modules?: TextBlock[];
  workflow?: TextBlock[];
  conversation?: TextBlock[];
  howItWorks?: TextBlock[];
  industries: string[];
  integrations: { name: string; body: string }[];
  related: string[];
  faqIds: string[];
  cta: { primary: Cta; secondary?: Cta };
  sections: ProductSection[];
}

export interface ProductCategoryMeta {
  id: ProductCategory;
  label: string;
  tagline: string;
}

export interface Industry {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroVisual: string;
  productSlugs: string[];
}

export interface Solution {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  productSlugs: string[];
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  productSlugs: string[];
}

export interface ProofItem {
  value: number;
  suffix: string;
  label: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  mega?: boolean;
  groups?: { id: string; label: string; filter: { category: ProductCategory } }[];
}

export interface SiteContent {
  brand: {
    name: string;
    legalName: string;
    tagline: string;
    description: string;
    logo: { mark: string; wordmark: string };
  };
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
    canonicalOrigin: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
  proof: ProofItem[];
  contact: {
    email: string;
    phone: string;
    whatsapp: {
      e164: string;
      display: string;
      defaultMessage: string;
    };
    locations: { city: string; country: string; label: string }[];
  };
  demo: {
    title: string;
    subtitle: string;
    expertTitle: string;
    expertSubtitle: string;
    successTitle: string;
    successBody: string;
    submitMode: SubmitMode;
  };
  about: {
    headline: string;
    body: string;
    values: TextBlock[];
  };
  process: { step: number; title: string; body: string }[];
  social: {
    linkedin: string;
    x: string;
  };
  labels: {
    requestDemo: string;
    talkToExpert: string;
    viewDetails: string;
    viewAllProducts: string;
    exploreProducts: string;
  };
}

export interface DemoRequest {
  name: string;
  company: string;
  email: string;
  phone: string;
  productSlug: string;
  message: string;
  intent: DemoIntent;
}

export interface NavigationContent {
  primary: NavLink[];
  cta: { id: string; label: string; action: CtaAction };
  footer: {
    columns: Array<{
      title: string;
      from?: "products";
      filter?: { category: ProductCategory };
      links?: { label: string; href: string }[];
    }>;
  };
}
