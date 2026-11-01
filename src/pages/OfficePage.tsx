import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/inner/PageHero";
import { useCopy } from "@/i18n/LanguageProvider";

export function OfficePage() {
  const copy = useCopy();
  const page = copy.officePage;
  const mapSrc = "https://maps.google.com/maps?q=Sheikh%20Zayed%20Road%2C%20Dubai&z=14&output=embed";
  return (
    <>
      <Seo path="/company/office" title={page.seoTitle} description={page.seoDescription} />
      <PageHero badge={page.hero.badge} badgeIcon="building" title={page.hero.title} accent={page.hero.accent} body={page.hero.body} compact center />
      <section className="bg-white py-16">
        <div className="cs-container grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#182793] uppercase">{page.addressLabel}</p>
            <p className="mt-3 font-heading text-2xl font-bold text-slate-900" dir="ltr">
              {page.address}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-600">{page.note}</p>
          </div>
          <iframe
            title={page.mapTitle}
            src={mapSrc}
            className="h-[420px] w-full rounded-2xl border border-slate-200"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
