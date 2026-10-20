import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50",
        size === "md" ? "h-11 px-5 text-sm" : "h-9 px-4 text-sm",
        variant === "primary" && "btn-primary",
        variant === "secondary" &&
          "border border-slate-300 bg-white text-slate-800 hover:border-[#505FD0] hover:text-[#182793]",
        variant === "ghost" && "text-muted hover:text-mist",
        className,
      )}
      {...props}
    />
  );
}
