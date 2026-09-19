import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getCategories, getSite } from "@/lib/content/repository";

export function PlatformSplit() {
  const categories = getCategories();
  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          eyebrow="Platform"
          title="Two families. One portfolio."
          description="Explore business software and AI products from the same company — without treating them as the same kind of system."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category.id} className="rounded-[28px] border border-line bg-ink-soft p-8">
              <p className="text-[11px] tracking-[0.16em] text-accent-strong uppercase">{category.label}</p>
              <p className="mt-4 font-display text-2xl text-mist">{category.tagline}</p>
              <ButtonLink className="mt-8" to={`/products?family=${category.id}`} variant="secondary">
                {getSite().labels.exploreProducts}
              </ButtonLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
