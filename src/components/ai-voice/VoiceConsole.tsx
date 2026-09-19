import { cn } from "@/lib/cn";
import { AgentNetwork } from "@/components/ai-voice/AgentNetwork";
import { LanguageToggle } from "@/components/ai-voice/LanguageToggle";
import { Waveform } from "@/components/ai-voice/Waveform";
import { useVoiceScene } from "@/components/ai-voice/voice-scene";

export function VoiceConsole({ className }: { className?: string }) {
  const { voice, locale, setLocale, step } = useVoiceScene();
  const copy = voice.console;
  const rtl = locale === "ar";
  const customerText = step.customer[locale];
  const replyText = step.reply[locale];
  const phaseLabel =
    step.phase === "listening" ? copy.listeningLabel[locale] : copy.speakingLabel[locale];

  return (
    <div
      className={cn(
        "voice-console overflow-hidden rounded-[28px] border border-line p-5 md:p-6",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] tracking-[0.18em] text-muted uppercase">{copy.networkLabel}</p>
          <p className="mt-1 font-display text-lg text-mist">{step.agentName[locale]}</p>
        </div>
        <div className="flex items-center gap-3">
          <LanguageToggle locale={locale} onChange={setLocale} />
          <p className="flex items-center gap-2 text-[11px] tracking-[0.16em] text-accent-strong uppercase">
            <span className="voice-live-dot" aria-hidden="true" />
            {copy.liveLabel}
          </p>
        </div>
      </div>

      <AgentNetwork className="mt-5" nodes={copy.nodes} activeIds={step.activeNodes} />

      <div className="mt-6 flex flex-col items-center">
        <Waveform phase={step.phase} />
        <p className="mt-2 text-xs text-muted">
          {phaseLabel}
          {rtl ? " · " : " · "}
          {step.status[locale]}
        </p>
      </div>

      <div className="mt-6 grid gap-3" dir={rtl ? "rtl" : "ltr"} lang={rtl ? "ar" : "en"}>
        {customerText ? (
          <TranscriptBubble
            label={copy.customerLabel[locale]}
            text={customerText}
            rtl={rtl}
            tone="customer"
          />
        ) : (
          <div className="rounded-2xl border border-dashed border-line px-4 py-5 text-sm text-muted">
            {step.status[locale]}
          </div>
        )}
        {replyText ? (
          <TranscriptBubble label={step.agentName[locale]} text={replyText} rtl={rtl} tone="agent" />
        ) : null}
      </div>

      <dl
        className="mt-6 grid gap-3 border-t border-line pt-4 text-sm sm:grid-cols-3"
        dir={rtl ? "rtl" : "ltr"}
        lang={rtl ? "ar" : "en"}
      >
        <Meta label={copy.languageLabel[locale]} value={rtl ? "العربية" : "English"} rtl={rtl} />
        <Meta label={copy.intentLabel[locale]} value={step.intent[locale]} rtl={rtl} />
        <Meta label={copy.actionLabel[locale]} value={step.nextAction[locale]} rtl={rtl} />
      </dl>
    </div>
  );
}

function TranscriptBubble({
  label,
  text,
  rtl,
  tone,
}: {
  label: string;
  text: string;
  rtl: boolean;
  tone: "customer" | "agent";
}) {
  return (
    <figure
      className={cn(
        "rounded-2xl border px-4 py-3",
        tone === "agent" ? "border-accent/35 bg-accent/10" : "border-line bg-ink/50",
        rtl ? "font-arabic text-right" : "text-left",
      )}
    >
      <figcaption className={cn("text-[11px] tracking-[0.14em] text-accent-strong", !rtl && "uppercase")}>{label}</figcaption>
      <blockquote className="mt-2 text-[15px] leading-7 text-mist">{text}</blockquote>
    </figure>
  );
}

function Meta({ label, value, rtl }: { label: string; value: string; rtl: boolean }) {
  return (
    <div className={rtl ? "font-arabic text-right" : undefined}>
      <dt className={cn("text-[11px] tracking-[0.14em] text-muted", !rtl && "uppercase")}>{label}</dt>
      <dd className="mt-1 text-mist">{value}</dd>
    </div>
  );
}
