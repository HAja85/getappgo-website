import type { MouseEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useDemo } from "@/components/contact/DemoProvider";
import { handleHashHref } from "@/lib/scroll-to";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Cta } from "@/types";

type ActionCtaProps = {
  cta: Cta;
  productSlug?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ActionCta({ cta, productSlug, variant = "primary", className }: ActionCtaProps) {
  const { openDemo } = useDemo();

  if (cta.href) {
    return (
      <ButtonLink
        to={cta.href}
        variant={variant}
        className={className}
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          if (handleHashHref(cta.href ?? "")) {
            event.preventDefault();
          }
        }}
      >
        {cta.label}
      </ButtonLink>
    );
  }

  if (cta.action === "whatsapp") {
    return (
      <a
        href={buildWhatsAppUrl(productSlug)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-11 items-center justify-center rounded-full border border-line px-5 text-sm text-mist"
      >
        {cta.label}
      </a>
    );
  }

  return (
    <Button
      variant={variant}
      className={className}
      onClick={() =>
        openDemo({
          productSlug,
          intent: cta.action === "expert" ? "expert" : "demo",
        })
      }
    >
      {cta.label}
    </Button>
  );
}
