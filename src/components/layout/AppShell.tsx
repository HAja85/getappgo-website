import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { FloatingNav } from "@/components/navigation/FloatingNav";
import { Footer } from "@/components/layout/Footer";
import { DemoDialog } from "@/components/contact/DemoDialog";
import { FloatingUi } from "@/components/zillion/FloatingUi";
import { useCopy } from "@/i18n/LanguageProvider";
import { scrollToId } from "@/lib/scroll-to";

export function AppShell() {
  const location = useLocation();
  const copy = useCopy();

  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.replace("#", ""));
      window.setTimeout(() => scrollToId(id), 80);
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname, location.hash]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-[#182793] focus:px-4 focus:py-2 focus:text-white"
      >
        {copy.nav.skip}
      </a>
      <FloatingNav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <FloatingUi />
      <DemoDialog />
    </>
  );
}
