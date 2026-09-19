import { Helmet } from "react-helmet-async";
import { getSite } from "@/lib/content/repository";

type SeoProps = {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

export function Seo({ title, description, path, image, type = "website" }: SeoProps) {
  const site = getSite();
  const fullTitle = title ? site.seo.titleTemplate.replace("%s", title) : site.seo.defaultTitle;
  const desc = description ?? site.seo.defaultDescription;
  const canonical = `${site.seo.canonicalOrigin.replace(/\/$/, "")}${path}`;
  const ogImage = `${site.seo.canonicalOrigin.replace(/\/$/, "")}${image ?? site.seo.ogImage}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
