import { CtaBand } from "@/components/inner/CtaBand";
import { useCopy } from "@/i18n/LanguageProvider";

export function FinalCta({ productSlug }: { productSlug?: string }) {
  const copy = useCopy();
  return <CtaBand title={copy.about.cta.title} body={copy.about.cta.body} productSlug={productSlug} />;
}
