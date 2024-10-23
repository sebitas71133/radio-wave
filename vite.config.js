import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //  base: "https://sebitas13.github.io/radio-web",
  // server: {
  //   proxy: {
  //     // Proxy para el puerto 8000
  //     "/api/8000": {
  //       target: "http://partyviberadio.com:8000", //Reggae
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/8000/, ""), // Elimina "/api/8000" de la ruta
  //     },
  //     // Proxy para el puerto 8010, si lo necesitas
  //     "/api/8010": {
  //       target: "http://partyviberadio.com:8010", //Psytrance
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/8010/, ""),
  //     },
  //     "/api/8020": {
  //       target: "http://partyviberadio.com:8020", //Jazz
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/8020/, ""),
  //     },
  //     "/api/8032": {
  //       target: "http://partyviberadio.com:8032", //Rock
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/8032/, ""),
  //     },
  //     "/api/8056": {
  //       target: "http://partyviberadio.com:8056", //Ambient
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/8056/, ""),
  //     },
  //     "/api/8004": {
  //       target: "http://partyviberadio.com:8004", //Drum and Bass:
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/8004/, ""),
  //     },

  //     "/api/8016": {
  //       target: "http://partyviberadio.com:8016", //Rap
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/8016/, ""),
  //     },
  //     "/api/8046": {
  //       target: "http://partyviberadio.com:8046", //Techno
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/8046/, ""),
  //     },
  //   },
  // },
});
