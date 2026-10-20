import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/inner/PageHero";
import { CtaBand } from "@/components/inner/CtaBand";
import { VoiceSceneProvider } from "@/components/ai-voice/voice-scene";
import { VoiceConsole } from "@/components/ai-voice/VoiceConsole";
import { AgentMarketplace } from "@/components/ai-voice/AgentMarketplace";
import { AgentOutcomes } from "@/components/ai-voice/AgentOutcomes";
import { AgentCollaboration } from "@/components/ai-voice/AgentCollaboration";
import { BusinessActionRail } from "@/components/ai-voice/BusinessActionRail";
import { useDemo } from "@/components/contact/DemoProvider";
import { Icon } from "@/components/zillion/Icon";
import { useCopy } from "@/i18n/LanguageProvider";
import { getSite } from "@/lib/content/repository";

/** The original AI voice agent experience (bilingual console, marketplace, outcomes, collaboration), kept intact. */
export function VoiceAgentsPage() {
  const copy = useCopy();
  const site = getSite();
  const { openDemo } = useDemo();
  const hero = copy.pageHeroes.voice;

  return (
    <>
      <Seo path="/ai-voice-agents" title="AI Voice Agents" description={site.seo.defaultDescription} />
      <VoiceSceneProvider>
        <PageHero
          badge={hero.badge}
          badgeIcon="wave"
          title={hero.title}
          accent={hero.accent}
          body={hero.body}
          image="/images/products/ai-call-center-platform.png"
          actions={
            <>
              <a href="#ai-voice-workforce" className="btn-primary px-5 py-2.5 text-sm">
                {site.hero.primaryCta.label}
                <Icon name="arrowRight" size={16} className="rtl:-scale-x-100" />
              </a>
              <button
                type="button"
                onClick={() => openDemo({ intent: "expert" })}
                className="focus-ring rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                {site.hero.secondaryCta.label}
              </button>
            </>
          }
          aside={
            <div className="theme-dark w-full max-w-xl">
              <VoiceConsole />
            </div>
          }
        />
        <AgentMarketplace />
        <AgentOutcomes />
        <AgentCollaboration />
      </VoiceSceneProvider>
      <BusinessActionRail />
      <CtaBand title={hero.title + " " + hero.accent} body={hero.body} />
    </>
  );
}
