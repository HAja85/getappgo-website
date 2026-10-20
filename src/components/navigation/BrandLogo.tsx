import { Link } from "react-router";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
  asLink?: boolean;
};

/** ZillionAI lockup: gradient Z mark plus wordmark, white on dark surfaces and full colour on light. */
export function BrandLogo({ tone = "dark", size = "md", className, asLink = true }: BrandLogoProps) {
  const content = (
    <span dir="ltr" className={cn("inline-flex items-center gap-2", size === "lg" ? "gap-3" : "", className)}>
      <img
        src="/images/zillion/mark.svg"
        alt=""
        width={48}
        height={48}
        className={size === "lg" ? "h-12 w-12" : "h-10 w-10 md:h-11 md:w-11"}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading font-bold tracking-tight",
            size === "lg" ? "text-[30px]" : "text-[22px] md:text-[24px]",
            tone === "light" ? "text-white" : "text-[#182793]",
          )}
        >
          zillion<span className={tone === "light" ? "text-[#c9c2ff]" : "text-gradient-4"}>AI</span>
          <span className={tone === "light" ? "text-white/70" : "text-[#D97817]"}>.</span>
        </span>
        <span
          className={cn(
            "mt-1 text-[8px] font-medium tracking-[0.08em]",
            tone === "light" ? "text-white/70" : "text-slate-500",
          )}
        >
          Software · AI · Hardware
        </span>
      </span>
    </span>
  );

  if (!asLink) return content;
  return (
    <Link to="/" aria-label="ZillionAI home" className="focus-ring rounded-lg">
      {content}
    </Link>
  );
}
