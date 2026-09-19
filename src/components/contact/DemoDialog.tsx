import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { demoRequestSchema } from "@/lib/content/schema";
import { getProducts, getSite } from "@/lib/content/repository";
import { submitDemoRequest } from "@/lib/leads/submit";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { useDemo } from "./DemoProvider";
import type { DemoIntent } from "@/types";

const emptyForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  productSlug: "",
  message: "",
};

export function DemoDialog() {
  const site = getSite();
  const products = getProducts();
  const { open, closeDemo, productSlug, intent } = useDemo();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setErrors({});
    setForm({
      ...emptyForm,
      productSlug: productSlug ?? "",
    });
  }, [open, productSlug]);

  const copy = useMemo(
    () =>
      intent === "expert"
        ? { title: site.demo.expertTitle, subtitle: site.demo.expertSubtitle }
        : { title: site.demo.title, subtitle: site.demo.subtitle },
    [intent, site.demo],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = demoRequestSchema.safeParse({ ...form, intent });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setStatus("submitting");
    try {
      await submitDemoRequest(parsed.data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && closeDemo()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="relative fixed inset-x-3 top-[8vh] z-50 mx-auto max-h-[84vh] max-w-lg overflow-auto rounded-[28px] border border-line bg-ink-soft p-6 md:p-8">
          <Dialog.Title className="font-display text-2xl font-semibold text-mist">{copy.title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-6 text-muted">
            {copy.subtitle}
          </Dialog.Description>

          {status === "success" ? (
            <div className="mt-8">
              <p className="text-mist">{site.demo.successTitle}</p>
              <p className="mt-2 text-sm text-muted">{site.demo.successBody}</p>
              <Button className="mt-6" onClick={closeDemo}>
                Close
              </Button>
            </div>
          ) : (
            <form className="mt-6 grid gap-4" onSubmit={onSubmit} noValidate>
              <Field label="Name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  autoComplete="name"
                />
              </Field>
              <Field label="Company" error={errors.company}>
                <input
                  value={form.company}
                  onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
                  autoComplete="organization"
                />
              </Field>
              <Field label="Work email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  autoComplete="email"
                />
              </Field>
              <Field label="Phone / WhatsApp" error={errors.phone}>
                <input
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  autoComplete="tel"
                />
              </Field>
              <Field label="Product" error={errors.productSlug}>
                <Select.Root
                  value={form.productSlug}
                  onValueChange={(value) => setForm((current) => ({ ...current, productSlug: value }))}
                >
                  <Select.Trigger className="flex h-11 w-full items-center justify-between rounded-2xl border border-line bg-ink px-4 text-left text-sm text-mist">
                    <Select.Value placeholder="Select a product" />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="z-[60] overflow-hidden rounded-2xl border border-line bg-ink-elevated">
                      <Select.Viewport className="p-2">
                        {products.map((product) => (
                          <Select.Item
                            key={product.slug}
                            value={product.slug}
                            className="cursor-pointer rounded-xl px-3 py-2 text-sm text-mist outline-none data-[highlighted]:bg-accent/20"
                          >
                            <Select.ItemText>{product.name}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </Field>
              <Field label="Message" error={errors.message}>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                />
              </Field>
              {status === "error" ? (
                <p className="text-sm text-red-300">Unable to send your request. Please try WhatsApp or email.</p>
              ) : null}
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <Button type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending…" : copy.title}
                </Button>
                <a
                  className="inline-flex h-11 items-center justify-center rounded-full border border-line px-5 text-sm text-mist"
                  href={buildWhatsAppUrl(form.productSlug || productSlug)}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp an expert
                </a>
              </div>
            </form>
          )}
          <Dialog.Close className="absolute top-4 right-4 text-sm text-muted hover:text-mist">
            Close
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-muted">{label}</span>
      <div className="[&_input]:h-11 [&_input]:rounded-2xl [&_input]:border [&_input]:border-line [&_input]:bg-ink [&_input]:px-4 [&_input]:text-mist [&_textarea]:rounded-2xl [&_textarea]:border [&_textarea]:border-line [&_textarea]:bg-ink [&_textarea]:p-4 [&_textarea]:text-mist">
        {children}
      </div>
      {error ? (
        <span className="text-xs text-red-300" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export function intentFromSearch(value: string | null): DemoIntent {
  return value === "expert" ? "expert" : "demo";
}
