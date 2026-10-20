import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/zillion/Icon";
import { cn } from "@/lib/cn";

export function Pill({ icon = "sparkles", children, dark }: { icon?: IconName; children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        dark ? "bg-white/10 text-white" : "bg-blue-50 text-[#182793]",
      )}
    >
      <Icon name={icon} size={12} />
      {children}
    </p>
  );
}

export function SectionTitle({
  pill,
  pillIcon,
  title,
  body,
  align = "center",
  dark,
  divider,
}: {
  pill?: string;
  pillIcon?: IconName;
  title: string;
  body?: string;
  align?: "center" | "start";
  dark?: boolean;
  divider?: boolean;
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl")}>
      {pill ? <Pill icon={pillIcon} dark={dark}>{pill}</Pill> : null}
      <h2 className={cn("mt-3 font-heading text-3xl font-bold md:text-4xl lg:text-[44px] lg:leading-tight", dark ? "text-white" : "text-slate-900")}>{title}</h2>
      {divider ? <div className={cn("divider-cyan mt-4", align === "center" && "mx-auto")} /> : null}
      {body ? <p className={cn("mt-4 text-base", dark ? "text-white/70" : "text-slate-600")}>{body}</p> : null}
    </div>
  );
}

export function IconTile({ icon, className }: { icon: IconName; className?: string }) {
  return (
    <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#182793] to-[#7B3368] text-white shadow-md", className)}>
      <Icon name={icon} size={18} />
    </span>
  );
}
