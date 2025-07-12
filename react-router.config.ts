import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  // 環境に応じてプラットフォームを切り替え
  serverPlatform: process.env.NODE_ENV === "production" ? "cloudflare-pages" : "node",
} satisfies Config;
