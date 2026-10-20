import en from "./zillion.en";
import ar from "./zillion.ar";

export type { ZillionCopy, ServiceLine, ServiceLineId, ServicePage, LinkItem } from "./zillion.en";

export const zillion = { en, ar };

export const serviceSlugs = ["software-services", "ai-integration-automation", "hardware-procurement"] as const;
