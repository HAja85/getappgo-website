import { Link } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/inner/PageHero";
import { Icon, type IconName } from "@/components/zillion/Icon";
import { useCopy } from "@/i18n/LanguageProvider";

const NODE_ICONS: IconName[] = ["users", "plug", "send"];
const NODE_ACCENTS = [
  "from-[#07A0E7] to-[#505FD0]",
  "from-[#505FD0] to-[#CA51AA]",
  "from-[#CA51AA] to-[#D97817]",
];

export function PartnerPage() {
  const copy = useCopy();
  const page = copy.partnerPage;
  return (
    <>
      <Seo path="/company/partner" title={page.seoTitle} description={page.seoDescription} />
      <PageHero badge={page.hero.badge} badgeIcon="users" title={page.hero.title} body={page.hero.body} compact center />
      <section className="bg-white py-20">
        <div className="cs-container max-w-5xl">
          <div className="mx-auto max-w-3xl space-y-4 text-base leading-8 text-slate-700">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <figure
            aria-label={page.diagramAlt}
            className="relative mt-12 overflow-hidden rounded-[32px] border border-slate-200/80 p-6 shadow-xl md:p-10"
            style={{
              background:
                "radial-gradient(55% 70% at 12% 18%, rgba(7,160,231,0.16), transparent 70%), radial-gradient(45% 55% at 92% 88%, rgba(202,81,170,0.14), transparent 72%), linear-gradient(165deg, #ffffff 0%, #f3f7ff 48%, #fbf4f8 100%)",
            }}
          >
            <div className="mx-auto flex max-w-lg flex-col items-center">
              <div className="rounded-2xl bg-gradient-to-r from-[#07A0E7] via-[#505FD0] to-[#CA51AA] px-6 py-4 text-center text-white shadow-[0_16px_40px_rgba(80,95,208,0.28)]">
                <p className="font-heading text-sm font-bold tracking-[0.18em] uppercase md:text-base">{page.diagram.title}</p>
              </div>
              <div aria-hidden="true" className="h-8 w-px bg-gradient-to-b from-[#505FD0] to-[#CA51AA]" />
            </div>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-x-[16%] top-0 hidden h-px bg-gradient-to-r from-[#07A0E7] via-[#505FD0] to-[#D97817] md:block"
              />
              <ul className="grid gap-4 md:grid-cols-3">
                {page.diagram.nodes.map((node, index) => (
                  <li key={node.title} className="relative md:pt-8">
                    <span aria-hidden="true" className="absolute top-0 left-1/2 hidden h-8 w-px -translate-x-1/2 bg-[#505FD0]/60 md:block" />
                    <div className="h-full rounded-3xl border border-white bg-white/90 p-5 shadow-md">
                      <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${NODE_ACCENTS[index]}`}>
                        <Icon name={NODE_ICONS[index] ?? "sparkles"} size={18} />
                      </span>
                      <h3 className="mt-4 font-heading text-lg font-bold text-slate-900">{node.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{node.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </figure>
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
