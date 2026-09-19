import { useSearchParams } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { ProductCategory } from "@/types";

export function ProductsPage() {
  const [params] = useSearchParams();
  const familyParam = params.get("family");
  const initial =
    familyParam === "business-software" || familyParam === "ai-products"
      ? (familyParam as ProductCategory)
      : "all";

  return (
    <>
      <Seo
        path="/products"
        title="Products"
        description="Explore GetAppGo business software and AI platforms."
      />
      <Container className="pb-20">
        <SectionHeader
          align="left"
          eyebrow="Catalog"
          title="Products"
          description="Business systems and AI platforms in one portfolio. Filter by family, then open any product for details."
        />
        <div className="mt-10">
          <ProductGrid key={initial} initialCategory={initial} />
        </div>
      </Container>
    </>
  );
}
