import type { Config } from "@react-router/dev/config";
import { getLocalDb } from "./app/lib/sqlite";

export default {
  ssr: true,
  async serverBuildEnd() {
    // ローカル開発用のデータベースを初期化
    if (process.env.NODE_ENV === "development") {
      getLocalDb();
    }
  },
  serverBundles: ({ branch }) => {
    const isServerBundle = branch.some(route => route.file.includes("lib/db"));
    return isServerBundle ? "server-bundle" : "default-bundle";
  },
} satisfies Config;
