import { getLocalDb } from "./sqlite";

export function getDbFromContext(context?: any) {
  if (context?.cloudflare?.env?.DB) {
    return context.cloudflare.env.DB;
  }
  
  return getLocalDb();
}