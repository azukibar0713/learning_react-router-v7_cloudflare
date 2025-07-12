import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLocalDb } from "./app/lib/sqlite";

export default defineConfig({
  plugins: [
    tailwindcss(), 
    reactRouter({
      async buildEnd() {
        await getLocalDb();
      },
    }), 
    tsconfigPaths()
  ],
  ssr: {
    external: ["better-sqlite3"],
  },
});
