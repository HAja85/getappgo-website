import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/inner/PageHero";
import { useDemo } from "@/components/contact/DemoProvider";
import { Icon } from "@/components/zillion/Icon";
import { useCopy } from "@/i18n/LanguageProvider";

export function PartnerPage() {
  const copy = useCopy();
  const page = copy.partnerPage;
  const { openDemo } = useDemo();
  return (
    <>
      <Seo path="/company/partner" title={page.seoTitle} description={page.seoDescription} />
      <PageHero badge={page.hero.badge} badgeIcon="users" title={page.hero.title} accent={page.hero.accent} body={page.hero.body} compact center />
      <section className="bg-white py-20">
        <div className="cs-container grid gap-5 lg:grid-cols-3">
          {page.principles.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-slate-900">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
        <div className="cs-container mt-12 text-center">
          <button
            type="button"
            onClick={() => openDemo({ intent: "partner", productSlug: "partner" })}
            className="btn-primary px-6 py-3 text-sm"
          >
            {page.apply}
            <Icon name="arrowRight" size={16} className="rtl:-scale-x-100" />
          </button>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-500">{page.note}</p>
        </div>
      </section>
    </>
  );
}
