import { getAiAgentBySlug, getProductBySlug, getSite } from "@/lib/content/repository";
import type { DemoRequest } from "@/types";

export function buildMailto(request: DemoRequest): string {
  const site = getSite();
  const product = getProductBySlug(request.productSlug);
  const agent = getAiAgentBySlug(request.productSlug);
  const offering = product?.name ?? agent?.name ?? request.productSlug;
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

export async function submitDemoRequest(request: DemoRequest): Promise<void> {
  const endpoint = import.meta.env.VITE_LEADS_ENDPOINT;
  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error("Unable to send your request right now.");
    }
    return;
  }

  window.location.href = buildMailto(request);
}
