import { Link } from "react-router";
import { getSite } from "@/lib/content/repository";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  const site = getSite();
  return (
    <Link to="/" className="flex items-center gap-2 text-mist" aria-label={site.brand.name}>
      <img src={site.brand.logo.mark} alt="" width={32} height={32} className="h-8 w-8" />
      {compact ? (
        <span className="sr-only">{site.brand.name}</span>
      ) : (
        <span className="font-display text-base font-semibold tracking-tight">{site.brand.name}</span>
      )}
    </Link>
  );
}
