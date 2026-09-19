import { Container } from "@/components/ui/Container";
import { ActionCta } from "@/components/ui/ActionCta";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getSite } from "@/lib/content/repository";

export function Hero() {
  const site = getSite();

  return (
    <section className="relative overflow-hidden pb-20">
      <Container>
        <div className="mx-auto max-w-4xl pt-10 text-center md:pt-16">
          <p className="text-xs font-medium tracking-[0.2em] text-accent-strong uppercase">{site.hero.eyebrow}</p>
          <h1 className="font-display mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-white md:text-6xl">
            {site.hero.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted md:text-lg">{site.hero.subhead}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ActionCta cta={site.hero.primaryCta} />
            <ButtonLink to={site.hero.secondaryCta.href ?? "/products"} variant="secondary">
              {site.hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
        {site.hero.visual ? (
          <div className="visual-frame mx-auto mt-14 max-w-5xl overflow-hidden rounded-[32px]">
            <img
              src={site.hero.visual}
              alt={site.hero.visualAlt ?? ""}
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
