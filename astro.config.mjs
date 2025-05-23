// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";

const isProduction = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 5173,
    allowedHosts: ["frontend-workstation.khanhhuy.dev", "localhost:5173"],
  },
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [react()],
  devToolbar: {
    enabled: false,
  },
});