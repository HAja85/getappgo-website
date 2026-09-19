import { Link, Navigate, useParams } from "react-router";
import { Seo } from "@/components/seo/Seo";
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
      <Seo path={`/industries/${industry.slug}`} title={industry.name} description={industry.description} />
      <Container className="pb-12">
        <p className="text-xs tracking-[0.18em] text-accent-strong uppercase">Industry</p>
        <h1 className="font-display mt-4 text-4xl text-white">{industry.name}</h1>
        <p className="mt-4 max-w-2xl text-muted">{industry.description}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <p className="mt-8 text-sm">
          <Link to="/industries" className="text-accent-strong">
            All industries
          </Link>
        </p>
      </Container>
      <FinalCta />
    </>
  );
}
