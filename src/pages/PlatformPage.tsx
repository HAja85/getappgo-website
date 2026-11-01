import { useState, type FormEvent, type ReactNode } from "react";
import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/inner/PageHero";
import { IconTile, Pill, SectionTitle } from "@/components/inner/Blocks";
import { Icon } from "@/components/zillion/Icon";
import { useCopy } from "@/i18n/LanguageProvider";
import { demoRequestSchema } from "@/lib/content/schema";
import { submitDemoRequest } from "@/lib/leads/submit";
import { cn } from "@/lib/cn";
import type { DemoIntent } from "@/types";

const inputClass =
  "h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-[#505FD0] focus:bg-white focus:ring-2 focus:ring-[#505FD0]/20";

const CARD_ICONS = ["phone", "send", "workflow", "users", "globe", "chart"] as const;

export function PlatformPage() {
  const copy = useCopy();
  const page = copy.platform;
  const form = copy.contact.form;
  const [tab, setTab] = useState(0);
  const active = page.tabs[tab] ?? page.tabs[0];
  const [intent, setIntent] = useState<DemoIntent>("demo");
  const [values, setValues] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = demoRequestSchema.safeParse({
      ...values,
      intent,
      productSlug: page.demo.productSlug,
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await submitDemoRequest(parsed.data);
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : form.error);
      setStatus("error");
    }
  }

  return (
    <>
      <Seo path="/platform" title={page.seoTitle} description={page.seoDescription} />
      <PageHero
        badge={page.hero.badge}
        badgeIcon="phone"
        title={page.hero.title}
        lines={page.hero.lines}
        accent={page.hero.accent}
        body={page.hero.body}
        image="/images/products/ai-call-center-platform.png"
        actions={
          <>
            <a href="#platform-demo" className="btn-primary px-5 py-2.5 text-sm">
              {page.hero.primary}
              <Icon name="arrowRight" size={16} className="rtl:-scale-x-100" />
            </a>
            <a
              href="#platform-demo"
              onClick={() => setIntent("expert")}
              className="focus-ring rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              {page.hero.secondary}
            </a>
          </>
        }
        aside={
          <div className="max-w-md rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-md">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold tracking-wide text-white/80">{page.sample.label}</p>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase">
                <span className="h-2 w-2 rounded-full bg-[#4ade80]" />
                {page.sample.live}
              </span>
            </div>
            <ul className="mt-4 grid gap-3">
              {page.sample.lines.map((line) => (
                <li key={line.text} className={cn("max-w-[92%] rounded-2xl px-3 py-2 text-sm", line.who === "Caller" ? "bg-white/15" : "ms-auto bg-[#182793]/80")}>
                  <p className="text-[10px] font-bold tracking-wider text-white/60 uppercase">{line.who}</p>
                  <p className="mt-1 leading-5">{line.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-semibold text-[#d9f99d]">{page.sample.result}</p>
          </div>
        }
      />

      <section className="bg-white py-16">
        <div className="cs-container">
          <ul className="flex flex-wrap justify-center gap-2">
            {page.chips.map((chip) => (
              <li key={chip} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-[#182793]">
                {chip}
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
            {page.hero.points.map((point) => (
              <li key={point} className="inline-flex items-center gap-2">
                <Icon name="checkCircle" size={16} className="text-[#505FD0]" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="cs-container">
          <SectionTitle title={page.coverage.title} body={page.coverage.body} />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {page.coverage.cards.map((card, index) => (
              <li key={card.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <IconTile icon={CARD_ICONS[index] ?? "sparkles"} />
                <h3 className="mt-5 font-heading text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{card.body}</p>
                <ul className="mt-4 grid gap-2">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                      <Icon name="check" size={16} className="mt-0.5 shrink-0 text-[#07A0E7]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="platform-tabs" className="scroll-mt-28 bg-white py-20">
        <div className="cs-container">
          <SectionTitle title={page.tabsIntro.title} body={page.tabsIntro.body} />
          <div className="mt-10 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label={page.tabsIntro.title}>
            {page.tabs.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`platform-tab-${item.id}`}
                aria-selected={index === tab}
                aria-controls={`platform-panel-${item.id}`}
                onClick={() => setTab(index)}
                className={cn(
                  "focus-ring shrink-0 rounded-full px-4 py-2 text-sm font-semibold",
                  index === tab ? "bg-[#182793] text-white" : "bg-slate-100 text-slate-700",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id={`platform-panel-${active.id}`}
            aria-labelledby={`platform-tab-${active.id}`}
            className="mt-6 grid gap-8 rounded-3xl border border-slate-100 bg-gradient-to-br from-white via-[#eef2ff] to-[#e0f2fe] p-6 md:p-10 lg:grid-cols-[1.2fr_0.8fr]"
          >
            <div>
              <h3 className="font-heading text-2xl font-bold text-slate-900">{active.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{active.body}</p>
              <ul className="mt-5 grid gap-2">
                {active.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm font-medium text-slate-800">
                    <Icon name="checkCircle" size={16} className="text-[#505FD0]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[#0f1235] p-5 text-white">
              <p className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">{active.sampleTitle}</p>
              <ul className="mt-4 grid gap-3">
                {active.sample.map((row) => (
                  <li key={row} className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm">
                    {row}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="cs-container">
          <SectionTitle title={page.steps.title} body={page.steps.body} />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {page.steps.items.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <span className="text-4xl font-bold text-gray-200">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-heading text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="use-cases" className="scroll-mt-28 bg-white py-20">
        <div className="cs-container">
          <SectionTitle title={page.useCases.title} body={page.useCases.body} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {page.useCases.items.map((item) => (
              <li key={item.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="font-heading text-base font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="case-studies" className="scroll-mt-28 bg-[#020617] py-20 text-white">
        <div className="cs-container">
          <SectionTitle title={page.cases.title} body={page.cases.body} dark />
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {page.cases.items.map((item) => (
              <li key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-heading text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="integrations" className="scroll-mt-28 bg-white py-20">
        <div className="cs-container">
          <SectionTitle title={page.integrations.title} body={page.integrations.body} />
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {page.integrations.items.map((item) => (
              <li key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-[#182793]">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <a href="#platform-demo" className="btn-primary px-6 py-3 text-sm">
              {page.integrations.cta}
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="cs-container max-w-3xl">
          <h2 className="text-center font-heading text-3xl font-bold text-slate-900">{page.faq.title}</h2>
          <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {page.faq.items.map((item) => (
              <details key={item.q} className="group px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#505FD0]">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <Icon name="chevronDown" size={16} className="shrink-0 transition-transform group-open:rotate-180" />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="platform-demo" className="scroll-mt-28 bg-white py-20">
        <div className="cs-container max-w-3xl">
          <Pill icon="send">{page.hero.primary}</Pill>
          <h2 className="mt-3 font-heading text-3xl font-bold text-slate-900">{page.demo.title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{page.demo.body}</p>
          {status === "success" ? (
            <p role="status" className="mt-8 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-700">
              {form.success}
            </p>
          ) : (
            <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={onSubmit} noValidate>
              <Field id="p-name" label={form.name} error={errors.name}>
                <input id="p-name" className={inputClass} value={values.name} onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))} autoComplete="name" />
              </Field>
              <Field id="p-company" label={form.company} error={errors.company}>
                <input id="p-company" className={inputClass} value={values.company} onChange={(event) => setValues((current) => ({ ...current, company: event.target.value }))} autoComplete="organization" />
              </Field>
              <Field id="p-email" label={form.email} error={errors.email}>
                <input id="p-email" type="email" className={inputClass} value={values.email} onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))} autoComplete="email" />
              </Field>
              <Field id="p-phone" label={form.phone} error={errors.phone}>
                <input id="p-phone" type="tel" dir="ltr" className={inputClass} value={values.phone} onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value }))} autoComplete="tel" />
              </Field>
              <Field id="p-intent" label={form.interest} wide>
                <select
                  id="p-intent"
                  className={inputClass}
                  value={intent}
                  onChange={(event) => setIntent(event.target.value === "expert" ? "expert" : "demo")}
                >
                  {page.demo.intents.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="p-message" label={form.message} error={errors.message} wide>
                <textarea
                  id="p-message"
                  rows={4}
                  className={`${inputClass} h-auto py-3`}
                  value={values.message}
                  placeholder={page.demo.placeholder}
                  onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))}
                />
              </Field>
              {status === "error" ? (
                <p role="alert" className="text-sm text-red-600 md:col-span-2">
                  {errorMessage || form.error}
                </p>
              ) : null}
              <div className="md:col-span-2">
                <button type="submit" disabled={status === "sending"} className="btn-primary px-6 py-3 text-sm disabled:opacity-70">
                  {status === "sending" ? form.sending : form.submit}
                  <Icon name="send" size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Field({ id, label, error, wide, children }: { id: string; label: string; error?: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className={wide ? "md:col-span-2" : undefined}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
