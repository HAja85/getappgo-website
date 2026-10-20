import { Link } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { PageHero } from "@/components/inner/PageHero";
import { useCopy } from "@/i18n/LanguageProvider";

export function NotFoundPage() {
  const copy = useCopy();
  const hero = copy.pageHeroes.notFound;
  return (
    <>
      <Seo path="/404" title="Not found" description="This page does not exist." />
      <PageHero
        badge={hero.badge}
        badgeIcon="alert"
        title={hero.title}
        accent={hero.accent}
        body={hero.body}
        compact
        actions={
          <Link to="/" className="btn-primary px-5 py-2.5 text-sm">
            {copy.nav.home}
          </Link>
        }
      />
    </>
  );
}
