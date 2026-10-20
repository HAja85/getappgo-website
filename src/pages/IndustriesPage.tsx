import { Link } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/inner/PageHero";
import { useCopy } from "@/i18n/LanguageProvider";
import { getIndustries } from "@/lib/content/repository";

export function IndustriesPage() {
  const industries = getIndustries();
  const hero = useCopy().pageHeroes.industries;
  return (
    <>
      <Seo path="/industries" title="Industries" description="Discover ZillionAI products by industry." />
      <PageHero badge={hero.badge} badgeIcon="building" title={hero.title} accent={hero.accent} body={hero.body} image="/images/industries/enterprise-operations.png" compact />
      <Container className="py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              to={`/industries/${industry.slug}`}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="visual-frame h-40 overflow-hidden">
                <img src={industry.heroVisual} alt="" width={800} height={450} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <h2 className="font-heading text-xl font-bold text-slate-900">{industry.name}</h2>
                <p className="mt-2 text-sm text-muted">{industry.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
