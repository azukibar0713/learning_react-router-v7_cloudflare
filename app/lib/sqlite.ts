import Database from "better-sqlite3";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

let db: Database.Database | null = null;

export function getLocalDb(): Database.Database {
  if (!db) {
    db = new Database(":memory:");
    
    // better-sqlite3であることを示すマーカーを追加
    (db as any)._isBetterSqlite3 = true;
    
    const migrationPath = join(__dirname, "../../migrations/0001_create_books_table.sql");
    const migration = readFileSync(migrationPath, "utf8");
    db.exec(migration);
    
    db.exec(`
      INSERT INTO books (title, author, isbn, publication_date, description) VALUES
      ('React Router 完全ガイド', '山田太郎', '978-4-123456-78-9', '2024-01-15', 'React Router v7の使い方を詳しく解説した本'),
      ('Cloudflare入門', '佐藤花子', '978-4-987654-32-1', '2023-12-01', 'Cloudflareのサービスを活用したWebアプリケーション開発'),
      ('TypeScript実践入門', '田中次郎', '978-4-111222-33-4', '2024-02-10', 'TypeScriptの基礎から応用まで実践的に学ぶ');
    `);
  }
  
  return db;
}