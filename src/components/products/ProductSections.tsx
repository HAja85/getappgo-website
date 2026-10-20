import type { ReactElement } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Link } from "react-router";
import { ActionCta } from "@/components/ui/ActionCta";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHero } from "@/components/inner/PageHero";
import { CtaBand } from "@/components/inner/CtaBand";
import {
  getFaqsByIds,
  getIndustriesForProduct,
  getRelatedProducts,
} from "@/lib/content/repository";
import type { Product, ProductSection, TextBlock } from "@/types";

type SectionProps = {
  product: Product;
  section: ProductSection;
};

const registry: Record<ProductSection["type"], (props: SectionProps) => ReactElement | null> = {
  hero: ProductHero,
  overview: OverviewSection,
  capabilities: BlocksSection,
  workflow: StepsSection,
  modules: BlocksSection,
  benefits: BlocksSection,
  integrations: IntegrationsSection,
  industries: ProductIndustriesSection,
  "use-cases": BlocksSection,
  conversation: StepsSection,
  "how-it-works": StepsSection,
  faqs: FaqsSection,
  related: RelatedSection,
  cta: ProductCtaSection,
};

export function ProductSections({ product }: { product: Product }) {
  return (
    <>
      {product.sections.map((section, index) => {
        const Component = registry[section.type];
        return <Component key={`${section.type}-${index}`} product={product} section={section} />;
      })}
    </>
  );
}

function ProductHero({ product }: SectionProps) {
  return (
    <PageHero
      badge={product.hero.eyebrow}
      badgeIcon="layers"
      title={product.hero.headline}
      body={product.hero.subhead}
      image={product.hero.visual}
      actions={
        <>
          <ActionCta cta={product.cta.primary} productSlug={product.slug} />
          {product.cta.secondary ? (
            <ActionCta cta={product.cta.secondary} productSlug={product.slug} variant="secondary" className="border-white/70! bg-transparent! text-white! hover:bg-white/10!" />
          ) : null}
        </>
      }
      aside={
        <div className="overflow-hidden rounded-3xl border-4 border-white/15 bg-[#0f1235] shadow-2xl">
          <img src={product.hero.visual} alt={product.hero.visualAlt} width={1280} height={720} className="h-auto w-full max-w-xl object-cover" />
        </div>
      }
    />
  );
}

function OverviewSection({ product, section }: SectionProps) {
  return (
    <section className="py-16 even:bg-slate-50">
      <Container>
        <SectionHeader
          align="left"
          title={section.title ?? "Product overview"}
          description={product.overview}
        />
      </Container>
    </section>
  );
}

function BlocksSection({ product, section }: SectionProps) {
  const blocks = blocksFor(product, section.type);
  if (blocks.length === 0) return null;
  return (
    <section className="py-16 even:bg-slate-50">
      <Container>
        <SectionHeader title={section.title ?? labelFor(section.type)} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {blocks.map((block) => (
            <article key={block.title} className="rounded-[24px] border border-line bg-ink-soft p-6">
              <h3 className="font-display text-lg text-mist">{block.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{block.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function StepsSection({ product, section }: SectionProps) {
  const steps =
    section.type === "conversation"
      ? product.conversation ?? []
      : section.type === "how-it-works"
        ? product.howItWorks ?? []
        : product.workflow ?? [];
  if (steps.length === 0) return null;
  return (
    <section className="py-16 even:bg-slate-50">
      <Container>
        <SectionHeader title={section.title ?? labelFor(section.type)} />
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-[24px] border border-line p-5">
              <p className="text-sm text-accent-strong">{index + 1}</p>
              <h3 className="mt-2 font-display text-lg text-mist">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function IntegrationsSection({ product }: SectionProps) {
  if (product.integrations.length === 0) return null;
  return (
    <section className="py-16 even:bg-slate-50">
      <Container>
        <SectionHeader title="Integrations" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {product.integrations.map((item) => (
            <article key={item.name} className="rounded-[24px] border border-line p-6">
              <h3 className="font-display text-lg text-mist">{item.name}</h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductIndustriesSection({ product }: SectionProps) {
  const industries = getIndustriesForProduct(product);
  if (industries.length === 0) return null;
  return (
    <section className="py-16 even:bg-slate-50">
      <Container>
        <SectionHeader title="Industries" />
        <div className="mt-8 flex flex-wrap gap-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              to={`/industries/${industry.slug}`}
              className="rounded-full border border-line px-4 py-2 text-sm text-mist hover:border-accent"
            >
              {industry.name}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FaqsSection({ product }: SectionProps) {
  const faqs = getFaqsByIds(product.faqIds);
  if (faqs.length === 0) return null;
  return (
    <section className="py-16 even:bg-slate-50">
      <Container>
        <SectionHeader title="Frequently asked questions" />
        <Accordion.Root type="single" collapsible className="mx-auto mt-10 max-w-3xl">
          {faqs.map((faq) => (
            <Accordion.Item key={faq.id} value={faq.id} className="border-b border-line py-4">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between text-left text-mist">
                  {faq.question}
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="pt-3 text-sm leading-6 text-muted">{faq.answer}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Container>
    </section>
  );
}

function RelatedSection({ product }: SectionProps) {
  const related = getRelatedProducts(product);
  if (related.length === 0) return null;
  return (
    <section className="py-16 even:bg-slate-50">
      <Container>
        <SectionHeader title="Related products" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductCtaSection({ product }: SectionProps) {
  return (
    <CtaBand
      title={`See ${product.name} in your operation.`}
      body="Request a demo or talk to an expert. WhatsApp and email stay available if you prefer a direct conversation."
      productSlug={product.slug}
    />
  );
}

function blocksFor(product: Product, type: ProductSection["type"]): TextBlock[] {
  if (type === "capabilities") return product.capabilities;
  if (type === "modules") return product.modules ?? [];
  if (type === "benefits") return product.benefits;
  if (type === "use-cases") return product.useCases;
  return [];
}

function labelFor(type: ProductSection["type"]): string {
  const labels: Record<ProductSection["type"], string> = {
    hero: "Hero",
    overview: "Overview",
    capabilities: "Capabilities",
    workflow: "Workflow",
    modules: "Modules",
    benefits: "Benefits",
    integrations: "Integrations",
    industries: "Industries",
    "use-cases": "Use cases",
    conversation: "Conversation",
    "how-it-works": "How it works",
    faqs: "FAQ",
    related: "Related",
    cta: "Demo",
  };
  return labels[type];
}
