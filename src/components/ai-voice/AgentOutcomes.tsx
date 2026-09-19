import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAiVoice } from "@/lib/content/repository";
import { useReveal } from "@/hooks/useReveal";
import { useRef } from "react";

export function AgentOutcomes() {
  const copy = getAiVoice().outcomes;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="py-16">
      <Container>
        <SectionHeader eyebrow={copy.eyebrow} title={copy.headline} description={copy.description} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {copy.items.map((item) => (
            <article key={item.id} className="rounded-[28px] border border-line bg-ink-soft/50 p-6">
              <h3 className="font-display text-2xl text-mist">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
              <ol className="mt-6 flex flex-wrap items-center gap-2" aria-label={`${item.title} workflow`}>
                {item.steps.map((step, index) => (
                  <li key={step} className="flex items-center gap-2">
                    {index > 0 ? (
                      <span className="text-accent-strong" aria-hidden="true">
                        →
                      </span>
                    ) : null}
                    <span className="rounded-full border border-line px-3 py-1.5 text-[11px] tracking-[0.12em] text-mist uppercase">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
