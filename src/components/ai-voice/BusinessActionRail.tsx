import { Link } from "react-router";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAiVoice } from "@/lib/content/repository";

export function BusinessActionRail() {
  const copy = getAiVoice().business;

  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          eyebrow={copy.eyebrow}
          title={copy.headline}
          description={copy.description}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-line bg-ink-soft/50 p-6">
            <p className="text-[11px] tracking-[0.16em] text-accent-strong uppercase">AI Voice Agents</p>
            <p className="mt-3 font-display text-2xl text-mist">Speak. Understand. Act.</p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Agents hand structured outcomes to the applications teams already run.
            </p>
            <span className="mt-8 hidden text-accent-strong lg:block" aria-hidden="true">
              ↓
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {copy.applications.map((app) => {
              const inner = (
                <>
                  <p className="font-display text-lg text-mist">{app.name}</p>
                  <p className="mt-2 text-sm text-muted">{app.action}</p>
                </>
              );
              return app.productSlug ? (
                <Link
                  key={app.id}
                  to={`/products/${app.productSlug}`}
                  className="rounded-[22px] border border-line p-5 hover:border-accent/50"
                >
                  {inner}
                </Link>
              ) : (
                <article key={app.id} className="rounded-[22px] border border-line p-5">
                  {inner}
                </article>
              );
            })}
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Example business actions">
          {copy.applications.map((app) => (
            <li
              key={`${app.id}-chip`}
              className="rounded-full border border-line px-3 py-1.5 text-xs text-muted"
            >
              {app.action}
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[28px] border border-line p-6">
            <p className="text-[11px] tracking-[0.16em] text-accent-strong uppercase">Business application</p>
            <h3 className="font-display mt-3 text-2xl text-mist">{copy.cashout.name}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{copy.cashout.tagline}</p>
            <ol className="mt-6 grid gap-2" aria-label="Cashout workflow">
              {copy.cashout.steps.map((step, index) => (
                <li key={step} className="flex flex-col items-start">
                  {index > 0 ? (
                    <span className="mb-2 ml-4 text-accent-strong" aria-hidden="true">
                      ↓
                    </span>
                  ) : null}
                  <span className="rounded-full border border-line px-3 py-1.5 text-[11px] tracking-[0.12em] text-mist uppercase">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-[28px] border border-line p-6">
            <p className="text-[11px] tracking-[0.16em] text-accent-strong uppercase">Business application</p>
            <h3 className="font-display mt-3 text-2xl text-mist">{copy.banking.name}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{copy.banking.tagline}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
              <div>
                <p className="text-[11px] tracking-[0.14em] text-muted uppercase">Bank transactions</p>
                <ul className="mt-3 grid gap-2">
                  {copy.banking.bankRows.map((row) => (
                    <li key={row} className="rounded-xl border border-line px-3 py-2 text-sm text-mist">
                      {row}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="self-center text-center text-xs tracking-[0.16em] text-accent-strong uppercase">Match</p>
              <div>
                <p className="text-[11px] tracking-[0.14em] text-muted uppercase">System records</p>
                <ul className="mt-3 grid gap-2">
                  {copy.banking.systemRows.map((row, index) => (
                    <li
                      key={`${row.label}-${index}`}
                      className="rounded-xl border border-line px-3 py-2 text-sm text-mist"
                    >
                      {row.status === "matched" ? "✓" : "⚠"} {row.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
