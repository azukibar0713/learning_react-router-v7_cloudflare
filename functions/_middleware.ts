import { getLocalDb } from "../app/lib/sqlite";

export const onRequest: PagesFunction<{ DB: D1Database }> = async (context) => {
  // ローカル開発環境でのD1代替設定
  if (!context.env.DB) {
    context.env.DB = getLocalDb() as any;
  }
  
  return await context.next();
};