import { Seo } from "@/components/seo/Seo";
import { Hero } from "@/components/hero/Hero";
import { ProofBar } from "@/components/sections/ProofBar";
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
      <Hero />
      <ProofBar />
      <PlatformSplit />
      <ProductCatalog />
      <SolutionsPreview />
      <IndustriesRail />
      <DeliveryProcess />
      <Testimonials />
      <FinalCta />
    </>
  );
}
