/** English names for service-line slugs, used where leads are composed (email subject, WhatsApp text). */
export const serviceOptions = [
  { slug: "software-services", name: "Software Services" },
  { slug: "ai-integration-automation", name: "AI Applications, Integration & Automation" },
  { slug: "hardware-procurement", name: "Hardware Procurement" },
  { slug: "digital-maturity-assessment", name: "Package 1: Digital Maturity Assessment" },
  { slug: "ai-for-customer-service", name: "Package 2: AI for Customer Service" },
  { slug: "digital-transformation-ai-partner", name: "Package 3: Digital Transformation and AI Partner" },
];

export function serviceName(slug: string | undefined): string | undefined {
  return serviceOptions.find((option) => option.slug === slug)?.name;
}
