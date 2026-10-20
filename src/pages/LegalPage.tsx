import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/inner/PageHero";
import { useCopy } from "@/i18n/LanguageProvider";
import { getSite } from "@/lib/content/repository";

export function LegalPage() {
  const site = getSite();
  const hero = useCopy().pageHeroes.privacy;
  return (
    <>
      <Seo path="/privacy" title="Privacy" description={`${site.brand.name} privacy notice.`} />
      <PageHero badge={hero.badge} badgeIcon="shield" title={hero.title} accent={hero.accent} body={hero.body} compact />
      <section className="bg-white py-20">
        <div className="cs-container max-w-3xl">
          <p className="text-sm leading-7 text-slate-600">
            Demo and contact requests collect name, company, work email, phone, the selected service or product, and your message so we can respond.
            We do not sell this information. Contact {site.contact.email} for questions about stored requests.
          </p>
        </div>
      </section>
    </>
  );
}
