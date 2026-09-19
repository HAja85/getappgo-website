import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getTestimonials } from "@/lib/content/repository";

export function Testimonials() {
  const items = getTestimonials();
  if (items.length === 0) return null;

  return (
    <section className="py-16">
      <Container>
        <SectionHeader eyebrow="Proof" title="What operators say when the system is shared." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <figure key={item.id} className="rounded-[28px] border border-line bg-ink-soft p-6">
              <blockquote className="text-sm leading-6 text-mist">“{item.quote}”</blockquote>
              <figcaption className="mt-6 text-sm text-muted">
                <span className="block text-mist">{item.name}</span>
                {item.role}, {item.company}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
