import {
  getIndustries,
  getProducts,
  getSolutions,
} from "@/lib/content/repository";

export function getPrerenderRoutes(): string[] {
  return [
    "/",
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
