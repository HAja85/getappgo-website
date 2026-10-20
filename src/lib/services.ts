/** English names for service-line slugs, used where leads are composed (email subject, WhatsApp text). */
export const serviceOptions = [
  { slug: "software-services", name: "Software Services" },
  { slug: "ai-integration-automation", name: "AI Applications, Integration & Automation" },
  { slug: "hardware-procurement", name: "Hardware Procurement" },
];

export function serviceName(slug: string | undefined): string | undefined {
  return serviceOptions.find((option) => option.slug === slug)?.name;
}
