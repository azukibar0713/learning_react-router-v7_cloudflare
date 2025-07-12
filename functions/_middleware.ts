export const onRequest: PagesFunction<{ DB: D1Database }> = async (context) => {
  // Cloudflare Pages環境ではD1が自動的にバインドされるため、
  // middlewareでの処理は不要
  return await context.next();
};