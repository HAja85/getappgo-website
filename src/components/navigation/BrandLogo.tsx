import { Link } from "react-router";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
  asLink?: boolean;
};

/** ZillionxAI lockup: gradient ZxAI mark plus wordmark. */
export function BrandLogo({ tone = "dark", size = "md", className, asLink = true }: BrandLogoProps) {
  const content = (
    <span dir="ltr" className={cn("inline-flex items-center gap-2", size === "lg" ? "gap-3" : "", className)}>
      <img
        src="/images/zillion/mark.svg"
        alt=""
        width={88}
        height={48}
        className={size === "lg" ? "h-12 w-auto" : "h-10 w-auto md:h-11"}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading font-bold tracking-tight",
            size === "lg" ? "text-[28px]" : "text-[20px] md:text-[22px]",
            tone === "light" ? "text-white" : "text-[#182793]",
          )}
        >
          Zillion<span className={tone === "light" ? "text-[#c9c2ff]" : "text-gradient-4"}>xAI</span>
        </span>
        <span
          className={cn(
            "mt-1 text-[9px] font-medium tracking-[0.08em]",
            tone === "light" ? "text-white/70" : "text-slate-500",
          )}
        >
          SaaS, AI, Automation.
        </span>
      </span>
    </span>
  );

  if (!asLink) return content;
  return (
    <Link to="/" aria-label="ZillionxAI home" className="focus-ring rounded-lg">
      {content}
    </Link>
  );
}
