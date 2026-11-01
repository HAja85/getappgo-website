import { Link } from "react-router";
import { BrandLogo } from "@/components/navigation/BrandLogo";
import { useCopy } from "@/i18n/LanguageProvider";

export function Footer() {
  const copy = useCopy();

  return (
    <footer className="relative px-3 pt-8 pb-6 md:px-6">
      <div aria-hidden="true" className="blob inset-x-10 top-10 bottom-0 bg-[#d9d2ff]/60" style={{ filter: "blur(60px)" }} />
      <div className="relative overflow-hidden rounded-[32px] bg-white shadow-[0_20px_80px_rgba(24,39,147,0.12)] ring-1 ring-[#971C83]/10">
        <p
          aria-hidden="true"
          dir="ltr"
          className="pointer-events-none absolute -bottom-[0.28em] left-1/2 -translate-x-1/2 font-heading text-[64px] leading-none font-bold whitespace-nowrap text-black/[0.045] select-none sm:text-[96px] lg:text-[140px]"
        >
          {copy.footer.watermark}
        </p>
        <div className="relative grid gap-10 px-6 pt-14 pb-10 md:px-10 lg:grid-cols-[280px_1fr] lg:px-16 lg:pt-16">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-start">
            <BrandLogo size="lg" />
          </div>
          <nav aria-label="Sitemap" className="grid gap-8 sm:grid-cols-3">
            {copy.footer.columns.map((column) => (
              <div key={column.title}>
                <p className="text-[10px] font-semibold tracking-[0.22em] text-[#182793]/70 uppercase">{column.title}</p>
                <ul className="mt-4 grid gap-2">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}-${link.label}`}>
                      <Link to={link.href} className="focus-ring rounded text-sm font-medium text-slate-700 hover:text-[#182793]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="relative flex flex-col items-center justify-between gap-3 border-t border-slate-200/80 px-6 py-5 text-xs text-slate-500 md:flex-row lg:px-16">
          <p>
            © {new Date().getFullYear()} {copy.meta.brand}. {copy.footer.rights}
          </p>
          <Link to="/privacy" className="focus-ring rounded hover:text-[#182793]">
            {copy.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
