import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { setLenisInstance } from "@/lib/scroll-to";

export function useLenis(): void {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let instance:
      | {
          destroy: () => void;
          scrollTo: (
            target: HTMLElement | number | string,
            options?: { offset?: number; duration?: number },
          ) => void;
        }
      | undefined;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      instance = new Lenis({
        autoRaf: true,
        duration: 1.1,
      });
      setLenisInstance(instance);
    });

    return () => {
      cancelled = true;
      setLenisInstance(undefined);
      instance?.destroy();
    };
  }, [reduced]);
}
