import { Link } from "react-router";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getIndustries } from "@/lib/content/repository";

export function IndustriesRail() {
  const industries = getIndustries();
  return (
    <section className="py-16">
      <Container>
        <SectionHeader eyebrow="Industries" title="Find products by the work you run." />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              to={`/industries/${industry.slug}`}
              className="overflow-hidden rounded-[24px] border border-line hover:border-accent/50"
            >
              <div className="visual-frame h-36 overflow-hidden">
                <img src={industry.heroVisual} alt="" width={800} height={450} className="h-full w-full object-cover" />
              </div>
              <div className="px-5 py-6">
                <h3 className="font-display text-lg text-mist">{industry.name}</h3>
                <p className="mt-2 text-sm text-muted">{industry.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
