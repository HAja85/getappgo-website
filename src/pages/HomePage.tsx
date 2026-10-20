import { Seo } from "@/components/seo/Seo";
import { HomeHero } from "@/components/home/HomeHero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { SoftwareCarousel } from "@/components/home/SoftwareCarousel";
import { AutomationSimulator } from "@/components/home/AutomationSimulator";
import { HardwareSourcing } from "@/components/home/HardwareSourcing";
import { PoweredByAi } from "@/components/home/PoweredByAi";
import { useCopy } from "@/i18n/LanguageProvider";

/**
 * Section order follows the reference homepage:
 * hero → what we do (+ marquee, trust card) → core service carousel → live simulator →
 * direct sourcing tiles → powered-by-AI horizontal track → footer.
 * (Awards and Insights were removed by request.)
 */
export function HomePage() {
  const copy = useCopy();
  return (
    <>
      <Seo path="/" title={undefined} description={copy.meta.homeDescription} />
      <HomeHero />
      <WhatWeDo />
      <SoftwareCarousel />
      <AutomationSimulator />
      <HardwareSourcing />
      <PoweredByAi />
    </>
  );
}
