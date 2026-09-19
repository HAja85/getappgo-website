import { Link } from "react-router";
import { getSite } from "@/lib/content/repository";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  const site = getSite();
  return (
    <Link to="/" className="flex items-center gap-2 text-mist" aria-label={site.brand.name}>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-semibold text-white">
        {site.brand.name.slice(0, 1)}
      </span>
      {compact ? <span className="sr-only">{site.brand.name}</span> : <span className="font-display text-base font-semibold tracking-tight">{site.brand.name}</span>}
    </Link>
  );
}
