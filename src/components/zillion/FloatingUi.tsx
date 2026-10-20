import { useEffect, useState } from "react";
import { useDemo } from "@/components/contact/DemoProvider";
import { Icon, type IconName } from "@/components/zillion/Icon";
import { useCopy } from "@/i18n/LanguageProvider";
import { getSite } from "@/lib/content/repository";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

/** Social rail (right), "Let's connect!" pill (bottom centre) and back-to-top (bottom right). */
export function FloatingUi() {
  const copy = useCopy();
  const site = getSite();
  const { openDemo } = useDemo();
  const [pastHero, setPastHero] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.85);
      setShowTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const social: { icon: IconName; label: string; href: string; external?: boolean }[] = [
    { icon: "linkedin", label: copy.floating.linkedin, href: site.social.linkedin, external: true },
    { icon: "mail", label: copy.floating.email, href: `mailto:${site.contact.email}` },
    { icon: "phone", label: copy.floating.phone, href: `tel:${site.contact.phone}` },
    { icon: "whatsapp", label: copy.floating.whatsapp, href: buildWhatsAppUrl(), external: true },
  ];

  return (
    <>
      <ul className="fixed end-3 top-[40%] z-[80] flex -translate-y-1/2 flex-col gap-4 sm:end-6">
        {social.map((item) => (
          <li key={item.icon}>
            <a
              href={item.href}
              aria-label={item.label}
              title={item.label}
              {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className={cn(
                "focus-ring flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black sm:h-8 sm:w-8",
                pastHero ? "bg-[#6B7280] text-white shadow-md ring-2 ring-white/70" : "text-white",
              )}
            >
              <Icon name={item.icon} size={16} />
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => openDemo({ intent: "expert" })}
        className="btn-primary focus-ring fixed bottom-4 left-1/2 z-[70] h-14 -translate-x-1/2 gap-3 py-1.5 ps-1.5 pe-6 text-sm sm:h-16 sm:text-base"
      >
        <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#f9a8d4] to-[#818cf8] sm:h-[52px] sm:w-[52px]">
          <img src="/images/zillion/robot.svg" alt="" width={44} height={44} className="h-9 w-9 sm:h-11 sm:w-11" />
        </span>
        {copy.floating.connect}
      </button>

      <button
        type="button"
        aria-label={copy.floating.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "bg-gradient-5 focus-ring fixed end-4 bottom-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-105 sm:end-6",
          showTop ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <Icon name="arrowUp" size={20} />
      </button>
    </>
  );
}
