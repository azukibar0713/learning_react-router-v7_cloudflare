import { getLocalDb } from "./sqlite";

export function getDbFromContext(context?: any) {
  // Cloudflare環境でのD1データベース
  if (context?.cloudflare?.env?.DB) {
    console.log('Using Cloudflare D1 database');
    return context.cloudflare.env.DB;
  }
  
  // React Router開発サーバーの場合
  if (context?.env?.DB) {
    console.log('Using context environment database');
    return context.env.DB;
  }
  
  // ローカル開発環境の場合
  console.log('Using local SQLite database');
  return getLocalDb();
}

export function isLocalEnvironment(): boolean {
  return typeof process !== 'undefined' && 
         process.env.NODE_ENV === 'development';
}

export function isCloudflareEnvironment(): boolean {
  return typeof process !== 'undefined' && 
         process.env.NODE_ENV === 'production';
}