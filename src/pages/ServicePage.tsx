import { Link, Navigate, useParams } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { useDemo } from "@/components/contact/DemoProvider";
import { PageHero, HeroGlassCard } from "@/components/inner/PageHero";
import { IconTile, SectionTitle } from "@/components/inner/Blocks";
import { CtaBand } from "@/components/inner/CtaBand";
import { Icon } from "@/components/zillion/Icon";
import { useCopy } from "@/i18n/LanguageProvider";
import { serviceSlugs } from "@/content/zillion";

const HERO_IMAGES: Record<string, string> = {
  "software-services": "/images/categories/business-software.png",
  "ai-integration-automation": "/images/categories/ai-products.png",
  "hardware-procurement": "/images/solutions/business-systems.png",
};

export function ServicePage() {
  const { slug = "" } = useParams();
  const copy = useCopy();
  const { openDemo } = useDemo();
  if (!(serviceSlugs as readonly string[]).includes(slug)) return <Navigate to="/services/software-services" replace />;
  const page = copy.servicePages[slug];

  return (
    <>
      <Seo path={`/services/${slug}`} title={page.seoTitle} description={page.seoDescription} />
      <PageHero
        badge={page.hero.badge}
        badgeIcon="layers"
        title={page.hero.title}
        accent={page.hero.accent}
        body={page.hero.body}
        image={HERO_IMAGES[slug]}
        actions={
          <>
            <Link to="/contact" className="btn-primary px-5 py-2.5 text-sm">
              {page.hero.primary}
              <Icon name="arrowRight" size={16} className="rtl:-scale-x-100" />
            </Link>
            <button
              type="button"
              onClick={() => openDemo({ intent: "demo", productSlug: slug })}
              className="focus-ring rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {page.hero.secondary}
            </button>
          </>
        }
        aside={<HeroGlassCard title={page.hero.card.title} body={page.hero.card.body} checks={page.hero.card.checks} />}
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="cs-container">
          <SectionTitle pill={page.capabilities.pill} pillIcon="layers" title={page.capabilities.title} body={page.capabilities.body} />
          <div className="mt-14 grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
            <aside className="h-fit rounded-2xl border border-blue-50 bg-gradient-to-br from-white via-[#eef2ff] to-[#e0f2fe] p-6 shadow-sm lg:sticky lg:top-28">
              <IconTile icon="layers" />
              <p className="mt-5 text-[10px] font-bold tracking-[0.2em] text-[#182793] uppercase">{page.capabilities.sideLabel}</p>
              <p className="mt-3 text-sm text-slate-600">{page.capabilities.sideBody}</p>
            </aside>
            <ol className="flex flex-col divide-y divide-slate-100">
              {page.capabilities.items.map((item, index) => (
                <li key={item.id} id={item.id} className="flex scroll-mt-32 gap-4 py-5 first:pt-0">
                  <IconTile icon={item.icon} />
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-slate-400">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="font-heading text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.body}</p>
                    {item.href ? (
                      <Link to={item.href} className="focus-ring mt-2 inline-flex items-center gap-1 rounded text-sm font-semibold text-[#182793] hover:text-[#07A0E7]">
                        {copy.common.viewDetails}
                        <Icon name="chevronRight" size={14} className="rtl:-scale-x-100" />
                      </Link>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-slate-50 py-20 lg:py-24">
        <div className="cs-container">
          <SectionTitle pill={page.why.pill} pillIcon="shield" title={page.why.title} body={page.why.body} />
          <div className="relative mt-14 grid gap-10 md:grid-cols-3">
            <span aria-hidden="true" className="absolute top-6 right-[16%] left-[16%] hidden h-px bg-slate-200 md:block" />
            {page.why.items.map((item, index) => (
              <div key={item.title} className="relative text-center">
                <IconTile icon={item.icon} className="mx-auto h-12 w-12 rounded-2xl" />
                <p className="mt-3 text-[10px] font-bold text-slate-400">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 font-heading text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="cs-container">
          <SectionTitle pill={page.useCases.pill} pillIcon="zap" title={page.useCases.title} align="start" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <ul className="grid gap-3">
              {page.useCases.items.map((item) => (
                <li key={item.title} className="flex gap-3 rounded-xl border border-slate-200 p-4">
                  <IconTile icon="zap" className="h-8 w-8 rounded-lg" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <aside className="h-fit rounded-2xl bg-gradient-to-br from-white via-[#eef2ff] to-[#e0f2fe] p-6 shadow-sm ring-1 ring-blue-50">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#182793] uppercase">{page.useCases.side.label}</p>
              <h3 className="mt-2 font-heading text-xl font-bold text-slate-900">{page.useCases.side.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{page.useCases.side.body}</p>
              <ul className="mt-4 grid gap-2">
                {page.useCases.side.checks.map((check) => (
                  <li key={check} className="flex items-center gap-2 text-sm text-slate-700">
                    <Icon name="checkCircle" size={16} className="text-[#182793]" />
                    {check}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand title={page.cta.title} body={page.cta.body} primary={page.cta.primary} secondary={page.cta.secondary} productSlug={slug} />
    </>
  );
}
