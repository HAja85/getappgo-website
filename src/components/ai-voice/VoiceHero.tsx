import { Container } from "@/components/ui/Container";
import { ActionCta } from "@/components/ui/ActionCta";
import { VoiceConsole } from "@/components/ai-voice/VoiceConsole";
import { getSite } from "@/lib/content/repository";

export function VoiceHero() {
  const site = getSite();

  return (
    <section className="relative overflow-hidden pb-16">
      <Container>
        <div className="grid items-center gap-10 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:pt-12">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-accent-strong uppercase">{site.hero.eyebrow}</p>
            <h1 className="font-display mt-5 text-4xl leading-[1.08] font-semibold tracking-[-0.04em] whitespace-pre-line text-white md:text-6xl">
              {site.hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted md:text-lg">{site.hero.subhead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionCta cta={site.hero.primaryCta} />
              <ActionCta cta={site.hero.secondaryCta} variant="secondary" />
            </div>
          </div>
          <VoiceConsole />
        </div>
      </Container>
    </section>
  );
}
