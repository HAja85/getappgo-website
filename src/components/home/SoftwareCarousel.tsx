import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Icon } from "@/components/zillion/Icon";
import { useLanguage } from "@/i18n/LanguageProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

const tiles = [
  "from-[#D97817] to-[#971C83]",
  "from-[#07A0E7] to-[#182793]",
  "from-[#7B3368] to-[#182793]",
  "from-[#505FD0] to-[#CA51AA]",
  "from-[#182793] to-[#07A0E7]",
  "from-[#971C83] to-[#505FD0]",
  "from-[#D97817] to-[#7B3368]",
];

export function SoftwareCarousel() {
  const { copy, isRtl } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const cards = copy.software.cards;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [step, setStep] = useState(364);
  const firstCard = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const measure = () => {
      const width = firstCard.current?.getBoundingClientRect().width;
      if (width) setStep(width + 24);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => setIndex((value) => (value + 1) % cards.length), 4000);
    return () => window.clearInterval(id);
  }, [cards.length, paused, reduced]);

  const go = (delta: number) => setIndex((value) => (value + delta + cards.length) % cards.length);
  const offset = index * step * (isRtl ? 1 : -1);

  return (
    <section
      className="relative overflow-hidden rounded-b-[50px] bg-[#F0F2F8] xl:min-h-[700px]"
      aria-roledescription="carousel"
      aria-label={copy.software.title}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#9fb4ff]/45 via-transparent to-[#e7a6d3]/45" />
      <div aria-hidden="true" className="wave-pattern absolute inset-0" />

      <div className="cs-container relative flex flex-col gap-10 py-16 lg:flex-row lg:items-center lg:gap-16 lg:py-24 xl:min-h-[700px]">
        <div className="shrink-0 lg:w-[320px]">
          <Link to="/services/software-services" className="focus-ring inline-flex items-center gap-1 rounded text-sm font-medium text-[#182793]">
            {copy.software.crumb}
            <Icon name="chevronRight" size={14} className="rtl:-scale-x-100" />
          </Link>
          <h2 className="heading2 mt-3 font-black text-[#1F1F1F]">{copy.software.title}</h2>
          <p className="mt-5 text-base text-slate-600">{copy.software.body}</p>
          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={copy.software.prev}
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-800 shadow-md transition-transform hover:scale-105"
            >
              <Icon name="chevronLeft" size={18} className="rtl:-scale-x-100" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={copy.software.next}
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-800 shadow-md transition-transform hover:scale-105"
            >
              <Icon name="chevronRight" size={18} className="rtl:-scale-x-100" />
            </button>
          </div>
        </div>

        <div
          className="min-w-0 flex-1"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="-my-6 overflow-hidden py-6 lg:-me-24 lg:pe-24">
            <ul
              className="flex gap-6 transition-transform duration-700 ease-out"
              style={{ transform: `translateX(${offset}px)` }}
            >
              {cards.map((card, cardIndex) => {
                const active = cardIndex === index;
                return (
                  <li
                    key={card.slug}
                    ref={cardIndex === 0 ? firstCard : undefined}
                    aria-roledescription="slide"
                    aria-label={`${cardIndex + 1} / ${cards.length}`}
                    className={cn(
                      "flex h-[400px] w-[280px] shrink-0 flex-col overflow-hidden rounded-2xl border bg-white/60 shadow-lg backdrop-blur-sm transition-all duration-500 sm:w-[300px] xl:h-[417px] xl:w-[340px]",
                      active ? "border-[#182793]/70 ring-1 ring-[#182793]/40" : "border-gray-100",
                    )}
                  >
                    <div
                      className={cn(
                        "relative flex h-[200px] shrink-0 flex-col items-center justify-center transition-colors duration-500",
                        active ? `bg-gradient-to-br ${tiles[cardIndex % tiles.length]}` : "bg-white/40",
                      )}
                    >
                      <span className="absolute end-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-green-200/50 bg-white/90 px-3 py-1.5 text-[10px] font-bold tracking-wide text-slate-700 uppercase">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        {card.chip}
                      </span>
                      {active ? (
                        <>
                          <p className="px-6 text-center font-heading text-2xl font-bold text-white">{card.title}</p>
                          <span className="mt-3 h-[3px] w-12 rounded-full bg-white/80" />
                        </>
                      ) : (
                        <span className={cn("flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg", tiles[cardIndex % tiles.length])}>
                          <Icon name={card.icon} size={32} />
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-heading text-lg font-semibold text-slate-900">{card.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{card.body}</p>
                      <Link
                        to={`/products/${card.slug}`}
                        tabIndex={active ? 0 : -1}
                        className="focus-ring mt-auto inline-flex w-fit items-center gap-1 rounded pt-4 text-sm font-semibold text-[#182793] transition-colors hover:text-[#07A0E7]"
                      >
                        {copy.software.learnMore}
                        <Icon name="chevronRight" size={14} className="rtl:-scale-x-100" />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-8 flex justify-end gap-2" role="tablist" aria-label={copy.software.title}>
            {cards.map((card, dot) => (
              <button
                key={card.slug}
                type="button"
                role="tab"
                aria-selected={dot === index}
                aria-label={card.title}
                onClick={() => setIndex(dot)}
                className={cn("h-1 rounded-full transition-all", dot === index ? "w-12 bg-[#182793]" : "w-6 bg-slate-300")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
