import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/products/ProductCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getProducts, getSite } from "@/lib/content/repository";

type ProductCatalogProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function ProductCatalog({
  eyebrow = "Products",
  title = "A catalog you can actually browse.",
  description,
}: ProductCatalogProps) {
  const products = getProducts();
  const site = getSite();
  return (
    <section className="py-16">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink to="/products" variant="secondary">
            {site.labels.viewAllProducts}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
