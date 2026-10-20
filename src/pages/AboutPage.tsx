import { Seo } from "@/components/seo/Seo";
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

      <section className="relative z-[1] bg-white pb-20">
        <div className="cs-container">
          <ul className="-mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {about.stats.map((stat) => (
              <li key={stat.label} className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white px-4 py-6 text-center shadow-lg">
                <IconTile icon={stat.icon} />
                <p dir="ltr" className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-20 max-w-4xl">
            <h2 className="text-center font-heading text-3xl font-bold text-slate-900 md:text-4xl">{about.storyTitle}</h2>
            <div className="mx-auto mt-3 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#182793] to-[#D97817]" />
            <div className="mt-8 grid gap-4 text-sm leading-7 text-slate-600 md:text-base">
              {about.story.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
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

      <section className="bg-[#020617] py-20 text-white">
        <div className="cs-container">
          <h2 className="text-center font-heading text-3xl font-bold md:text-4xl">{about.whyTitle}</h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.why.map((item) => (
              <li key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <IconTile icon={item.icon} className="from-[#505FD0] to-[#CA51AA]" />
                <h3 className="mt-5 font-heading text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.body}</p>
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
        </div>
      </section>

      <CtaBand title={about.cta.title} body={about.cta.body} />
    </>
  );
}
