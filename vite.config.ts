import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(), 
    reactRouter({
      // Cloudflare Pages用の設定
      future: {
        unstable_singleFetch: true,
      },
    }), 
    tsconfigPaths()
  ],
  build: {
    sourcemap: false, // Cloudflareでのビルドサイズを削減
  },
  ssr: {
    external: ["better-sqlite3"],
    target: "webworker", // Cloudflare Workers環境用
  },
});
