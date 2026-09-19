import { cn } from "@/lib/cn";
import type { VoicePhase } from "@/types";

type WaveformProps = {
  phase: VoicePhase;
  bars?: number;
  className?: string;
};

export function Waveform({ phase, bars = 18, className }: WaveformProps) {
  return (
    <div className={cn("voice-wave", className)} data-phase={phase} aria-hidden="true">
      {Array.from({ length: bars }, (_, index) => (
        <span key={index} style={{ animationDelay: `${(index % 8) * 0.08}s` }} />
      ))}
    </div>
  );
}
