import type { default as Gsap } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

let gsap: typeof Gsap | undefined;
let ScrollTrigger: typeof ScrollTriggerType | undefined;
let loading: Promise<void> | undefined;

export async function loadGsap(): Promise<{
  gsap: typeof Gsap;
  ScrollTrigger: typeof ScrollTriggerType;
}> {
  if (!gsap || !ScrollTrigger) {
    loading ??= (async () => {
      const [{ default: gsapLib }, { ScrollTrigger: plugin }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsapLib.registerPlugin(plugin);
      gsap = gsapLib;
      ScrollTrigger = plugin;
    })();
    await loading;
  }
  return { gsap: gsap!, ScrollTrigger: ScrollTrigger! };
}
