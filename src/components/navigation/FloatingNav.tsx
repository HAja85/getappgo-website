import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { BrandLogo } from "@/components/navigation/BrandLogo";
import { ActionCta } from "@/components/ui/ActionCta";
import { useDemo } from "@/components/contact/DemoProvider";
import {
  getAiAgents,
  getIndustries,
  getNavigation,
  getProductsByCategory,
  getSite,
  getSolutions,
} from "@/lib/content/repository";
import { handleHashHref } from "@/lib/scroll-to";
import { cn } from "@/lib/cn";
import type { NavLink as NavItem, Product } from "@/types";

export function FloatingNav() {
  const nav = getNavigation();
  const site = getSite();
  const { openDemo } = useDemo();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [preview, setPreview] = useState<Product | undefined>();
  const wrapRef = useRef<HTMLDivElement>(null);
  const activeItem = nav.primary.find((item) => item.id === openMenu);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  function closeAll() {
    setOpenMenu(null);
    setMobileOpen(false);
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-4 md:pt-5">
      <div
        ref={wrapRef}
        className="pointer-events-auto relative w-full max-w-7xl"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="glass-nav grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-full py-2 pr-2 pl-4 md:pl-5">
          <div className="shrink-0">
            <BrandLogo />
          </div>
          <nav className="hidden min-w-0 items-center justify-center overflow-x-auto lg:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Primary">
            {nav.primary.map((item) =>
              item.mega ? (
                <button
                  key={item.id}
                  type="button"
                  className={cn(
                    "inline-flex min-h-11 items-center gap-1 rounded-full px-2 py-2 text-sm whitespace-nowrap text-muted hover:text-mist xl:px-3",
                    openMenu === item.id && "text-mist",
                  )}
                  aria-expanded={openMenu === item.id}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(item.id)}
                  onMouseEnter={() => setOpenMenu(item.id)}
                >
                  {item.label}
                  <ChevronDown />
                </button>
              ) : (
                <NavLink
                  key={item.id}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex min-h-11 items-center rounded-full px-2 py-2 text-sm whitespace-nowrap text-muted hover:text-mist xl:px-3",
                      item.id === "contact" && "hidden xl:inline-flex",
                      isActive && "text-mist",
                    )
                  }
                  onMouseEnter={() => setOpenMenu(null)}
                  onClick={(event) => {
                    if (handleHashHref(item.href)) event.preventDefault();
                    closeAll();
                  }}
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <ActionCta cta={{ label: nav.cta.label, action: nav.cta.action }} />
            <button
              type="button"
              className="mr-1 grid h-11 w-11 place-items-center rounded-full border border-line text-mist lg:hidden"
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

        {activeItem?.mega ? (
          <div
            className="mega-panel absolute inset-x-0 top-[calc(100%+8px)] hidden rounded-[32px] p-5 lg:block before:absolute before:inset-x-0 before:-top-3 before:h-3"
          >
            {activeItem.source === "solutions" ? (
              <CatalogMega
                eyebrow="Solutions"
                items={getSolutions().map((item) => ({
                  href: `/solutions/${item.slug}`,
                  name: item.name,
                  tagline: item.tagline,
                  visual: item.visual ?? "/images/og/default.png",
                }))}
                allHref="/solutions"
                allLabel="View all solutions"
                onNavigate={closeAll}
              />
            ) : null}
            {activeItem.source === "industries" ? (
              <CatalogMega
                eyebrow="Industries"
                items={getIndustries().map((item) => ({
                  href: `/industries/${item.slug}`,
                  name: item.name,
                  tagline: item.tagline,
                  visual: item.heroVisual,
                }))}
                allHref="/industries"
                allLabel="View all industries"
                onNavigate={closeAll}
              />
            ) : null}
            {activeItem.source === "products" && activeItem.groups ? (
              <ProductsMega
                item={activeItem}
                preview={preview}
                setPreview={setPreview}
                onNavigate={closeAll}
                onExploreAgent={(slug) => {
                  closeAll();
                  openDemo({ productSlug: slug });
                }}
                viewDetails={site.labels.viewDetails}
                viewAll={site.labels.viewAllProducts}
              />
            ) : null}
          </div>
        ) : null}

        {mobileOpen ? (
          <div className="glass-nav mt-2 max-h-[78vh] overflow-auto rounded-[28px] p-4 lg:hidden" role="dialog" aria-label="Mobile menu">
            <div className="grid gap-3">
              {nav.primary.map((item) => (
                <div key={item.id}>
                  <Link
                    to={item.href}
                    className="block min-h-11 py-2 text-mist"
                    onClick={(event) => {
                      if (handleHashHref(item.href)) event.preventDefault();
                      closeAll();
                    }}
                  >
                    {item.label}
                  </Link>
                  {item.source === "products" && item.groups
                    ? item.groups.map((group) => (
                        <div key={group.id} className="mb-3 pl-2">
                          <p className="text-[11px] tracking-[0.16em] text-muted uppercase">{group.label}</p>
                          {getProductsByCategory(group.filter.category).map((product) => (
                            <Link
                              key={product.slug}
                              to={`/products/${product.slug}`}
                              className="block min-h-11 py-2 text-sm text-muted"
                              onClick={closeAll}
                            >
                              {product.name}
                            </Link>
                          ))}
                        </div>
                      ))
                    : null}
                  {item.source === "products" ? (
                    <div className="mb-3 pl-2">
                      <p className="text-[11px] tracking-[0.16em] text-muted uppercase">AI Voice Agents</p>
                      {getAiAgents().map((agent) => (
                        <button
                          key={agent.slug}
                          type="button"
                          className="block min-h-11 w-full py-2 text-left text-sm text-muted"
                          onClick={() => {
                            closeAll();
                            openDemo({ productSlug: agent.slug });
                          }}
                        >
                          {agent.name}
                        </button>
                      ))}
                    </div>
                  ) : null}
                  {item.source === "solutions"
                    ? getSolutions().map((solution) => (
                        <Link
                          key={solution.slug}
                          to={`/solutions/${solution.slug}`}
                          className="block min-h-11 py-2 pl-2 text-sm text-muted"
                          onClick={closeAll}
                        >
                          {solution.name}
                        </Link>
                      ))
                    : null}
                  {item.source === "industries"
                    ? getIndustries().map((industry) => (
                        <Link
                          key={industry.slug}
                          to={`/industries/${industry.slug}`}
                          className="block min-h-11 py-2 pl-2 text-sm text-muted"
                          onClick={closeAll}
                        >
                          {industry.name}
                        </Link>
                      ))
                    : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function ChevronDown() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" className="opacity-70">
      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ProductsMega({
  item,
  preview,
  setPreview,
  onNavigate,
  onExploreAgent,
  viewDetails,
  viewAll,
}: {
  item: NavItem;
  preview?: Product;
  setPreview: (product: Product) => void;
  onNavigate: () => void;
  onExploreAgent: (slug: string) => void;
  viewDetails: string;
  viewAll: string;
}) {
  const agents = getAiAgents();

  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
      <div className="grid max-h-[62vh] gap-6 overflow-auto pr-1 md:grid-cols-2 xl:grid-cols-3">
        {item.groups?.map((group) => {
          const products = getProductsByCategory(group.filter.category);
          return (
            <div key={group.id}>
              <p className="mb-3 text-[11px] tracking-[0.16em] text-muted uppercase">{group.label}</p>
              <div className="grid gap-2">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    to={`/products/${product.slug}`}
                    className="rounded-2xl border border-transparent p-2 hover:border-line hover:bg-white/5"
                    onMouseEnter={() => setPreview(product)}
                    onFocus={() => setPreview(product)}
                    onClick={onNavigate}
                  >
                    <div className="visual-frame mb-2 h-14 overflow-hidden rounded-xl">
                      <img src={product.hero.visual} alt="" className="h-full w-full object-cover" />
                    </div>
                    <p className="text-sm leading-5 text-mist">{product.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
        <div>
          <p className="mb-3 text-[11px] tracking-[0.16em] text-muted uppercase">AI Voice Agents</p>
          <div className="grid gap-1">
            {agents.map((agent) => (
              <button
                key={agent.slug}
                type="button"
                className="rounded-2xl border border-transparent px-3 py-2 text-left text-sm text-mist hover:border-line hover:bg-white/5"
                onClick={() => onExploreAgent(agent.slug)}
              >
                {agent.name}
                <span className="mt-1 block text-xs text-muted">{agent.tagline}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-[24px] border border-line bg-ink p-4">
        {preview ? (
          <>
            <div className="visual-frame h-40 overflow-hidden rounded-2xl">
              <img src={preview.hero.visual} alt="" className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-4 font-display text-xl text-mist">{preview.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{preview.tagline}</p>
            <Link to={`/products/${preview.slug}`} className="mt-4 inline-flex min-h-11 items-center text-sm text-accent-strong" onClick={onNavigate}>
              {viewDetails} →
            </Link>
          </>
        ) : (
          <p className="text-sm text-muted">Hover a product to preview, or open an AI voice agent.</p>
        )}
        <Link to="/products" className="mt-4 inline-flex min-h-11 items-center text-sm text-accent-strong" onClick={onNavigate}>
          {viewAll} →
        </Link>
      </div>
    </div>
  );
}

function CatalogMega({
  eyebrow,
  items,
  allHref,
  allLabel,
  onNavigate,
}: {
  eyebrow: string;
  items: { href: string; name: string; tagline: string; visual: string }[];
  allHref: string;
  allLabel: string;
  onNavigate: () => void;
}) {
  return (
    <div>
      <p className="mb-4 text-[11px] tracking-[0.16em] text-muted uppercase">{eyebrow}</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="rounded-2xl border border-transparent p-2 hover:border-line hover:bg-white/5"
            onClick={onNavigate}
          >
            <div className="visual-frame mb-3 h-20 overflow-hidden rounded-xl">
              <img src={item.visual} alt="" className="h-full w-full object-cover" />
            </div>
            <p className="text-sm text-mist">{item.name}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{item.tagline}</p>
          </Link>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Link to={allHref} className="inline-flex min-h-11 items-center text-sm text-accent-strong" onClick={onNavigate}>
          {allLabel} →
        </Link>
      </div>
    </div>
  );
}
