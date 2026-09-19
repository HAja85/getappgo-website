import faqsFile from "@/content/faqs.json";
import industriesFile from "@/content/industries.json";
import navigationFile from "@/content/navigation.json";
import productsFile from "@/content/products.json";
import siteFile from "@/content/site.json";
import solutionsFile from "@/content/solutions.json";
import testimonialsFile from "@/content/testimonials.json";
import type {
  Faq,
  Industry,
  NavigationContent,
  Product,
  ProductCategory,
  ProductCategoryMeta,
  ProductType,
  SiteContent,
  Solution,
  Testimonial,
} from "@/types";
import {
  faqsFileSchema,
  industriesFileSchema,
  navigationSchema,
  productsFileSchema,
  siteSchema,
  solutionsFileSchema,
  testimonialsFileSchema,
} from "./schema";

const site = siteSchema.parse(siteFile) as SiteContent;
const navigation = navigationSchema.parse(navigationFile) as NavigationContent;
const productsData = productsFileSchema.parse(productsFile);
const industriesData = industriesFileSchema.parse(industriesFile);
const solutionsData = solutionsFileSchema.parse(solutionsFile);
const faqsData = faqsFileSchema.parse(faqsFile);
const testimonialsData = testimonialsFileSchema.parse(testimonialsFile);

export function getSite(): SiteContent {
  return site;
}

export function getNavigation(): NavigationContent {
  return navigation;
}

export function getCategories(): ProductCategoryMeta[] {
  return productsData.categories;
}

export function getProducts(): Product[] {
  return productsData.products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return productsData.products.filter((product) => product.category === category);
}

export function getProductsByType(type: ProductType): Product[] {
  return productsData.products.filter((product) => product.type === type);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.related
    .map((slug) => getProductBySlug(slug))
    .filter((item): item is Product => Boolean(item));
}

export function getIndustries(): Industry[] {
  return industriesData.industries;
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industriesData.industries.find((industry) => industry.slug === slug);
}

export function getProductsForIndustry(industrySlug: string): Product[] {
  const industry = getIndustryBySlug(industrySlug);
  if (!industry) return [];
  return industry.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((item): item is Product => Boolean(item));
}

export function getIndustriesForProduct(product: Product): Industry[] {
  return product.industries
    .map((slug) => getIndustryBySlug(slug))
    .filter((item): item is Industry => Boolean(item));
}

export function getSolutions(): Solution[] {
  return solutionsData.solutions;
}

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutionsData.solutions.find((solution) => solution.slug === slug);
}

export function getProductsForSolution(solutionSlug: string): Product[] {
  const solution = getSolutionBySlug(solutionSlug);
  if (!solution) return [];
  return solution.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((item): item is Product => Boolean(item));
}

export function getFaqs(): Faq[] {
  return faqsData.items;
}

export function getFaqsByIds(ids: string[]): Faq[] {
  return ids
    .map((id) => faqsData.items.find((faq) => faq.id === id))
    .filter((item): item is Faq => Boolean(item));
}

export function getTestimonials(): Testimonial[] {
  if (testimonialsData.enabled === false) return [];
  return testimonialsData.items;
}
