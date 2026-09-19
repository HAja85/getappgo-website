import { useEffect, type RefObject } from "react";
import { loadGsap } from "@/animations/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function useReveal(
  ref: RefObject<HTMLElement | null>,
  options?: { y?: number; delay?: number },
): void {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced) {
      node.style.opacity = "1";
      node.style.transform = "none";
      return;
    }

    let animation: { kill: () => void; scrollTrigger?: { kill: () => void } } | undefined;
    let cancelled = false;

    void loadGsap().then(({ gsap }) => {
      if (cancelled || !ref.current) return;
      animation = gsap.fromTo(
        node,
        { opacity: 0, y: options?.y ?? 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: options?.delay ?? 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 88%",
            once: true,
          },
        },
      );
    });

    return () => {
      cancelled = true;
      animation?.scrollTrigger?.kill();
      animation?.kill();
    };
  }, [options?.delay, options?.y, reduced, ref]);
}
