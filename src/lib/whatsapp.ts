import { getProductBySlug, getSite } from "@/lib/content/repository";

function digitsOnly(value: string): string {
  return value.replace(/[^\d]/g, "");
}

export function buildWhatsAppUrl(productSlug?: string): string {
  const site = getSite();
  const product = productSlug ? getProductBySlug(productSlug) : undefined;
  const message = product
    ? `Hi, I'm interested in ${product.name}. I'd like to request a demo.`
    : site.contact.whatsapp.defaultMessage;
  return `https://wa.me/${digitsOnly(site.contact.whatsapp.e164)}?text=${encodeURIComponent(message)}`;
}
