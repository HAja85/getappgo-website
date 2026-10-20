import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/zillion/Icon";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  badge: string;
  badgeIcon?: IconName;
  title: string;
  accent?: string;
  body?: string;
  image?: string;
  actions?: ReactNode;
  aside?: ReactNode;
  compact?: boolean;
};

/** Full-bleed dark hero used by every inner page (reference inner-page template). */
export function PageHero({ badge, badgeIcon = "sparkles", title, accent, body, image = "/images/graphics/hero-home.png", actions, aside, compact }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex items-center overflow-hidden bg-slate-950 pt-36 pb-20 text-white sm:pt-40 lg:pt-44",
        compact ? "min-h-[70svh]" : "min-h-screen",
      )}
    >
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#020B50]/95 via-[#0b1677]/80 to-[#2b0f4a]/60 rtl:bg-gradient-to-l" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className={cn("cs-container relative grid items-center gap-10", aside ? "lg:grid-cols-[1.25fr_1fr]" : "")}>
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
            <Icon name={badgeIcon} size={14} />
            {badge}
          </p>
          <h1 className="mt-5 font-heading text-4xl leading-[1.08] font-bold md:text-5xl xl:text-6xl">
            {title}
            {accent ? (
              <>
                <br />
                <span className="text-gradient-hero">{accent}</span>
              </>
            ) : null}
          </h1>
          {body ? <p className="mt-6 max-w-2xl text-sm leading-6 text-white/85 md:text-base">{body}</p> : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {aside ? <div className="lg:justify-self-end">{aside}</div> : null}
      </div>
    </section>
  );
}

export function HeroGlassCard({ label, title, body, checks, action }: { label?: string; title: string; body: string; checks?: string[]; action?: ReactNode }) {
  return (
    <div className="max-w-md rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#182793]">
          <Icon name="checkCircle" size={20} />
        </span>
        <div>
          {label ? <p className="text-xs text-white/70">{label}</p> : null}
          <p className="font-heading text-lg font-bold">{title}</p>
          <p className="mt-1 text-sm text-white/80">{body}</p>
        </div>
      </div>
      {checks ? (
        <ul className="mt-5 grid gap-2">
          {checks.map((check) => (
            <li key={check} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-semibold">
              <Icon name="checkCircle" size={14} className="shrink-0 text-white/80" />
              {check}
            </li>
          ))}
        </ul>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
