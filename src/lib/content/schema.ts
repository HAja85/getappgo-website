import { z } from "zod";

const ctaActionSchema = z.enum(["demo", "expert", "whatsapp", "route"]);

export const ctaSchema = z.object({
  label: z.string(),
  action: ctaActionSchema.optional(),
  href: z.string().optional(),
});

const textBlockSchema = z.object({
  title: z.string(),
  body: z.string(),
});

const sectionTypeSchema = z.enum([
  "hero",
  "overview",
  "capabilities",
  "workflow",
  "modules",
  "benefits",
  "integrations",
  "industries",
  "use-cases",
  "conversation",
  "how-it-works",
  "faqs",
  "related",
  "cta",
]);

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  shortName: z.string().optional(),
  type: z.enum(["business-software", "ai-agent"]),
  category: z.enum(["business-software", "ai-products"]),
  status: z.enum(["active", "coming-soon"]),
  tagline: z.string(),
  description: z.string(),
  hero: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    subhead: z.string(),
    visual: z.string(),
    visualAlt: z.string(),
  }),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    ogImage: z.string().optional(),
  }),
  overview: z.string(),
  features: z.array(textBlockSchema),
  capabilities: z.array(textBlockSchema),
  benefits: z.array(textBlockSchema),
  useCases: z.array(textBlockSchema),
  modules: z.array(textBlockSchema).optional(),
  workflow: z.array(textBlockSchema).optional(),
  conversation: z.array(textBlockSchema).optional(),
  howItWorks: z.array(textBlockSchema).optional(),
  industries: z.array(z.string()),
  integrations: z.array(z.object({ name: z.string(), body: z.string() })),
  related: z.array(z.string()),
  faqIds: z.array(z.string()),
  cta: z.object({
    primary: ctaSchema,
    secondary: ctaSchema.optional(),
  }),
  sections: z.array(
    z.object({
      type: sectionTypeSchema,
      title: z.string().optional(),
    }),
  ),
});

export const productsFileSchema = z.object({
  categories: z.array(
    z.object({
      id: z.enum(["business-software", "ai-products"]),
      label: z.string(),
      tagline: z.string(),
      visual: z.string().optional(),
    }),
  ),
  products: z.array(productSchema),
});

export const siteSchema = z.object({
  brand: z.object({
    name: z.string(),
    legalName: z.string(),
    tagline: z.string(),
    description: z.string(),
    logo: z.object({
      mark: z.string(),
      wordmark: z.string(),
      lockup: z.string().optional(),
    }),
  }),
  seo: z.object({
    titleTemplate: z.string(),
    defaultTitle: z.string(),
    defaultDescription: z.string(),
    ogImage: z.string(),
    canonicalOrigin: z.string(),
  }),
  hero: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    subhead: z.string(),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
    visual: z.string().optional(),
    visualAlt: z.string().optional(),
  }),
  proof: z.array(
    z.object({
      value: z.number(),
      suffix: z.string(),
      label: z.string(),
    }),
  ),
  contact: z.object({
    email: z.string(),
    phone: z.string(),
    whatsapp: z.object({
      e164: z.string(),
      display: z.string(),
      defaultMessage: z.string(),
    }),
    locations: z.array(
      z.object({
        city: z.string(),
        country: z.string(),
        label: z.string(),
      }),
    ),
  }),
  demo: z.object({
    title: z.string(),
    subtitle: z.string(),
    expertTitle: z.string(),
    expertSubtitle: z.string(),
    successTitle: z.string(),
    successBody: z.string(),
    submitMode: z.enum(["mailto", "endpoint"]),
  }),
  about: z.object({
    headline: z.string(),
    body: z.string(),
    values: z.array(textBlockSchema),
  }),
  process: z.array(
    z.object({
      step: z.number(),
      title: z.string(),
      body: z.string(),
      icon: z.string().optional(),
    }),
  ),
  social: z.object({
    linkedin: z.string(),
    x: z.string(),
  }),
  labels: z.object({
    requestDemo: z.string(),
    talkToExpert: z.string(),
    viewDetails: z.string(),
    viewAllProducts: z.string(),
    exploreProducts: z.string(),
  }),
});

export const navigationSchema = z.object({
  primary: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      href: z.string(),
      mega: z.boolean().optional(),
      groups: z
        .array(
          z.object({
            id: z.string(),
            label: z.string(),
            filter: z.object({
              category: z.enum(["business-software", "ai-products"]),
            }),
          }),
        )
        .optional(),
    }),
  ),
  cta: z.object({
    id: z.string(),
    label: z.string(),
    action: ctaActionSchema,
  }),
  footer: z.object({
    columns: z.array(
      z.object({
        title: z.string(),
        from: z.enum(["products"]).optional(),
        filter: z
          .object({
            category: z.enum(["business-software", "ai-products"]),
          })
          .optional(),
        links: z
          .array(
            z.object({
              label: z.string(),
              href: z.string(),
            }),
          )
          .optional(),
      }),
    ),
  }),
});

export const industriesFileSchema = z.object({
  industries: z.array(
    z.object({
      slug: z.string(),
      name: z.string(),
      tagline: z.string(),
      description: z.string(),
      heroVisual: z.string(),
      productSlugs: z.array(z.string()),
    }),
  ),
});

export const solutionsFileSchema = z.object({
  solutions: z.array(
    z.object({
      slug: z.string(),
      name: z.string(),
      tagline: z.string(),
      description: z.string(),
      visual: z.string().optional(),
      productSlugs: z.array(z.string()),
    }),
  ),
});

export const faqsFileSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      answer: z.string(),
    }),
  ),
});

export const testimonialsFileSchema = z.object({
  enabled: z.boolean().optional(),
  items: z.array(
    z.object({
      id: z.string(),
      quote: z.string(),
      name: z.string(),
      role: z.string(),
      company: z.string(),
      productSlugs: z.array(z.string()),
    }),
  ),
});

export const demoRequestSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  company: z.string().min(2, "Please enter your company."),
  email: z.email("Please enter a work email."),
  phone: z.string().min(6, "Please enter a phone or WhatsApp number."),
  productSlug: z.string().min(1, "Please select a product."),
  message: z.string().min(8, "Please add a short message."),
  intent: z.enum(["demo", "expert"]),
});
