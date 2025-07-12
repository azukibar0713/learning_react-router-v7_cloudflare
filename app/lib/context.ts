import { getLocalDb } from "./sqlite";

export function getDbFromContext(context?: any) {
  // Cloudflare Pages環境の場合
  if (context?.cloudflare?.env?.DB) {
    return context.cloudflare.env.DB;
  }
  
  // React Router開発サーバーの場合
  if (context?.env?.DB) {
    return context.env.DB;
  }
  
  // ローカル開発環境の場合
  return getLocalDb();
}

export function isLocalEnvironment(): boolean {
  return typeof process !== 'undefined' && 
         process.env.NODE_ENV === 'development' &&
         typeof window === 'undefined';
}