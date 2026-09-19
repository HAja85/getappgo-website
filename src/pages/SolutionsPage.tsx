import { Link } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getSolutions } from "@/lib/content/repository";

export function SolutionsPage() {
  const solutions = getSolutions();
  return (
    <>
      <Seo path="/solutions" title="Solutions" description="Outcome-led ways to combine GetAppGo products." />
      <Container className="pb-20">
        <SectionHeader
          align="left"
          eyebrow="Solutions"
          title="Start from the outcome."
          description="Each solution is a lens over the same product catalog — not a second set of applications."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              to={`/solutions/${solution.slug}`}
              className="rounded-[28px] border border-line bg-ink-soft p-6 hover:border-accent/50"
            >
              <h2 className="font-display text-2xl text-mist">{solution.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{solution.tagline}</p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
