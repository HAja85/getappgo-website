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
                className="scroll-mt-32 rounded-3xl border border-slate-100 bg-white p-6 shadow-lg md:p-8"
              >
                <div className="flex items-start gap-5">
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={person.name}
                      width={120}
                      height={120}
                      className="size-[120px] shrink-0 rounded-full object-cover object-[center_18%]"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex size-[120px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-heading text-3xl font-bold text-white",
                        PANEL[index % PANEL.length],
                      )}
                    >
                      {person.initials}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#182793] uppercase">{person.role}</p>
                  <h2 className="mt-1 font-heading text-3xl font-bold text-slate-900">{person.name}</h2>
                  <blockquote className="mt-4 border-s-2 border-[#505FD0] ps-4 text-base text-slate-700 italic">“{person.quote}”</blockquote>
                  <div className="mt-6 grid gap-3 text-sm leading-7 text-slate-600 md:text-[15px]">
                    {person.story.map((line) => (
                      <p key={line.slice(0, 32)}>{line}</p>
                    ))}
                  </div>
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
