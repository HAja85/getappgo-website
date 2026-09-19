import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { DemoIntent } from "@/types";

type DemoOptions = {
  productSlug?: string;
  intent?: DemoIntent;
};

type DemoContextValue = {
  open: boolean;
  productSlug?: string;
  intent: DemoIntent;
  openDemo: (options?: DemoOptions) => void;
  closeDemo: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [productSlug, setProductSlug] = useState<string | undefined>();
  const [intent, setIntent] = useState<DemoIntent>("demo");

  const openDemo = useCallback((options?: DemoOptions) => {
    setProductSlug(options?.productSlug);
    setIntent(options?.intent ?? "demo");
    setOpen(true);
  }, []);

  const closeDemo = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, productSlug, intent, openDemo, closeDemo }),
    [closeDemo, intent, open, openDemo, productSlug],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoContextValue {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within DemoProvider");
  }
  return context;
}
