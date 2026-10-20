import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { BrandLogo } from "@/components/navigation/BrandLogo";
import { Icon } from "@/components/zillion/Icon";
import { useCopy } from "@/i18n/LanguageProvider";
import { getSite } from "@/lib/content/repository";

function RollLink({ href, label }: { href: string; label: string }) {
  return (
    <Link to={href} className="roll-link focus-ring block w-fit rounded">
      <span className="roll text-[26px] font-extrabold tracking-[-0.05em] text-[#1F1F1F]/70 uppercase md:text-[30px] lg:text-[36px]">
        <span>{label}</span>
        <span aria-hidden="true" className="text-[#182793]">
          {label}
        </span>
      </span>
    </Link>
  );
}

export function Footer() {
  const copy = useCopy();
  const site = getSite();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  function onSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("ok");
    // No newsletter backend yet: hand the address to the team inbox.
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent("Newsletter subscription")}&body=${encodeURIComponent(`Please subscribe ${email} to ZillionAI updates.`)}`;
  }

  return (
    <footer className="relative px-3 pt-8 pb-6 md:px-6">
      <div
        aria-hidden="true"
        className="blob inset-x-10 top-10 bottom-0 bg-[#d9d2ff]/60"
        style={{ filter: "blur(60px)" }}
      />
      <div className="relative overflow-hidden rounded-[32px] bg-white shadow-[0_20px_80px_rgba(24,39,147,0.12)] ring-1 ring-[#971C83]/10">
        <p
          aria-hidden="true"
          dir="ltr"
          className="pointer-events-none absolute -bottom-[0.42em] left-1/2 -translate-x-1/2 font-heading text-[150px] leading-none font-bold whitespace-nowrap text-black/[0.045] select-none sm:text-[240px] lg:text-[416px]"
        >
          {copy.footer.watermark}
        </p>
        <div className="relative grid min-h-[520px] gap-12 px-6 pt-14 pb-10 text-center md:grid-cols-3 md:gap-6 md:px-10 md:text-start lg:px-24 lg:pt-20">
          <div className="flex flex-col items-center md:items-start">
            <p className="mb-6 text-[10px] font-semibold tracking-[0.25em] text-[#182793]/70 uppercase">{copy.footer.quickLinksLabel}</p>
            <ul className="flex flex-col items-center gap-0.5 md:items-start">
              {copy.footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <RollLink {...link} />
                </li>
              ))}
            </ul>
          </div>
          <div className="order-first flex flex-col items-center text-center md:order-none">
            <BrandLogo size="lg" />
            <p className="mt-5 max-w-[300px] text-sm leading-6 text-slate-600">{copy.footer.tagline}</p>
            <p className="mt-3 text-xs text-[#182793]/70">{copy.footer.stay}</p>
            <form
              onSubmit={onSubscribe}
              noValidate
              className="mt-4 flex w-full max-w-[300px] items-center gap-2 rounded-xl border border-[#182793]/20 bg-white/80 p-1.5 shadow-sm"
            >
              <Icon name="mail" size={16} className="ms-1.5 shrink-0 text-[#182793]/70" />
              <label className="sr-only" htmlFor="footer-email">
                {copy.footer.emailPlaceholder}
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setStatus("idle");
                }}
                placeholder={copy.footer.emailPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                aria-invalid={status === "error"}
                aria-describedby="footer-email-status"
              />
              <button type="submit" className="btn-primary shrink-0 rounded-lg px-3 py-2 text-xs">
                {copy.footer.subscribe}
                <Icon name="arrowRight" size={14} className="rtl:-scale-x-100" />
              </button>
            </form>
            <p id="footer-email-status" role="status" className="mt-2 min-h-4 text-xs text-slate-500">
              {status === "error" ? copy.footer.invalidEmail : status === "ok" ? copy.footer.subscribed : ""}
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="mb-6 text-[10px] font-semibold tracking-[0.25em] text-[#182793]/70 uppercase">{copy.footer.servicesLabel}</p>
            <ul className="flex flex-col items-center gap-0.5 md:items-end">
              {copy.footer.services.map((link) => (
                <li key={link.href}>
                  <RollLink {...link} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-between gap-3 border-t border-slate-200/80 px-6 py-5 text-xs text-slate-500 md:flex-row lg:px-24">
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
