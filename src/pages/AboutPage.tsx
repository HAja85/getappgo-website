import { Link } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { Icon } from "@/components/zillion/Icon";
import { PageHero } from "@/components/inner/PageHero";
import { IconTile, Pill, SectionTitle } from "@/components/inner/Blocks";
import { CtaBand } from "@/components/inner/CtaBand";
import { useCopy } from "@/i18n/LanguageProvider";

export function AboutPage() {
  const copy = useCopy();
  const about = copy.about;
  return (
    <>
      <Seo path="/about" title="About" description={about.seoDescription} />
      <section className="relative">
        <PageHero badge={about.hero.badge} badgeIcon="building" title={about.hero.title} accent={about.hero.accent} body={about.hero.body} compact center />
      </section>

      <section className="relative z-[1] bg-white py-20">
        <div className="cs-container">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 text-sm leading-7 text-slate-600 md:text-base">
              {copy.company.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="cs-container">
          <SectionTitle pill={copy.company.modelPill} pillIcon="workflow" title={copy.company.modelTitle} body={copy.company.modelBody} />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {copy.company.pillars.map((pillar, index) => (
              <li key={pillar.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <IconTile icon={pillar.icon} />
                  <span className="text-3xl font-bold text-gray-200">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-slate-900">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{pillar.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/packages" className="btn-primary px-6 py-3 text-sm">
              {copy.nav.packages}
              <Icon name="arrowRight" size={16} className="rtl:-scale-x-100" />
            </Link>
            <Link to="/leadership" className="focus-ring rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-[#505FD0] hover:text-[#182793]">
              {copy.nav.leadership}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="cs-container">
          <SectionTitle title={about.valuesTitle} body={about.valuesBody} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value) => (
              <li key={value.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <IconTile icon={value.icon} />
                <h3 className="mt-5 font-heading text-lg font-bold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="cs-container">
          <div className="text-center">
            <Pill icon="workflow">{about.processPill}</Pill>
          </div>
          <SectionTitle title={about.processTitle} />
          <ol className="mt-12 grid gap-5 md:grid-cols-4">
            {about.process.map((step, index) => (
              <li key={step.title} className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <span className="text-4xl font-bold text-gray-200">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-heading text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base text-slate-700">{about.processClose}</p>
        </div>
      </section>

      <CtaBand title={about.cta.title} body={about.cta.body} />
    </>
  );
}
