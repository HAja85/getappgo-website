import { Link, Navigate, useParams } from "react-router";
import { Seo } from "@/components/seo/Seo";
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
      <Seo path={`/solutions/${solution.slug}`} title={solution.name} description={solution.description} />
      <Container className="pb-12">
        <p className="text-xs tracking-[0.18em] text-accent-strong uppercase">Solution</p>
        <h1 className="font-display mt-4 max-w-3xl text-4xl text-white">{solution.name}</h1>
        <p className="mt-4 max-w-2xl text-muted">{solution.description}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <p className="mt-8 text-sm">
          <Link to="/solutions" className="text-accent-strong">
            All solutions
          </Link>
        </p>
      </Container>
      <FinalCta />
    </>
  );
}
