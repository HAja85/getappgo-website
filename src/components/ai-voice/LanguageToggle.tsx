import { cn } from "@/lib/cn";
import type { VoiceLocale } from "@/types";
import { getAiVoice } from "@/lib/content/repository";

type LanguageToggleProps = {
  locale: VoiceLocale;
  onChange: (locale: VoiceLocale) => void;
};

export function LanguageToggle({ locale, onChange }: LanguageToggleProps) {
  const labels = getAiVoice().console;

  return (
    <div
      role="radiogroup"
      aria-label="Conversation language"
      className="inline-flex rounded-full border border-line p-1"
    >
      <ToggleButton selected={locale === "ar"} onSelect={() => onChange("ar")} lang="ar">
        {labels.arabicToggle}
      </ToggleButton>
      <ToggleButton selected={locale === "en"} onSelect={() => onChange("en")} lang="en">
        {labels.englishToggle}
      </ToggleButton>
    </div>
  );
}

function ToggleButton({
  selected,
  onSelect,
  lang,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  lang: string;
  children: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      lang={lang}
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        selected ? "bg-accent text-white" : "text-muted hover:text-mist",
      )}
    >
      {children}
    </button>
  );
}
