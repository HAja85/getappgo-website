import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/inner/PageHero";
import { IconTile, SectionTitle } from "@/components/inner/Blocks";
import { CtaBand } from "@/components/inner/CtaBand";
import { useCopy } from "@/i18n/LanguageProvider";

export function CompanyStoryPage() {
  const copy = useCopy();
  const page = copy.storyPage;
  return (
    <>
      <Seo path="/company/story" title={page.seoTitle} description={page.seoDescription} />
      <PageHero badge={page.hero.badge} badgeIcon="building" title={page.hero.title} accent={page.hero.accent} body={page.hero.body} compact center sentence />
      <section className="bg-white py-20">
        <div className="cs-container max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-slate-900">{page.problemTitle}</h2>
          <div className="mt-6 grid gap-4 text-sm leading-7 text-slate-600 md:text-base">
            {page.problem.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-20">
        <div className="cs-container">
          <SectionTitle title={page.approachTitle} body={page.approachBody} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {page.approach.map((item) => (
              <li key={item.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-bold text-[#182793]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="cs-container">
          <SectionTitle title={page.journeyTitle} body={page.journeyBody} />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {page.journey.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <span className="text-4xl font-bold text-gray-200">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-heading text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {copy.company.pillars.map((pillar) => (
              <li key={pillar.title} className="rounded-2xl border border-slate-100 p-5">
                <IconTile icon={pillar.icon} />
                <h3 className="mt-4 font-heading text-base font-bold text-slate-900">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{pillar.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title={copy.about.cta.title} body={copy.about.cta.body} />
    </>
  );
}
