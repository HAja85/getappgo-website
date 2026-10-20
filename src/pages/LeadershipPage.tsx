import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/inner/PageHero";
import { SectionTitle } from "@/components/inner/Blocks";
import { CtaBand } from "@/components/inner/CtaBand";
import { useCopy } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

const PANEL = ["from-[#182793] to-[#7B3368]", "from-[#505FD0] to-[#CA51AA]", "from-[#7B3368] to-[#D97817]"];

export function LeadershipPage() {
  const copy = useCopy();
  const ld = copy.leadership;

  return (
    <>
      <Seo path="/leadership" title={ld.seoTitle} description={ld.seoDescription} />
      <PageHero badge={ld.hero.badge} badgeIcon="users" title={ld.hero.title} accent={ld.hero.accent} body={ld.hero.body} compact center />

      <section className="bg-white py-20 lg:py-24">
        <div className="cs-container">
          <SectionTitle pill={ld.pill} pillIcon="users" title={ld.title} divider />
          <div className="mt-14 grid gap-8">
            {ld.people.map((person, index) => (
              <article
                key={person.id}
                id={person.id}
                className="grid scroll-mt-32 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg lg:grid-cols-[340px_1fr]"
              >
                <div className={cn("relative min-h-[300px] bg-gradient-to-br", PANEL[index % PANEL.length])}>
                  {person.photo ? (
                    <img src={person.photo} alt={person.name} className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white/30 bg-white/10 font-heading text-7xl font-bold text-white">
                        {person.initials}
                      </span>
                    </span>
                  )}
                </div>
                <div className="p-6 md:p-10">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#182793] uppercase">{person.role}</p>
                  <h2 className="mt-1 font-heading text-3xl font-bold text-slate-900">{person.name}</h2>
                  <blockquote className="mt-4 border-s-2 border-[#505FD0] ps-4 text-base text-slate-700 italic">“{person.quote}”</blockquote>
                  <div className="mt-6 grid gap-3 text-sm leading-7 text-slate-600 md:text-[15px]">
                    {person.story.map((line) => (
                      <p key={line.slice(0, 32)}>{line}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={ld.ctaBand.title} body={ld.ctaBand.body} />
    </>
  );
}
