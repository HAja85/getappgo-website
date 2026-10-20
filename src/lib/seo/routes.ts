import { serviceSlugs } from "@/content/zillion";
import {
  getIndustries,
  getProducts,
  getSolutions,
} from "@/lib/content/repository";

export function getPrerenderRoutes(): string[] {
  return [
    "/",
    ...serviceSlugs.map((slug) => `/services/${slug}`),
    "/ai-voice-agents",
    "/products",
    ...getProducts().map((product) => `/products/${product.slug}`),
    "/solutions",
    ...getSolutions().map((solution) => `/solutions/${solution.slug}`),
    "/industries",
    ...getIndustries().map((industry) => `/industries/${industry.slug}`),
    "/about",
    "/contact",
    "/privacy",
  ];
}
