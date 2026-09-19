import { Link } from "react-router";
import type { Product } from "@/types";
import { getSite } from "@/lib/content/repository";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  product: Product;
  onPreview?: (product: Product) => void;
  compact?: boolean;
};

export function ProductCard({ product, onPreview, compact = false }: ProductCardProps) {
  const labels = getSite().labels;

  return (
    <Link
      to={`/products/${product.slug}`}
      onMouseEnter={() => onPreview?.(product)}
      onFocus={() => onPreview?.(product)}
      className={cn(
        "product-card group block overflow-hidden rounded-[24px] transition-transform duration-300",
        compact ? "p-3" : "p-4",
      )}
    >
      <div className={cn("visual-frame overflow-hidden rounded-[18px]", compact ? "h-24" : "h-40")}>
        <img
          src={product.hero.visual}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-4 text-[11px] tracking-[0.16em] text-accent-strong uppercase">
        {product.type === "ai-agent" ? "AI product" : "Business software"}
      </p>
      <h3 className="mt-1 font-display text-lg font-semibold text-mist">{product.name}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{product.tagline}</p>
      {!compact ? (
        <span className="mt-4 inline-flex text-sm text-accent-strong">{labels.viewDetails} →</span>
      ) : null}
    </Link>
  );
}
