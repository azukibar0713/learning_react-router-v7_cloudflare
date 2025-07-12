export interface Book {
  id: number;
  title: string;
  author: string;
  isbn?: string;
  publication_date?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Database {
  prepare: (sql: string) => {
    all: () => Book[];
    get: () => Book | null;
    run: (params?: any) => { success: boolean; meta: any };
  };
  exec: (sql: string) => void;
}

declare global {
  interface CloudflareEnv {
    DB: Database;
  }
}

export async function getAllBooks(db: Database): Promise<Book[]> {
  const stmt = (db as any).prepare("SELECT * FROM books ORDER BY created_at DESC");
  return stmt.all() as Book[];
}

export async function getBook(db: Database, id: number): Promise<Book | null> {
  const stmt = (db as any).prepare("SELECT * FROM books WHERE id = ?");
  return stmt.get(id) as Book | null;
}

export async function createBook(
  db: Database,
  book: Omit<Book, "id" | "created_at" | "updated_at">
): Promise<Book> {
  // better-sqlite3の場合（ローカル開発）
  if ((db as any)._isBetterSqlite3) {
    const stmt = (db as any).prepare(`
      INSERT INTO books (title, author, isbn, publication_date, description)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(book.title, book.author, book.isbn, book.publication_date, book.description);
    return await getBook(db, result.lastInsertRowid as number) as Book;
  } else {
    // Cloudflare D1の場合
    const stmt = (db as any).prepare(`
      INSERT INTO books (title, author, isbn, publication_date, description)
      VALUES (?, ?, ?, ?, ?)
      RETURNING *
    `);
    return stmt.get(book.title, book.author, book.isbn, book.publication_date, book.description) as Book;
  }
}

export async function updateBook(
  db: Database,
  id: number,
  book: Partial<Omit<Book, "id" | "created_at" | "updated_at">>
): Promise<Book | null> {
  const stmt = (db as any).prepare(`
    UPDATE books 
    SET title = COALESCE(?, title),
        author = COALESCE(?, author),
        isbn = COALESCE(?, isbn),
        publication_date = COALESCE(?, publication_date),
        description = COALESCE(?, description),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  stmt.run(book.title, book.author, book.isbn, book.publication_date, book.description, id);
  return getBook(db, id);
}

export async function deleteBook(db: Database, id: number): Promise<boolean> {
  const stmt = (db as any).prepare("DELETE FROM books WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
}