import { Outlet, useLocation } from "react-router";
import { FloatingNav } from "@/components/navigation/FloatingNav";
import { Footer } from "@/components/layout/Footer";
import { DemoDialog } from "@/components/contact/DemoDialog";
import { useLenis } from "@/hooks/useLenis";
import { loadGsap } from "@/animations/gsap";
import { scrollToId } from "@/lib/scroll-to";
import { useEffect } from "react";

export function AppShell() {
  const location = useLocation();
  useLenis();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      window.setTimeout(() => scrollToId(id), 80);
      return;
    }
    window.scrollTo(0, 0);
    void loadGsap().then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
    });
  }, [location.pathname, location.hash]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <FloatingNav />
      <main id="main" className="pt-28">
        <Outlet />
      </main>
      <Footer />
      <DemoDialog />
    </>
  );
}
