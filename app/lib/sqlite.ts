import Database from "better-sqlite3";
import { readFileSync } from "fs";
import { join } from "path";

// Cloudflare Pages環境では __dirname を直接使用
const __dirname = typeof window === 'undefined' && process?.cwd ? process.cwd() : '.';

let db: Database.Database | null = null;

export function getLocalDb(): Database.Database {
  // Cloudflare Pages環境や本番環境では使用しない
  if (typeof process === 'undefined' || 
      !process.cwd || 
      process.env.NODE_ENV === 'production') {
    console.log('Local database not available in this environment');
    return {} as Database.Database;
  }

  if (!db) {
    try {
      console.log('Initializing local SQLite database...');
      db = new Database(":memory:");
      
      // better-sqlite3であることを示すマーカーを追加
      (db as any)._isBetterSqlite3 = true;
      
      // マイグレーションSQLを直接埋め込み
      const migration = `
        CREATE TABLE IF NOT EXISTS books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          author TEXT NOT NULL,
          isbn TEXT,
          publication_date TEXT,
          description TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `;
      
      db.exec(migration);
      console.log('Local database tables created');
      
      // サンプルデータの投入
      db.exec(`
        INSERT INTO books (title, author, isbn, publication_date, description) VALUES
        ('React Router 完全ガイド', '山田太郎', '978-4-123456-78-9', '2024-01-15', 'React Router v7の使い方を詳しく解説した本'),
        ('Cloudflare入門', '佐藤花子', '978-4-987654-32-1', '2023-12-01', 'Cloudflareのサービスを活用したWebアプリケーション開発'),
        ('TypeScript実践入門', '田中次郎', '978-4-111222-33-4', '2024-02-10', 'TypeScriptの基礎から応用まで実践的に学ぶ');
      `);
      console.log('Sample data inserted into local database');
      
    } catch (error) {
      console.error('Failed to initialize local database:', error);
      return {} as Database.Database;
    }
  }
  
  return db;
}