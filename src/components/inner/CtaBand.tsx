import { Link } from "react-router";
import { useDemo } from "@/components/contact/DemoProvider";
import { Icon } from "@/components/zillion/Icon";
import { useCopy } from "@/i18n/LanguageProvider";

type CtaBandProps = {
  title: string;
  body: string;
  primary?: string;
  secondary?: string;
  productSlug?: string;
};

/** Gradient call-to-action band with sparkles (reference CTA band). */
export function CtaBand({ title, body, primary, secondary, productSlug }: CtaBandProps) {
  const copy = useCopy();
  const { openDemo } = useDemo();
  return (
    <section className="bg-gradient-1 relative overflow-hidden py-20 text-white">
      <span aria-hidden="true" className="absolute top-10 left-[5%] text-6xl text-white/15">✦</span>
      <span aria-hidden="true" className="absolute right-[4%] bottom-6 text-7xl text-white/15">✦</span>
      <div className="cs-container relative text-center">
        <h2 className="mx-auto max-w-4xl font-heading text-3xl font-bold md:text-[40px] md:leading-tight">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/85 md:text-base">{body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => openDemo({ intent: "demo", productSlug })}
            className="focus-ring inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-[#182793] shadow-md transition-transform hover:scale-105"
          >
            {primary ?? copy.common.requestDemo}
            <Icon name="zap" size={14} />
          </button>
          <Link
            to="/contact"
            className="focus-ring inline-flex items-center rounded-md border border-white px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {secondary ?? copy.common.contactTeam}
          </Link>
        </div>
      </div>
    </section>
  );
}
