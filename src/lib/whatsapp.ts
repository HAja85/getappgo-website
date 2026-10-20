import { serviceName } from "@/lib/services";
import { getAiAgentBySlug, getProductBySlug, getSite } from "@/lib/content/repository";

function digitsOnly(value: string): string {
  return value.replace(/[^\d]/g, "");
}

export function buildWhatsAppUrl(productSlug?: string): string {
  const site = getSite();
  const product = productSlug ? getProductBySlug(productSlug) : undefined;
  const agent = productSlug ? getAiAgentBySlug(productSlug) : undefined;
  const offering = product?.name ?? agent?.name ?? serviceName(productSlug);
  const message = offering
    ? `Hi, I'm interested in ${offering}. I'd like to request a demo.`
    : site.contact.whatsapp.defaultMessage;
  return `https://wa.me/${digitsOnly(site.contact.whatsapp.e164)}?text=${encodeURIComponent(message)}`;
}
