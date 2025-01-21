// @ts-check
import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"

import sitemap from "@astrojs/sitemap"

import react from "@astrojs/react"

import node from "@astrojs/node";

import glsl from 'vite-plugin-glsl';

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",

  integrations: [
    mdx(),
    sitemap(),
    react({
      include: ["**/react/*"],
    }),
  ],

  output: "server",

  adapter: node({
    mode: "standalone",
  }),
  vite: {
    // Example: Add custom vite plugins directly to your Astro project
    plugins: [glsl()],
  },
})
