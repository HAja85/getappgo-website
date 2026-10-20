import { Link } from "react-router";
import { useDemo } from "@/components/contact/DemoProvider";
import { Icon } from "@/components/zillion/Icon";
import { useCopy } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

const serviceLinks = [
  "/services/software-services",
  "/services/ai-integration-automation",
  "/services/ai-integration-automation#integration",
  "/services/hardware-procurement",
];

export function WhatWeDo() {
  const copy = useCopy();
  const { openDemo } = useDemo();
  const cards = copy.whatWeDo.cards;
  const platforms = copy.platforms.items;

  return (
    <section className="relative z-[1] -mt-4 overflow-hidden rounded-t-[40px] bg-gradient-to-b from-white via-cyan-50/10 to-white">
      <div aria-hidden="true" className="blob -top-20 -left-40 h-[420px] w-[520px] bg-[#e0dcff]/70" />
      <div aria-hidden="true" className="blob top-[-60px] right-[-120px] h-[380px] w-[520px] bg-[#cdeffd]/70" />

      <div className="cs-container relative py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mb-10 flex items-center gap-5 md:mb-14">
          <p className="shrink-0 text-sm font-semibold tracking-[0.2em] text-[#07A1E9] uppercase">{copy.whatWeDo.eyebrow}</p>
          <span aria-hidden="true" className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <Link
              key={card.title}
              to={serviceLinks[index]}
              className={cn(
                "group focus-ring relative -mt-px -ms-px border border-gray-200 bg-white p-8 transition-colors duration-300 hover:bg-violet-50 lg:p-10",
                index === 0 && "rounded-t-xl sm:rounded-none sm:rounded-ss-xl lg:rounded-s-xl",
                index === cards.length - 1 && "rounded-b-xl sm:rounded-none sm:rounded-ee-xl lg:rounded-e-xl",
                index === 1 && "sm:rounded-se-xl lg:rounded-none",
                index === 2 && "sm:rounded-es-xl lg:rounded-none",
              )}
            >
              <span aria-hidden="true" className="absolute -top-px start-0 h-[3px] w-14 bg-gradient-to-r from-[#505FD0] to-[#8B5CF6]" />
              <span aria-hidden="true" className="block text-7xl leading-none font-bold text-gray-100 transition-colors duration-300 group-hover:text-violet-200 lg:text-8xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 font-display text-base font-bold tracking-[0.1em] text-[#1F1F1F] uppercase lg:mt-10">{card.title}</h3>
              <p className="mt-4 text-sm leading-[22.75px] text-gray-500">{card.body}</p>
            </Link>
          ))}
        </div>

        <h2 className="mt-20 text-center font-heading text-2xl font-bold text-gray-500 uppercase md:mt-24">{copy.platforms.title}</h2>
        <div className="marquee-mask relative mt-10 overflow-hidden" dir="ltr">
          <ul className="animate-scroll-left flex w-max gap-6 hover:[animation-play-state:paused]">
            {[...platforms, ...platforms].map((item, index) => (
              <li
                key={`${item.name}-${index}`}
                aria-hidden={index >= platforms.length}
                className="flex h-20 w-40 shrink-0 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-green-300 hover:shadow-md"
              >
                <span className="bg-gradient-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white">
                  <Icon name={item.icon} size={16} />
                </span>
                <span className="font-heading text-sm leading-tight font-bold text-[#182793]">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-col items-center gap-8 rounded-2xl bg-gray-100/70 p-8 text-center shadow-sm md:mt-20 md:flex-row md:p-12 md:text-start">
          <div className="flex w-full justify-center md:w-[30%]">
            <img src="/images/zillion/mark.svg" alt="" width={160} height={160} className="h-28 w-28 md:h-40 md:w-40" />
          </div>
          <div className="md:w-[70%]">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {copy.trust.chip}
            </p>
            <h3 className="mt-3 font-heading text-2xl font-bold text-slate-900 md:text-3xl">{copy.trust.title}</h3>
            <p className="mt-4 max-w-2xl text-base text-gray-600">{copy.trust.body}</p>
            <button
              type="button"
              onClick={() => openDemo({ intent: "expert" })}
              className="focus-ring mt-6 inline-flex items-center gap-2 rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-green-700"
            >
              {copy.trust.cta}
              <Icon name="arrowUpRight" size={16} className="rtl:-scale-x-100" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
