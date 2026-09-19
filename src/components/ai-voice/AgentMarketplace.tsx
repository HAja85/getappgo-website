import { ActionCta } from "@/components/ui/ActionCta";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Waveform } from "@/components/ai-voice/Waveform";
import { getAiAgents, getAiVoice } from "@/lib/content/repository";
import type { AiVoiceAgent } from "@/types";

export function AgentMarketplace() {
  const agents = getAiAgents();
  const copy = getAiVoice().marketplace;

  return (
    <section id={copy.id} className="scroll-mt-28 py-16">
      <Container>
        <SectionHeader eyebrow={copy.eyebrow} title={copy.headline} description={copy.description} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.slug} agent={agent} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function AgentCard({ agent }: { agent: AiVoiceAgent }) {
  return (
    <article className="agent-card group rounded-[28px] border border-line p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl text-mist">{agent.name}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{agent.tagline}</p>
        </div>
        <Waveform className="voice-wave-sm opacity-80" phase="idle" bars={8} />
      </div>
      <p className="mt-4 text-[11px] tracking-[0.14em] text-accent-strong uppercase">
        {agent.languages.join(" · ")}
      </p>
      <p className="mt-3 text-sm text-muted">{agent.capabilities.join(" · ")}</p>
      <div className="agent-preview mt-4 rounded-2xl border border-line bg-ink/40 px-3 py-3">
        <p className="text-[11px] tracking-[0.14em] text-muted uppercase">Live preview</p>
        <p className="mt-2 text-sm text-mist">{agent.preview.en}</p>
        <p className="font-arabic mt-1 text-right text-sm text-mist" dir="rtl" lang="ar">
          {agent.preview.ar}
        </p>
      </div>
      <ActionCta className="mt-5" cta={agent.cta} productSlug={agent.slug} variant="secondary" />
    </article>
  );
}
