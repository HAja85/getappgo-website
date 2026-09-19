import { Seo } from "@/components/seo/Seo";
import { VoiceSceneProvider } from "@/components/ai-voice/voice-scene";
import { VoiceHero } from "@/components/ai-voice/VoiceHero";
import { AgentMarketplace } from "@/components/ai-voice/AgentMarketplace";
import { AgentOutcomes } from "@/components/ai-voice/AgentOutcomes";
import { AgentCollaboration } from "@/components/ai-voice/AgentCollaboration";
import { BusinessActionRail } from "@/components/ai-voice/BusinessActionRail";
import { PlatformSplit } from "@/components/sections/PlatformSplit";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { IndustriesRail } from "@/components/sections/IndustriesRail";
import { SolutionsPreview } from "@/components/sections/SolutionsPreview";
import { DeliveryProcess } from "@/components/sections/DeliveryProcess";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";
import { getSite } from "@/lib/content/repository";

export function HomePage() {
  const site = getSite();
  return (
    <>
      <Seo path="/" description={site.seo.defaultDescription} />
      <VoiceSceneProvider>
        <VoiceHero />
        <AgentMarketplace />
        <AgentOutcomes />
        <AgentCollaboration />
      </VoiceSceneProvider>
      <BusinessActionRail />
      <PlatformSplit />
      <ProductCatalog
        eyebrow="Business applications"
        title="Systems the agents can update."
        description="CRM, facilities, helpdesk, commerce, and custom applications remain in the same catalog."
      />
      <SolutionsPreview />
      <IndustriesRail />
      <DeliveryProcess />
      <Testimonials />
      <FinalCta />
    </>
  );
}
