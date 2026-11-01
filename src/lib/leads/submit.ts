import { serviceName } from "@/lib/services";
import { getAiAgentBySlug, getProductBySlug, getSite } from "@/lib/content/repository";
import type { DemoRequest } from "@/types";

export function buildMailto(request: DemoRequest): string {
  const site = getSite();
  const product = getProductBySlug(request.productSlug);
  const agent = getAiAgentBySlug(request.productSlug);
  const offering = product?.name ?? agent?.name ?? serviceName(request.productSlug) ?? request.productSlug;
  const intentLabel = request.intent === "expert" ? "Talk to an expert" : "Request a demo";
  const subject = `${intentLabel}: ${offering}`;
  const body = [
    `${intentLabel}`,
    "",
    `Name: ${request.name}`,
    `Company: ${request.company}`,
    `Email: ${request.email}`,
    `Phone / WhatsApp: ${request.phone}`,
    `Product: ${offering}`,
    "",
    request.message,
  ].join("\n");

  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const CONTACT_ENDPOINT = "/api/contact.php";

export function readHoneypot(form: HTMLFormElement): string {
  const value = new FormData(form).get("fax");
  return typeof value === "string" ? value : "";
}

export async function submitDemoRequest(
  request: DemoRequest,
  meta: { fax: string; formStartedAt: number },
): Promise<void> {
  let response: Response;
  try {
    response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: request.name,
        company: request.company,
        email: request.email,
        phone: request.phone,
        productSlug: request.productSlug,
        message: request.message,
        intent: request.intent,
        fax: meta.fax,
        formStartedAt: meta.formStartedAt,
      }),
    });
  } catch {
    window.location.href = buildMailto(request);
    return;
  }

  const payload = (await response.json().catch(() => null)) as { ok?: boolean } | null;
  if (!response.ok || !payload || payload.ok !== true) {
    throw new Error("Unable to send your request right now.");
  }
}
