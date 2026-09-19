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
              className="rounded-[24px] border border-line px-5 py-6 hover:border-accent/50"
            >
              <h3 className="font-display text-lg text-mist">{industry.name}</h3>
              <p className="mt-2 text-sm text-muted">{industry.tagline}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
