import { Seo } from "@/components/seo/Seo";
import { Container } from "@/components/ui/Container";
import { DeliveryProcess } from "@/components/sections/DeliveryProcess";
import { FinalCta } from "@/components/sections/FinalCta";
import { getSite } from "@/lib/content/repository";

export function AboutPage() {
  const site = getSite();
  return (
    <>
      <Seo path="/about" title="About" description={site.about.body} />
      <Container className="pb-12">
        <p className="text-xs tracking-[0.18em] text-accent-strong uppercase">About</p>
        <h1 className="font-display mt-4 max-w-3xl text-4xl text-white md:text-5xl">{site.about.headline}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{site.about.body}</p>
        {site.hero.visual ? (
          <div className="visual-frame mt-10 max-w-4xl overflow-hidden rounded-[28px]">
            <img
              src={site.hero.visual}
              alt={site.hero.visualAlt ?? ""}
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {site.about.values.map((value) => (
            <article key={value.title} className="rounded-[24px] border border-line p-6">
              <h2 className="font-display text-xl text-mist">{value.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{value.body}</p>
            </article>
          ))}
        </div>
      </Container>
      <DeliveryProcess />
      <FinalCta />
    </>
  );
}
