import { Navigate, useParams } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { ProductSections } from "@/components/products/ProductSections";
import { getProductBySlug } from "@/lib/content/repository";

export function ProductDetailsPage() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  if (!product) return <Navigate to="/products" replace />;

  return (
    <>
      <Seo
        path={`/products/${product.slug}`}
        title={product.seo.title}
        description={product.seo.description}
        image={product.seo.ogImage ?? product.hero.visual}
      />
      <ProductSections product={product} />
    </>
  );
}
