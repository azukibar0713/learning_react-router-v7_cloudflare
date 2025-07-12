# React Router v7 + Cloudflare 書籍管理アプリ

React Router v7とCloudflare D1を使った書籍管理システムです。

## 機能

- 📚 書籍の一覧表示
- ➕ 書籍の新規登録
- 📖 書籍の詳細表示
- 🗑️ 書籍の削除

## 技術構成

- **フロントエンド**: React Router v7 + TailwindCSS
- **バックエンド**: React Router v7 SSR
- **データベース**: Cloudflare D1（本番）+ SQLite（ローカル）
- **デプロイ**: Cloudflare Pages

## ローカル開発

```bash
npm install
npm run dev
```

http://localhost:5173 でアクセス

ローカル開発時は自動的にSQLiteを使用し、サンプルデータが投入されます。

## Cloudflareデプロイ

### 1. D1データベース作成

1. [Cloudflare Dashboard](https://dash.cloudflare.com/d1) でD1データベースを作成
2. データベース名: `books-db`
3. データベースIDをコピー

### 2. 設定ファイル更新

`wrangler.toml`の該当箇所のコメントアウトを解除し、データベースIDを設定：

```toml
[[d1_databases]]
binding = "DB"
database_name = "books-db"
database_id = "実際のデータベースID"
migrations_dir = "./migrations"
```

### 3. マイグレーション実行

```bash
wrangler d1 migrations apply books-db --remote
```

### 4. Cloudflare Pagesデプロイ

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
2. "Create a project" → "Connect to Git"
3. このリポジトリを選択
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `build/client`
5. Settings → Functions → D1 database bindings:
   - Variable name: `DB`
   - D1 database: 作成した`books-db`を選択

## プロジェクト構成

```
├── app/
│   ├── lib/
│   │   ├── db.ts          # データベース操作
│   │   ├── sqlite.ts      # ローカル開発用SQLite
│   │   └── context.ts     # DB接続管理
│   ├── routes/
│   │   ├── home.tsx       # ホームページ
│   │   ├── books.tsx      # 書籍一覧
│   │   ├── books.new.tsx  # 書籍登録
│   │   └── books.$id.tsx  # 書籍詳細
│   └── routes.ts          # ルーティング設定
├── migrations/
│   └── 0001_create_books_table.sql
└── wrangler.toml          # Cloudflare設定
```

---

Built with ❤️ using React Router v7 and Cloudflare.
