import { Link } from "react-router";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCategories, getSite } from "@/lib/content/repository";

export function PlatformSplit() {
  const categories = getCategories();
  const labels = getSite().labels;
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
            <Link
              key={category.id}
              to={`/products?family=${category.id}`}
              className="overflow-hidden rounded-[28px] border border-line bg-ink-soft hover:border-accent/50"
            >
              {category.visual ? (
                <div className="visual-frame h-44 overflow-hidden">
                  <img src={category.visual} alt="" width={800} height={450} className="h-full w-full object-cover" />
                </div>
              ) : null}
              <div className="p-8">
                <p className="text-[11px] tracking-[0.16em] text-accent-strong uppercase">{category.label}</p>
                <p className="mt-4 font-display text-2xl text-mist">{category.tagline}</p>
                <p className="mt-8 text-sm text-accent-strong">{labels.exploreProducts} →</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
