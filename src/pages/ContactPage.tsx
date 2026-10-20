import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { intentFromSearch } from "@/components/contact/DemoDialog";
import { useDemo } from "@/components/contact/DemoProvider";
import { PageHero, HeroGlassCard } from "@/components/inner/PageHero";
import { IconTile, Pill } from "@/components/inner/Blocks";
import { Icon } from "@/components/zillion/Icon";
import { useCopy } from "@/i18n/LanguageProvider";
import { demoRequestSchema } from "@/lib/content/schema";
import { getAiAgents, getProducts, getSite } from "@/lib/content/repository";
import { submitDemoRequest } from "@/lib/leads/submit";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const inputClass =
  "h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-[#505FD0] focus:bg-white focus:ring-2 focus:ring-[#505FD0]/20";

export function ContactPage() {
  const copy = useCopy();
  const site = getSite();
  const { openDemo } = useDemo();
  const [params] = useSearchParams();
  const intent = intentFromSearch(params.get("intent"));
  const form = copy.contact.form;
  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    productSlug: params.get("product") ?? "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Pre-rendered HTML has no query string, so apply ?product= after hydration.
  const productParam = params.get("product");
  useEffect(() => {
    if (productParam) setValues((current) => ({ ...current, productSlug: productParam }));
  }, [productParam]);

  const set = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = demoRequestSchema.safeParse({ ...values, intent });
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
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Seo path="/contact" title="Contact" description={copy.contact.seoDescription} />
      <PageHero
        badge={copy.contact.hero.badge}
        badgeIcon="mail"
        title={copy.contact.hero.title}
        accent={copy.contact.hero.accent}
        body={copy.contact.hero.body}
        image="/images/categories/business-software.png"
        aside={
          <HeroGlassCard
            label={copy.contact.hero.card.label}
            title={copy.contact.hero.card.title}
            body={copy.contact.hero.card.body}
            action={
              <button type="button" onClick={() => openDemo({ intent: "expert" })} className="btn-primary px-5 py-2.5 text-sm">
                {copy.contact.hero.card.cta}
                <Icon name="arrowRight" size={16} className="rtl:-scale-x-100" />
              </button>
            }
          />
        }
      />

      <section className="relative z-[1] bg-white">
        <div className="cs-container">
          <ul className="-mt-12 grid gap-4 md:grid-cols-3">
            <ContactCard icon="phone" title={copy.contact.cards.phone.title} body={copy.contact.cards.phone.body} value={site.contact.phone} href={`tel:${site.contact.phone}`} />
            <ContactCard icon="mail" title={copy.contact.cards.email.title} body={copy.contact.cards.email.body} value={site.contact.email} href={`mailto:${site.contact.email}`} />
            <ContactCard icon="whatsapp" title={copy.contact.cards.whatsapp.title} body={copy.contact.cards.whatsapp.body} value={site.contact.whatsapp.display} href={buildWhatsAppUrl(values.productSlug || undefined)} external />
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="cs-container grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <Pill icon="send">{form.pill}</Pill>
            <h2 className="mt-3 font-heading text-2xl font-bold text-slate-900 md:text-3xl">{form.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{form.body}</p>
            {status === "success" ? (
              <p role="status" className="mt-8 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-700">
                {form.success}
              </p>
            ) : (
              <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={onSubmit} noValidate>
                <Field id="c-name" label={form.name} error={errors.name}>
                  <input id="c-name" className={inputClass} value={values.name} onChange={(e) => set("name")(e.target.value)} autoComplete="name" />
                </Field>
                <Field id="c-company" label={form.company} error={errors.company}>
                  <input id="c-company" className={inputClass} value={values.company} onChange={(e) => set("company")(e.target.value)} autoComplete="organization" />
                </Field>
                <Field id="c-email" label={form.email} error={errors.email}>
                  <input id="c-email" type="email" className={inputClass} value={values.email} onChange={(e) => set("email")(e.target.value)} autoComplete="email" placeholder="you@company.com" />
                </Field>
                <Field id="c-phone" label={form.phone} error={errors.phone}>
                  <input id="c-phone" type="tel" dir="ltr" className={inputClass} value={values.phone} onChange={(e) => set("phone")(e.target.value)} autoComplete="tel" />
                </Field>
                <Field id="c-interest" label={form.interest} error={errors.productSlug} wide>
                  <select id="c-interest" className={inputClass} value={values.productSlug} onChange={(e) => set("productSlug")(e.target.value)}>
                    <option value="">{form.interestPlaceholder}</option>
                    <optgroup label={form.groups.services}>
                      {copy.lines.map((line) => (
                        <option key={line.slug} value={line.slug}>
                          {line.label}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label={copy.nav.packages}>
                      {copy.packages.items.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.number}: {item.title}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label={form.groups.agents}>
                      {getAiAgents().map((agent) => (
                        <option key={agent.slug} value={agent.slug}>
                          {agent.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label={form.groups.products}>
                      {getProducts().map((product) => (
                        <option key={product.slug} value={product.slug}>
                          {product.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </Field>
                <Field id="c-message" label={form.message} error={errors.message} wide>
                  <textarea
                    id="c-message"
                    rows={5}
                    className={`${inputClass} h-auto py-3`}
                    value={values.message}
                    onChange={(e) => set("message")(e.target.value)}
                    placeholder={form.messagePlaceholder}
                  />
                </Field>
                {status === "error" ? (
                  <p role="alert" className="text-sm text-red-600 md:col-span-2">
                    {form.error}
                  </p>
                ) : null}
                <div className="md:col-span-2">
                  <button type="submit" disabled={status === "sending"} className="btn-primary px-6 py-3 text-sm disabled:opacity-70">
                    {status === "sending" ? form.sending : form.submit}
                    <Icon name="send" size={16} className="rtl:-scale-x-100" />
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="relative overflow-hidden rounded-2xl bg-[#3b1d5c] p-8 text-white">
            <img src="/images/products/ai-call-center-platform.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#4b2a7a]/80 to-[#2b0f4a]/95" />
            <div className="relative">
              <Pill icon="sparkles" dark>
                {copy.contact.side.label}
              </Pill>
              <h3 className="mt-4 font-heading text-2xl font-bold">{copy.contact.side.title}</h3>
              <p className="mt-3 text-sm text-white/80">{copy.contact.side.body}</p>
              <ul className="mt-8 grid gap-3">
                {copy.contact.side.checks.map((check) => (
                  <li key={check} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-3 text-xs font-semibold">
                    <Icon name="checkCircle" size={16} />
                    {check}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactCard({ icon, title, body, value, href, external }: { icon: "phone" | "mail" | "whatsapp"; title: string; body: string; value: string; href: string; external?: boolean }) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="focus-ring flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
      >
        <span className="flex items-center gap-3">
          <IconTile icon={icon} className="h-9 w-9" />
          <span className="text-xs font-bold tracking-wider text-[#182793] uppercase">{title}</span>
        </span>
        <span dir="ltr" className="mt-4 text-lg font-semibold text-slate-900 rtl:text-end">{value}</span>
        <span className="mt-1 text-xs text-slate-500">{body}</span>
      </a>
    </li>
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
