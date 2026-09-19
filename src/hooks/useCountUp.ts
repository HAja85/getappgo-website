import { useEffect, useRef, type RefObject } from "react";
import { loadGsap } from "@/animations/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function useCountUp(value: number, enabled: boolean): RefObject<HTMLSpanElement | null> {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;

    if (reduced) {
      node.textContent = String(value);
      return;
    }

    let animation: { kill: () => void; scrollTrigger?: { kill: () => void } } | undefined;
    let cancelled = false;
    const state = { n: 0 };

    void loadGsap().then(({ gsap }) => {
      if (cancelled || !ref.current) return;
      animation = gsap.to(state, {
        n: value,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: node,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          node.textContent = String(Math.round(state.n));
        },
      });
    });

    return () => {
      cancelled = true;
      animation?.scrollTrigger?.kill();
      animation?.kill();
    };
  }, [enabled, reduced, value]);

  return ref;
}
