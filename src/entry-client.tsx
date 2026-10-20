import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { DemoProvider } from "@/components/contact/DemoProvider";
import { App } from "@/App";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "@/fonts";
import "@/styles/index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element missing");

const tree = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <DemoProvider>
            <App />
          </DemoProvider>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, tree);
} else {
  createRoot(root).render(tree);
}
