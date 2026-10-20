import { Seo } from "@/components/seo/Seo";
import { useDemo } from "@/components/contact/DemoProvider";
import { PageHero } from "@/components/inner/PageHero";
import { IconTile, SectionTitle } from "@/components/inner/Blocks";
import { CtaBand } from "@/components/inner/CtaBand";
import { Icon } from "@/components/zillion/Icon";
import { useCopy } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

export function PackagesPage() {
  const copy = useCopy();
  const { openDemo } = useDemo();
  const pk = copy.packages;
  const company = copy.company;

  return (
    <>
      <Seo path="/packages" title={pk.seoTitle} description={pk.seoDescription} />
      <PageHero badge={pk.hero.badge} badgeIcon="layers" title={pk.hero.title} accent={pk.hero.accent} body={pk.hero.body} image="/images/solutions/business-systems.png" compact center />

      <section className="bg-white py-20 lg:py-24">
        <div className="cs-container">
          <SectionTitle pill={pk.pill} pillIcon="zap" title={pk.title} body={pk.body} />
          <ol className="mt-14 grid gap-6 lg:grid-cols-3">
            {pk.items.map((item) => (
              <li key={item.id} id={item.id} className="flex scroll-mt-32 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                <div className={cn("relative bg-gradient-to-br p-6 text-white", item.accent)}>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-80">{item.number}</span>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <h2 className="font-heading text-2xl leading-tight font-bold">{item.title}</h2>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                      <Icon name={item.icon} size={24} />
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white/85">{item.subtitle}</p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-6 text-slate-600">{item.body}</p>
                  <p className="mt-6 text-[10px] font-bold tracking-[0.2em] text-[#182793] uppercase">{pk.deliverablesLabel}</p>
                  <ul className="mt-2 grid gap-1.5">
                    {item.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Icon name="checkCircle" size={16} className="shrink-0 text-green-600" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-[10px] font-bold tracking-[0.2em] text-[#182793] uppercase">{pk.exampleLabel}</p>
                  <ul className="mt-2 grid gap-1.5">
                    {item.examples.map((e) => (
                      <li key={e} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#505FD0]" />
                        {e}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8" />
                  <button
                    type="button"
                    onClick={() => openDemo({ intent: "expert", productSlug: item.id })}
                    className="btn-primary w-full px-5 py-3 text-sm"
                  >
                    {pk.cta}
                    <Icon name="arrowRight" size={16} className="rtl:-scale-x-100" />
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#020617] py-20 text-white">
        <div className="cs-container">
          <SectionTitle pill={company.modelPill} pillIcon="workflow" title={company.modelTitle} body={company.modelBody} dark />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {company.pillars.map((pillar, index) => (
              <li key={pillar.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between">
                  <IconTile icon={pillar.icon} className="from-[#505FD0] to-[#CA51AA]" />
                  <span className="text-3xl font-bold text-white/15">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold">{pillar.title}</h3>
                <p className="mt-2 text-sm text-white/70">{pillar.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title={pk.ctaBand.title} body={pk.ctaBand.body} />
    </>
  );
}
