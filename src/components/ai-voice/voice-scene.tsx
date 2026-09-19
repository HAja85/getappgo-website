import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { loadGsap } from "@/animations/gsap";
import { getAiVoice } from "@/lib/content/repository";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { AiVoiceContent, VoiceLocale, VoiceSceneStep } from "@/types";

type VoiceSceneValue = {
  voice: AiVoiceContent;
  locale: VoiceLocale;
  setLocale: (locale: VoiceLocale) => void;
  step: VoiceSceneStep;
  stepIndex: number;
  reduced: boolean;
};

const VoiceSceneContext = createContext<VoiceSceneValue | null>(null);

export function VoiceSceneProvider({ children }: { children: ReactNode }) {
  const voice = getAiVoice();
  const reduced = usePrefersReducedMotion();
  const [locale, setLocale] = useState<VoiceLocale>("ar");
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (reduced) {
      setStepIndex(Math.max(0, voice.scene.length - 1));
      return;
    }

    let cancelled = false;
    let tween: { kill: () => void } | undefined;
    setStepIndex(0);

    void loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const cycle = { t: 0 };
      const count = voice.scene.length;
      let last = -1;
      tween = gsap.to(cycle, {
        t: count,
        duration: Math.min(15, Math.max(8, count * 1.45)),
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          const next = Math.min(count - 1, Math.floor(cycle.t % count));
          if (next !== last) {
            last = next;
            setStepIndex(next);
          }
        },
      });
    });

    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, [reduced, locale, voice.scene.length]);

  const value = useMemo(
    () => ({
      voice,
      locale,
      setLocale,
      step: voice.scene[stepIndex] ?? voice.scene[0],
      stepIndex,
      reduced,
    }),
    [locale, reduced, stepIndex, voice],
  );

  return <VoiceSceneContext.Provider value={value}>{children}</VoiceSceneContext.Provider>;
}

export function useVoiceScene(): VoiceSceneValue {
  const context = useContext(VoiceSceneContext);
  if (!context) {
    throw new Error("useVoiceScene must be used within VoiceSceneProvider");
  }
  return context;
}
