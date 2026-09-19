import { Container } from "@/components/ui/Container";
import { ActionCta } from "@/components/ui/ActionCta";
import { getSite } from "@/lib/content/repository";

export function FinalCta({ productSlug }: { productSlug?: string }) {
  const site = getSite();
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-[32px] border border-line bg-ink-elevated px-6 py-12 text-center md:px-12">
          <h2 className="font-display text-3xl text-white md:text-4xl">Ready to see the right product in context?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Request a demo or talk to an expert. WhatsApp and email stay available if you prefer a direct conversation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ActionCta cta={{ label: site.labels.requestDemo, action: "demo" }} productSlug={productSlug} />
            <ActionCta
              cta={{ label: site.labels.talkToExpert, action: "expert" }}
              productSlug={productSlug}
              variant="secondary"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
