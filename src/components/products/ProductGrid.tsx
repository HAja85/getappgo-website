import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ProductCard } from "@/components/products/ProductCard";
import { getCategories, getProducts, getSite } from "@/lib/content/repository";
import { cn } from "@/lib/cn";
import type { ProductCategory } from "@/types";

export function ProductGrid({ initialCategory }: { initialCategory?: ProductCategory | "all" }) {
  const products = getProducts();
  const categories = getCategories();
  const [family, setFamily] = useState<ProductCategory | "all">(initialCategory ?? "all");

  const visible = useMemo(
    () => (family === "all" ? products : products.filter((product) => product.category === family)),
    [family, products],
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterChip active={family === "all"} onClick={() => setFamily("all")}>
          All
        </FilterChip>
        {categories.map((category) => (
          <FilterChip
            key={category.id}
            active={family === category.id}
            onClick={() => setFamily(category.id)}
          >
            {category.label}
          </FilterChip>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted">
        Looking for something else?{" "}
        <Link to="/contact" className="text-accent-strong">
          {getSite().labels.talkToExpert}
        </Link>
      </p>
    </div>
  );
}

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm",
        active ? "border-accent bg-accent/15 text-mist" : "border-line text-muted hover:text-mist",
      )}
    >
      {children}
    </button>
  );
}
