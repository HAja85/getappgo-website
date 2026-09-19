import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAiVoice } from "@/lib/content/repository";
import { useVoiceScene } from "@/components/ai-voice/voice-scene";
import { cn } from "@/lib/cn";

export function AgentCollaboration() {
  const copy = getAiVoice().collaboration;
  const { step, locale } = useVoiceScene();

  return (
    <section className="py-16">
      <Container>
        <SectionHeader eyebrow={copy.eyebrow} title={copy.headline} description={copy.description} />
        <div className="mt-10 rounded-[32px] border border-line bg-ink-soft/40 p-5 md:p-8">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {copy.nodes.map((node, index) => {
              const active = node.kind === "customer" || step.activeNodes.includes(node.id);
              return (
                <li key={node.id} className="flex flex-col">
                  {index > 0 ? (
                    <span className="mx-auto mb-2 h-5 w-px bg-accent/45 md:hidden" aria-hidden="true" />
                  ) : null}
                  <div
                    className={cn(
                      "flex min-h-[7.5rem] flex-col justify-center rounded-2xl border px-3 py-4 text-center transition-colors",
                      active ? "border-accent/70 bg-accent/10" : "border-line bg-ink/30",
                    )}
                  >
                    <p className="text-[11px] tracking-[0.14em] text-muted uppercase">{node.kind}</p>
                    <p className="mt-2 font-display text-sm text-mist md:text-base">{node.label}</p>
                    {node.kind === "customer" ? (
                      <p
                        className={cn("mt-3 text-sm text-accent-strong", locale === "ar" && "font-arabic")}
                        dir={locale === "ar" ? "rtl" : "ltr"}
                        lang={locale === "ar" ? "ar" : "en"}
                      >
                        “{copy.customerPrompt[locale]}”
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-center text-sm text-muted">
            Arabic · English conversation · agents hand the work to CRM
          </p>
        </div>
      </Container>
    </section>
  );
}
