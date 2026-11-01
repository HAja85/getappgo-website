import { Link } from "react-router";
import { useDemo } from "@/components/contact/DemoProvider";
import { useCopy } from "@/i18n/LanguageProvider";

export function HomeHero() {
  const copy = useCopy();
  const { openDemo } = useDemo();
  const hero = copy.hero;

  return (
    <section className="relative mx-2 mt-2 h-[97svh] min-h-[600px] overflow-hidden rounded-xl bg-black pt-20 text-white md:mx-4 md:mt-4 md:min-h-[680px]">
      <img
        src="/images/graphics/hero-home.png"
        alt=""
        width={1280}
        height={720}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div aria-hidden="true" className="bg-gradient-1 absolute inset-0 opacity-50 rtl:-scale-x-100" />
      <div aria-hidden="true" className="absolute inset-0 bg-white/10" />

      <div className="cs-container relative flex h-full flex-col 2xl:max-w-[1600px]">
        <div className="flex w-full flex-1 flex-col justify-center pb-28 xl:w-[72%] 2xl:w-[62%]">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-heading text-xs font-semibold tracking-wide backdrop-blur-sm sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#4ade80]" />
            {hero.badge}
          </p>
          <h1 className="heading mt-5 max-w-[18ch] text-white rtl:max-w-[22ch]">{hero.title}</h1>
          <p className="subtext mt-5 max-w-[68ch] text-white">{hero.sub}</p>
          <button
            type="button"
            onClick={() => openDemo({ intent: "demo" })}
            className="btn-primary mt-8 w-fit px-6 py-2 text-sm sm:px-8 sm:py-2.5 sm:text-base"
          >
            {hero.cta}
          </button>
        </div>
      </div>

      <div className="glass absolute end-2 bottom-8 w-[160px] rounded-2xl p-2 text-white sm:end-6 sm:w-[260px] sm:p-3 lg:end-16 xl:w-[320px] xl:p-4">
        <div className="flex items-end gap-2 sm:gap-3">
          <img
            src="/images/zillion/agent-avatar.svg"
            alt=""
            width={120}
            height={120}
            className="-mt-12 h-16 w-16 shrink-0 sm:-mt-16 sm:h-24 sm:w-24 xl:-mt-20 xl:h-[124px] xl:w-[124px]"
          />
          <div className="pb-1">
            <p className="text-[10px] font-bold tracking-wide uppercase sm:text-sm sm:tracking-widest">{copy.hero.agent.title}</p>
            <p className="mt-0.5 hidden text-xs leading-4 text-white/85 sm:block">{copy.hero.agent.body}</p>
          </div>
        </div>
        <Link
          to="/ai-voice-agents"
          className="bg-gradient-5 call-pulse focus-ring mt-2 block w-full rounded-lg py-2 text-center text-[10px] font-bold tracking-widest uppercase"
        >
          {copy.hero.agent.cta}
        </Link>
      </div>
    </section>
  );
}
