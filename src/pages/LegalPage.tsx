import { Seo } from "@/components/seo/Seo";
import { Container } from "@/components/ui/Container";
import { getSite } from "@/lib/content/repository";

export function LegalPage() {
  const site = getSite();
  return (
    <>
      <Seo path="/privacy" title="Privacy" description={`${site.brand.name} privacy notice.`} />
      <Container className="max-w-3xl pb-24">
        <h1 className="font-display text-4xl text-white">Privacy</h1>
        <p className="mt-6 text-sm leading-7 text-muted">
          Demo requests collect name, company, work email, phone, selected product, and message so we can respond.
          We do not sell this information. Contact {site.contact.email} for questions about stored requests.
        </p>
      </Container>
    </>
  );
}
