import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { BrandLogo } from "@/components/navigation/BrandLogo";
import { Icon } from "@/components/zillion/Icon";
import { LanguageSwitch } from "@/components/zillion/LanguageSwitch";
import { useCopy } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import type { ServiceLineId } from "@/content/zillion";

type NavKey = "home" | "about" | "services" | "industries" | "contact";

function activeKey(pathname: string): NavKey | null {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/industries")) return "industries";
  if (pathname.startsWith("/contact")) return "contact";
  if (
    pathname.startsWith("/services") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/solutions") ||
    pathname.startsWith("/ai-voice-agents")
  ) {
    return "services";
  }
  return null;
}

export function FloatingNav() {
  const copy = useCopy();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lineId, setLineId] = useState<ServiceLineId>("software");
  const wrapRef = useRef<HTMLDivElement>(null);

  const items: { key: NavKey; label: string; href: string }[] = [
    { key: "home", label: copy.nav.home, href: "/" },
    { key: "about", label: copy.nav.about, href: "/about" },
    { key: "services", label: copy.nav.services, href: "/services/software-services" },
    { key: "industries", label: copy.nav.industries, href: "/industries" },
    { key: "contact", label: copy.nav.contact, href: "/contact" },
  ];
  const current = activeKey(location.pathname);
  const activeIndex = items.findIndex((item) => item.key === current);
  const line = copy.lines.find((entry) => entry.id === lineId) ?? copy.lines[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setMegaOpen(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  // Light (scrolled) state also applies while a menu panel is open over the hero.
  const light = scrolled;
  const textColor = light ? "text-[#1F1F1F]" : "text-white";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center p-4">
      <div ref={wrapRef} className="pointer-events-auto relative w-full max-w-7xl 2xl:max-w-[1500px] min-[1700px]:max-w-[1650px]">
        <nav
          aria-label="Main"
          className={cn(
            "relative flex items-center justify-between rounded-full transition-all duration-500 ease-in-out",
            light
              ? "mt-2 border border-white/20 bg-white/70 px-4 py-2 shadow-lg backdrop-blur-md sm:px-6"
              : "border border-transparent bg-white/0 px-0 py-4",
          )}
        >
          <BrandLogo tone={light ? "dark" : "light"} />

          {/* Desktop link pill: 5 equal columns, sliding gradient pill marks the current page */}
          <div
            className={cn(
              "absolute start-1/2 hidden -translate-x-1/2 rounded-full border p-1 backdrop-blur-md xl:block rtl:translate-x-1/2",
              light ? "border-black/5 bg-black/[0.04]" : "border-white/30 bg-white/5",
            )}
          >
            <ul className="relative grid grid-cols-5">
              {activeIndex >= 0 ? (
                <span
                  aria-hidden="true"
                  className="bg-gradient-5 absolute inset-y-0 w-1/5 rounded-full shadow-[0_0_24px_rgba(80,95,208,0.35)] transition-[inset-inline-start] duration-500 ease-out"
                  style={{ insetInlineStart: `${activeIndex * 20}%` }}
                />
              ) : null}
              {items.map((item, index) => {
                const isActive = index === activeIndex;
                const color = isActive ? "text-white" : textColor;
                if (item.key === "services") {
                  return (
                    <li key={item.key} className="relative">
                      <button
                        type="button"
                        aria-expanded={megaOpen}
                        aria-controls="services-mega"
                        onClick={() => setMegaOpen((open) => !open)}
                        className={cn(
                          "focus-ring relative flex w-[116.6px] items-center justify-center gap-1 rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                          color,
                        )}
                      >
                        {item.label}
                        <Icon name="chevronDown" size={14} className={cn("transition-transform", megaOpen && "rotate-180")} />
                      </button>
                    </li>
                  );
                }
                return (
                  <li key={item.key}>
                    <Link
                      to={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "focus-ring relative block w-[116.6px] rounded-full px-5 py-2 text-center text-sm font-medium whitespace-nowrap transition-colors",
                        color,
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <LanguageSwitch light={light} />
            </span>
            <button
              type="button"
              className={cn("focus-ring rounded-full p-2 transition-colors xl:hidden", light ? "text-[#1F1F1F] hover:bg-black/5" : "text-white hover:bg-white/20")}
              aria-label={mobileOpen ? copy.nav.closeMenu : copy.nav.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((open) => !open)}
            >
              <Icon name={mobileOpen ? "x" : "menu"} size={24} />
            </button>
          </div>
        </nav>

        {/* Services mega-menu */}
        {megaOpen ? (
          <div
            id="services-mega"
            className="absolute inset-x-0 top-full mt-4 hidden overflow-hidden rounded-[32px] border border-white/60 p-12 shadow-2xl xl:block"
            style={{
              background:
                "radial-gradient(60% 80% at 15% 70%, rgba(209,250,229,0.75), transparent 70%), linear-gradient(110deg, #ffffff 0%, #f1fbf7 45%, #dbeafe 100%)",
            }}
          >
            <div className="grid grid-cols-[0.9fr_1.2fr_1fr] gap-8">
              <div>
                <p className="mb-6 text-xs font-semibold tracking-widest text-slate-800 uppercase">{copy.nav.serviceLines}</p>
                <div className="grid gap-3" role="tablist" aria-orientation="vertical">
                  {copy.lines.map((entry) => (
                    <button
                      key={entry.id}
                      type="button"
                      role="tab"
                      aria-selected={entry.id === lineId}
                      onMouseEnter={() => setLineId(entry.id)}
                      onFocus={() => setLineId(entry.id)}
                      onClick={() => setLineId(entry.id)}
                      className={cn(
                        "focus-ring rounded-lg px-3 py-3 text-start font-heading text-xl font-bold transition-colors",
                        entry.id === lineId ? "bg-gradient-1 text-white shadow-md" : "text-slate-900 hover:bg-white/70",
                      )}
                    >
                      {entry.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-4 text-xs font-semibold tracking-widest text-slate-500 uppercase">{line.listTitle}</p>
                <ul className="max-h-[300px] overflow-y-auto pe-2">
                  {line.items.map((item, index) => (
                    <li key={item.href} className="border-b border-slate-200/70 last:border-b-0">
                      <Link
                        to={item.href}
                        className="focus-ring group flex items-center gap-3 rounded-lg px-2 py-3 font-semibold text-slate-700 transition-colors hover:text-blue-700"
                      >
                        <span className="w-6 text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                        <span className="flex-1">{item.label}</span>
                        <Icon name="arrowRight" size={16} className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-700 rtl:-scale-x-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to={`/services/${line.slug}`} className="focus-ring mt-4 inline-flex items-center gap-1 rounded text-sm font-semibold text-[#182793]">
                  {copy.nav.viewLine}
                  <Icon name="chevronRight" size={14} className="rtl:-scale-x-100" />
                </Link>
              </div>
              <div className="grid grid-cols-2 grid-rows-[1.6fr_1fr] gap-3">
                {line.visuals.map((src, index) => (
                  <div
                    key={src}
                    className={cn(
                      "overflow-hidden rounded-xl border border-white/20 bg-[#0f1235] shadow-sm",
                      index === 0 && "col-span-2",
                    )}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Mobile / tablet panel */}
        {mobileOpen ? (
          <div
            id="mobile-menu"
            className="fixed inset-x-4 top-24 max-h-[calc(100svh-7rem)] overflow-y-auto rounded-3xl border border-white/50 bg-white/90 p-6 shadow-2xl backdrop-blur-xl xl:hidden"
          >
            <ul className="flex flex-col">
              {items
                .filter((item) => item.key !== "services")
                .map((item) => (
                  <li key={item.key} className="border-b border-slate-200/70">
                    <Link
                      to={item.href}
                      className={cn("focus-ring block rounded py-2 font-medium", item.key === current ? "text-blue-600" : "text-slate-900")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
            <p className="mt-2 py-2 font-medium text-slate-900">{copy.nav.services}</p>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
              {copy.lines.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  aria-pressed={entry.id === lineId}
                  onClick={() => setLineId(entry.id)}
                  className={cn(
                    "focus-ring shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap",
                    entry.id === lineId ? "bg-blue-600 text-white" : "bg-white text-slate-700 shadow-sm",
                  )}
                >
                  {entry.short}
                </button>
              ))}
            </div>
            <p className="mt-3 font-heading font-bold text-slate-900">{line.label}</p>
            <ul className="mt-1">
              {line.items.map((item, index) => (
                <li key={item.href}>
                  <Link to={item.href} className="focus-ring flex items-center gap-3 rounded py-1.5 text-sm text-slate-800">
                    <span className="w-5 text-xs font-semibold">{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex-1">{item.label}</span>
                    <Icon name="arrowRight" size={16} className="rtl:-scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageSwitch light block className="mt-5" />
          </div>
        ) : null}
      </div>
    </header>
  );
}
