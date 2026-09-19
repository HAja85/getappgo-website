import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { Seo } from "@/components/seo/Seo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { intentFromSearch } from "@/components/contact/DemoDialog";
import { useDemo } from "@/components/contact/DemoProvider";
import { getSite } from "@/lib/content/repository";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function ContactPage() {
  const site = getSite();
  const [params] = useSearchParams();
  const { openDemo } = useDemo();
  const product = params.get("product") ?? undefined;
  const intent = intentFromSearch(params.get("intent"));

  useEffect(() => {
    openDemo({ productSlug: product, intent });
  }, [intent, openDemo, product]);

  return (
    <>
      <Seo path="/contact" title="Contact" description="Request a demo or talk to a GetAppGo expert." />
      <Container className="pb-24">
        <h1 className="font-display text-4xl text-white">Contact</h1>
        <p className="mt-4 max-w-xl text-muted">
          Request a demo, email us, or message an expert on WhatsApp. The selected product is included when you arrive from a product page.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={() => openDemo({ productSlug: product, intent: "demo" })}>
            {site.labels.requestDemo}
          </Button>
          <a
            className="inline-flex h-11 items-center justify-center rounded-full border border-line px-5 text-sm text-mist"
            href={buildWhatsAppUrl(product)}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a className="inline-flex h-11 items-center justify-center px-2 text-sm text-accent-strong" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
        </div>
      </Container>
    </>
  );
}
