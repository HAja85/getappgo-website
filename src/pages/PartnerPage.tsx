import { Link } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/inner/PageHero";
import { Icon } from "@/components/zillion/Icon";
import { useCopy } from "@/i18n/LanguageProvider";

export function PartnerPage() {
  const copy = useCopy();
  const page = copy.partnerPage;
  return (
    <>
      <Seo path="/company/partner" title={page.seoTitle} description={page.seoDescription} />
      <PageHero badge={page.hero.badge} badgeIcon="users" title={page.hero.title} body={page.hero.body} compact center />
      <section className="bg-white py-20">
        <div className="cs-container max-w-4xl">
          <div className="space-y-4 text-base leading-8 text-slate-700">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <img
            src="/images/zillion/partner-network.png"
            alt={page.diagramAlt}
            className="mt-10 w-full rounded-2xl border border-slate-200 bg-slate-50"
          />
          <h2 className="mt-12 font-heading text-2xl font-bold text-slate-900">{page.rulesTitle}</h2>
          <ul className="mt-6 space-y-5">
            {page.principles.map((item) => (
              <li key={item.title} className="text-sm leading-7 text-slate-600">
                <span className="font-semibold text-slate-900">{item.title}: </span>
                {item.body}
              </li>
            ))}
          </ul>
          <Link to="/contact#inquiry" className="btn-primary focus-ring mt-10 px-6 py-3 text-sm">
            {page.apply}
            <Icon name="arrowRight" size={16} className="rtl:-scale-x-100" />
          </Link>
        </div>
      </section>
    </>
  );
}
