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
              className="overflow-hidden rounded-[28px] border border-line bg-ink-soft hover:border-accent/50"
            >
              {solution.visual ? (
                <div className="visual-frame h-40 overflow-hidden">
                  <img src={solution.visual} alt="" width={800} height={450} className="h-full w-full object-cover" />
                </div>
              ) : null}
              <div className="p-6">
                <h2 className="font-display text-2xl text-mist">{solution.name}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{solution.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
