import { Link } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/inner/PageHero";
import { useCopy } from "@/i18n/LanguageProvider";
import { getSolutions } from "@/lib/content/repository";

export function SolutionsPage() {
  const solutions = getSolutions();
  const hero = useCopy().pageHeroes.solutions;
  return (
    <>
      <Seo path="/solutions" title="Solutions" description="Outcome-led ways to combine ZillionAI products." />
      <PageHero badge={hero.badge} badgeIcon="zap" title={hero.title} accent={hero.accent} body={hero.body} image="/images/solutions/intelligent-operations.png" compact />
      <Container className="py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              to={`/solutions/${solution.slug}`}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              {solution.visual ? (
                <div className="visual-frame h-40 overflow-hidden">
                  <img src={solution.visual} alt="" width={800} height={450} className="h-full w-full object-cover" />
                </div>
              ) : null}
              <div className="p-6">
                <h2 className="font-heading text-2xl font-bold text-slate-900">{solution.name}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{solution.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
