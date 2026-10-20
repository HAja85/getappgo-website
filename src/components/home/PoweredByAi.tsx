import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ChatIllustration, FlowIllustration, HubIllustration } from "@/components/home/AiIllustrations";
import { Icon } from "@/components/zillion/Icon";
import { useLanguage } from "@/i18n/LanguageProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

const ACCENTS = {
  green: { text: "text-[#22C55E]", dot: "bg-[#22C55E]", button: "bg-[#22C55E] text-black", bar: "bg-[#22C55E]" },
  violet: { text: "text-[#8B5CF6]", dot: "bg-[#8B5CF6]", button: "bg-[#8B5CF6] text-white", bar: "bg-[#8B5CF6]" },
  blue: { text: "text-[#2563EB]", dot: "bg-[#2563EB]", button: "bg-[#2563EB] text-white", bar: "bg-[#2563EB]" },
} as const;

const ILLUSTRATIONS = [ChatIllustration, HubIllustration, FlowIllustration];

export function PoweredByAi() {
  const { copy, isRtl } = useLanguage();
  const ai = copy.ai;
  const reduced = usePrefersReducedMotion();
  const outer = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const count = ai.slides.length;

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = outer.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const value = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0;
      setProgress(value);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const activeSlide = Math.min(count - 1, Math.round(progress * (count - 1)));
  const shift = (progress * (count - 1) * 100) / count;

  const slides = ai.slides.map((slide, index) => {
    const accent = ACCENTS[slide.accent];
    const Illustration = ILLUSTRATIONS[index];
    return (
      <div key={slide.title} className={cn("flex items-center justify-center px-4 sm:px-8", reduced ? "py-6" : "h-full w-full shrink-0")} style={reduced ? undefined : { width: `${100 / count}%` }}>
        <article className="grid w-full max-w-7xl items-center gap-8 rounded-3xl bg-white/40 p-6 backdrop-blur-md lg:grid-cols-2 lg:gap-12">
          <div className="lg:ps-2">
            <p aria-hidden="true" className="text-5xl leading-none font-bold text-gray-200 lg:text-[64px]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="heading4 mt-4 font-black text-black uppercase">{slide.title}</h3>
            <p className={cn("mt-3 text-base font-semibold lg:text-lg", accent.text)}>{slide.subtitle}</p>
            <p className="mt-5 text-base leading-tight text-black/40 lg:text-lg">{slide.body}</p>
            <ul className="mt-6 flex flex-col gap-1.5 text-sm text-slate-600">
              {slide.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3">
                  <span className={cn("h-1.5 w-1.5 rounded-full", accent.dot)} />
                  {bullet}
                </li>
              ))}
            </ul>
            <Link
              to={slide.href}
              className={cn(
                "focus-ring mt-8 inline-flex items-center gap-3 rounded-full px-8 py-4 text-xs font-bold tracking-widest uppercase shadow-lg transition-transform hover:scale-105",
                accent.button,
              )}
            >
              {ai.learnMore}
              <Icon name="arrowRight" size={16} className="rtl:-scale-x-100" />
            </Link>
          </div>
          <div className="hidden aspect-[590/430] w-full overflow-hidden rounded-3xl border-4 border-white shadow-xl md:block">
            <Illustration />
          </div>
        </article>
      </div>
    );
  });

  return (
    <section className="relative bg-[#F0F2F8]" aria-labelledby="powered-by-ai">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob top-[120px] left-[2%] h-[420px] w-[560px] bg-[#9FA8DA]/60" style={{ filter: "blur(120px)" }} />
        <div className="blob top-[260px] right-[-4%] h-[420px] w-[560px] bg-[#D8A1C4]/60" style={{ filter: "blur(120px)" }} />
        <div className="blob top-[18%] left-[5%] h-[560px] w-[620px] bg-[#9FA8DA]/70" style={{ filter: "blur(120px)" }} />
        <div className="blob top-[30%] right-[0%] h-[520px] w-[620px] bg-[#D8A1C4]/70" style={{ filter: "blur(120px)" }} />
        <div className="blob bottom-[5%] left-[30%] h-[400px] w-[500px] bg-[#c7d2fe]/60" style={{ filter: "blur(120px)" }} />
      </div>

      <div className="cs-container relative pt-20 pb-6 lg:pt-24">
        <h2 id="powered-by-ai" className="heading2 w-fit font-black text-black">
          {ai.titleBefore}
          <span className="text-gradient-4">{ai.titleAccent}</span>
        </h2>
        <svg aria-hidden="true" viewBox="0 0 340 14" className="mt-3 h-3.5 w-[220px] lg:w-[340px] rtl:-scale-x-100" fill="none">
          <defs>
            <linearGradient id="wavy" x1="0" x2="1">
              <stop stopColor="#182793" />
              <stop offset=".5" stopColor="#7B3368" />
              <stop offset="1" stopColor="#D97817" />
            </linearGradient>
          </defs>
          <path d="M2 9c20-8 36-8 56 0s36 8 56 0 36-8 56 0 36 8 56 0 36-8 56 0 36 8 56 0" stroke="url(#wavy)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <p className="mt-6 max-w-6xl text-base text-black/55 lg:text-lg">{ai.body}</p>
      </div>

      {reduced ? (
        <div className="relative pb-20">{slides}</div>
      ) : (
        <div ref={outer} className="relative" style={{ height: `${count * 100}vh` }}>
          <div className="sticky top-0 h-screen overflow-hidden">
            <div
              className="flex h-full will-change-transform"
              style={{ width: `${count * 100}%`, transform: `translateX(${isRtl ? shift : -shift}%)` }}
            >
              {slides}
            </div>
            <div className="absolute inset-x-0 bottom-8 flex justify-center gap-2" aria-hidden="true">
              {ai.slides.map((slide, index) => (
                <span
                  key={slide.title}
                  className={cn("h-1 rounded-full transition-all duration-300", ACCENTS[slide.accent].bar, index === activeSlide ? "w-12" : "w-6 opacity-40")}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
