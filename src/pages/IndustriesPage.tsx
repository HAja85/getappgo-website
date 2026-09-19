import { Link } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getIndustries } from "@/lib/content/repository";

export function IndustriesPage() {
  const industries = getIndustries();
  return (
    <>
      <Seo path="/industries" title="Industries" description="Discover GetAppGo products by industry." />
      <Container className="pb-20">
        <SectionHeader
          align="left"
          eyebrow="Industries"
          title="Find the catalog through your vertical."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              to={`/industries/${industry.slug}`}
              className="rounded-[24px] border border-line p-6 hover:border-accent/50"
            >
              <h2 className="font-display text-xl text-mist">{industry.name}</h2>
              <p className="mt-2 text-sm text-muted">{industry.tagline}</p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
