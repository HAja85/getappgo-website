import { Link, Navigate, useParams } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/inner/PageHero";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/products/ProductCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { getProductsForSolution, getSolutionBySlug } from "@/lib/content/repository";

export function SolutionDetailsPage() {
  const { slug } = useParams();
  const solution = slug ? getSolutionBySlug(slug) : undefined;
  if (!solution) return <Navigate to="/solutions" replace />;
  const products = getProductsForSolution(solution.slug);

  return (
    <>
      <Seo path={`/solutions/${solution.slug}`} title={solution.name} description={solution.description} image={solution.visual} />
      <PageHero badge="Solution" badgeIcon="zap" title={solution.name} body={solution.description} image={solution.visual} compact />
      <Container className="py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <p className="mt-8 text-sm">
          <Link to="/solutions" className="font-semibold text-[#182793]">
            All solutions
          </Link>
        </p>
      </Container>
      <FinalCta />
    </>
  );
}
