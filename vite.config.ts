
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
  "/covid-api": {
    target: "https://data.incovid19.org",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/covid-api/, ""),
  },
},
  },
});
