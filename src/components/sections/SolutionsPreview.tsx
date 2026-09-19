import { Link } from "react-router";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getSolutions } from "@/lib/content/repository";

export function SolutionsPreview() {
  const solutions = getSolutions();
  return (
    <section className="py-16">
      <Container>
        <SectionHeader eyebrow="Solutions" title="Start from the outcome, then pick the products." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              to={`/solutions/${solution.slug}`}
              className="rounded-[28px] border border-line bg-ink-soft p-6 hover:border-accent/50"
            >
              <h3 className="font-display text-xl text-mist">{solution.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{solution.tagline}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
