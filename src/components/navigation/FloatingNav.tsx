import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { BrandLogo } from "@/components/navigation/BrandLogo";
import { ActionCta } from "@/components/ui/ActionCta";
import { getNavigation, getProductsByCategory, getSite } from "@/lib/content/repository";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

export function FloatingNav() {
  const nav = getNavigation();
  const site = getSite();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [preview, setPreview] = useState<Product | undefined>();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const productsItem = nav.primary.find((item) => item.mega);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-4 md:pt-6">
      <div ref={wrapRef} className="pointer-events-auto relative w-full max-w-5xl">
        <div className="glass-nav flex items-center justify-between rounded-full py-2 pr-2 pl-4 md:pl-6">
          <BrandLogo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.primary.map((item) =>
              item.mega ? (
                <button
                  key={item.id}
                  type="button"
                  className={cn(
                    "rounded-full px-3 py-2 text-sm text-muted hover:text-mist",
                    openMenu === item.id && "text-mist",
                  )}
                  aria-expanded={openMenu === item.id}
                  onClick={() => setOpenMenu(item.id)}
                  onMouseEnter={() => setOpenMenu(item.id)}
                >
                  {item.label}
                </button>
              ) : (
                <NavLink
                  key={item.id}
                  to={item.href}
                  className={({ isActive }) =>
                    cn("rounded-full px-3 py-2 text-sm text-muted hover:text-mist", isActive && "text-mist")
                  }
                  onMouseEnter={() => setOpenMenu(null)}
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ActionCta cta={{ label: nav.cta.label, action: nav.cta.action }} />
            </div>
            <button
              type="button"
              className="mr-1 grid h-10 w-10 place-items-center rounded-full border border-line text-mist lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((value) => !value)}
            >
              <span aria-hidden className="flex flex-col gap-1">
                <span className="block h-px w-4 bg-mist" />
                <span className="block h-px w-4 bg-mist" />
              </span>
            </button>
          </div>
        </div>

        {openMenu === productsItem?.id && productsItem.groups ? (
          <div
            className="mega-panel absolute inset-x-0 top-[calc(100%+10px)] hidden rounded-[32px] p-5 lg:block"
            onMouseLeave={() => setOpenMenu(null)}
          >
            <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
              <div className="grid max-h-[62vh] gap-6 overflow-auto pr-1 md:grid-cols-2">
                {productsItem.groups.map((group) => {
                  const products = getProductsByCategory(group.filter.category);
                  return (
                    <div key={group.id}>
                      <p className="mb-3 text-[11px] tracking-[0.16em] text-muted uppercase">{group.label}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {products.map((product) => (
                          <Link
                            key={product.slug}
                            to={`/products/${product.slug}`}
                            className="rounded-2xl border border-transparent p-2 hover:border-line hover:bg-white/5"
                            onMouseEnter={() => setPreview(product)}
                            onFocus={() => setPreview(product)}
                          >
                            <div className="visual-frame mb-2 h-16 overflow-hidden rounded-xl">
                              <img src={product.hero.visual} alt="" className="h-full w-full object-cover" />
                            </div>
                            <p className="text-sm leading-5 text-mist">{product.name}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="overflow-hidden rounded-[24px] border border-line bg-ink p-4">
                {preview ? (
                  <>
                    <div className="visual-frame h-44 overflow-hidden rounded-2xl">
                      <img src={preview.hero.visual} alt="" className="h-full w-full object-cover" />
                    </div>
                    <h3 className="mt-4 font-display text-xl text-mist">{preview.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{preview.tagline}</p>
                    <Link to={`/products/${preview.slug}`} className="mt-4 inline-flex text-sm text-accent-strong">
                      {site.labels.viewDetails} →
                    </Link>
                  </>
                ) : (
                  <p className="text-sm text-muted">Hover a product to preview.</p>
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Link to="/products" className="text-sm text-accent-strong">
                {site.labels.viewAllProducts} →
              </Link>
            </div>
          </div>
        ) : null}

        {mobileOpen ? (
          <div className="glass-nav mt-2 max-h-[78vh] overflow-auto rounded-[28px] p-4 lg:hidden" role="dialog" aria-label="Mobile menu">
            <div className="grid gap-3">
              {nav.primary.map((item) => (
                <div key={item.id}>
                  <Link to={item.href} className="block py-2 text-mist" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                  {item.groups
                    ? item.groups.map((group) => (
                        <div key={group.id} className="mb-3 pl-2">
                          <p className="text-[11px] tracking-[0.16em] text-muted uppercase">{group.label}</p>
                          {getProductsByCategory(group.filter.category).map((product) => (
                            <Link
                              key={product.slug}
                              to={`/products/${product.slug}`}
                              className="block py-1 text-sm text-muted"
                              onClick={() => setMobileOpen(false)}
                            >
                              {product.name}
                            </Link>
                          ))}
                        </div>
                      ))
                    : null}
                </div>
              ))}
              <ActionCta cta={{ label: nav.cta.label, action: nav.cta.action }} />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
