import { useLanguage, type Lang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

type LanguageSwitchProps = {
  light?: boolean;
  block?: boolean;
  className?: string;
};

/** English / العربية segmented toggle with a sliding gradient pill. */
export function LanguageSwitch({ light = false, block = false, className }: LanguageSwitchProps) {
  const { lang, setLang, copy } = useLanguage();
  const options: { value: Lang; label: string }[] = [
    { value: "en", label: copy.nav.english },
    { value: "ar", label: copy.nav.arabic },
  ];
  const index = lang === "en" ? 0 : 1;

  return (
    <div
      role="group"
      aria-label="Language"
      dir="ltr"
      className={cn(
        "relative inline-flex rounded-full border p-1 backdrop-blur-md",
        block ? "w-full bg-slate-100/80 border-white p-1.5 rounded-2xl" : light ? "border-black/5 bg-white" : "border-white/30 bg-white/5",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "bg-gradient-5 absolute top-1 bottom-1 w-[calc(50%-4px)] transition-[left] duration-300 ease-out",
          block ? "top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl" : "rounded-full",
        )}
        style={{ left: index === 0 ? (block ? 6 : 4) : "50%" }}
      />
      {options.map((option) => {
        const active = option.value === lang;
        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-pressed={active}
            onClick={() => setLang(option.value)}
            className={cn(
              "focus-ring relative z-[1] font-bold transition-colors",
              block ? "flex-1 rounded-xl py-3 text-sm" : "rounded-full px-4 py-1.5 text-xs",
              active ? "text-white" : light || block ? "text-[#1F1F1F]" : "text-white",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
