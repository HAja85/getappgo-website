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
              className="overflow-hidden rounded-[28px] border border-line bg-ink-soft hover:border-accent/50"
            >
              {solution.visual ? (
                <div className="visual-frame h-36 overflow-hidden">
                  <img src={solution.visual} alt="" width={800} height={450} className="h-full w-full object-cover" />
                </div>
              ) : null}
              <div className="p-6">
                <h3 className="font-display text-xl text-mist">{solution.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{solution.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
