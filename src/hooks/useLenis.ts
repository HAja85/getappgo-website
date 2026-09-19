import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function useLenis(): void {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let instance: { destroy: () => void } | undefined;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      instance = new Lenis({
        autoRaf: true,
        duration: 1.1,
      });
    });

    return () => {
      cancelled = true;
      instance?.destroy();
    };
  }, [reduced]);
}
