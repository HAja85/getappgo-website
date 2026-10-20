import { useSearchParams } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/inner/PageHero";
import { useCopy } from "@/i18n/LanguageProvider";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { ProductCategory } from "@/types";

export function ProductsPage() {
  const [params] = useSearchParams();
  const familyParam = params.get("family");
  const initial =
    familyParam === "business-software" || familyParam === "ai-products"
      ? (familyParam as ProductCategory)
      : "all";

  const hero = useCopy().pageHeroes.products;
  return (
    <>
      <Seo
        path="/products"
        title="Products"
        description="Explore ZillionAI business software and AI platforms."
      />
      <PageHero badge={hero.badge} badgeIcon="grid" title={hero.title} accent={hero.accent} body={hero.body} image="/images/categories/business-software.png" compact />
      <Container className="py-20">
        <div>
          <ProductGrid key={initial} initialCategory={initial} />
        </div>
      </Container>
    </>
  );
}
