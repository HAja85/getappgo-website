import type { IncomingMessage, ServerResponse } from "node:http";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { handleLead } from "./api/leads.js";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

function leadsDevApi(): Plugin {
  return {
    name: "leads-dev-api",
    configureServer(server) {
      server.middlewares.use("/api/leads", (req: IncomingMessage, res: ServerResponse) => {
        const chunks: Buffer[] = [];
        req.on("data", (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
        req.on("end", () => {
          const raw = Buffer.concat(chunks).toString("utf8");
          let body: unknown = {};
          if (raw) {
            try {
              body = JSON.parse(raw);
            } catch {
              body = null;
            }
          }
          const fake = {
            statusCode: 200,
            setHeader() {},
            status(code: number) {
              this.statusCode = code;
              return this;
            },
            json(payload: unknown) {
              res.statusCode = this.statusCode;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(payload));
            },
          };
          void handleLead({ method: req.method ?? "GET", body }, fake, process.env);
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [leadsDevApi(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },
});
