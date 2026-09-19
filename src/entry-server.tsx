import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { DemoProvider } from "@/components/contact/DemoProvider";
import { App } from "@/App";
import { getPrerenderRoutes } from "@/lib/seo/routes";

export type RenderResult = {
  html: string;
  head: string;
};

export function render(url: string): RenderResult {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <DemoProvider>
          <App />
        </DemoProvider>
      </StaticRouter>
    </HelmetProvider>,
  );

  const helmet = helmetContext.helmet;
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ].join("\n")
    : "";

  return { html, head };
}

export { getPrerenderRoutes };
