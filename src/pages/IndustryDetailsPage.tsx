import { Link, Navigate, useParams } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/inner/PageHero";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/products/ProductCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { getIndustryBySlug, getProductsForIndustry } from "@/lib/content/repository";

export function IndustryDetailsPage() {
  const { slug } = useParams();
  const industry = slug ? getIndustryBySlug(slug) : undefined;
  if (!industry) return <Navigate to="/industries" replace />;
  const products = getProductsForIndustry(industry.slug);

  return (
    <>
      <Seo path={`/industries/${industry.slug}`} title={industry.name} description={industry.description} image={industry.heroVisual} />
      <PageHero badge="Industry" badgeIcon="building" title={industry.name} body={industry.description} image={industry.heroVisual} compact />
      <Container className="py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <p className="mt-8 text-sm">
          <Link to="/industries" className="font-semibold text-[#182793]">
            All industries
          </Link>
        </p>
      </Container>
      <FinalCta />
    </>
  );
}
