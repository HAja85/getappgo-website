import { Link } from "react-router";
import { BrandLogo } from "@/components/navigation/BrandLogo";
import { Container } from "@/components/ui/Container";
import { getNavigation, getProductsByCategory, getSite } from "@/lib/content/repository";

export function Footer() {
  const nav = getNavigation();
  const site = getSite();

  return (
    <footer className="mt-24 border-t border-line py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <BrandLogo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">{site.brand.tagline}</p>
            <a className="mt-4 block text-sm text-mist" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            <a className="mt-1 block text-sm text-mist" href={`tel:${site.contact.phone}`}>
              {site.contact.phone}
            </a>
          </div>
          {nav.footer.columns.map((column) => (
            <div key={column.title}>
              <p className="text-[11px] tracking-[0.16em] text-muted uppercase">{column.title}</p>
              <ul className="mt-4 grid gap-2">
                {column.from === "products" && column.filter
                  ? getProductsByCategory(column.filter.category).map((product) => (
                      <li key={product.slug}>
                        <Link to={`/products/${product.slug}`} className="text-sm text-muted hover:text-mist">
                          {product.name}
                        </Link>
                      </li>
                    ))
                  : column.links?.map((link) => (
                      <li key={link.href}>
                        <Link to={link.href} className="text-sm text-muted hover:text-mist">
                          {link.label}
                        </Link>
                      </li>
                    ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 text-xs text-muted">© {new Date().getFullYear()} {site.brand.legalName}</p>
      </Container>
    </footer>
  );
}
