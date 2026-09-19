import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getSite } from "@/lib/content/repository";

export function DeliveryProcess() {
  const process = getSite().process;
  return (
    <section className="py-16">
      <Container>
        <SectionHeader eyebrow="How we deliver" title="A four-step path from discovery to operations." />
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {process.map((step) => (
            <li key={step.step} className="rounded-[24px] border border-line p-5">
              <p className="text-sm text-accent-strong">Step {step.step}</p>
              <h3 className="mt-2 font-display text-lg text-mist">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
