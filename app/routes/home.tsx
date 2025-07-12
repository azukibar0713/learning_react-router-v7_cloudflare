import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "書籍管理アプリ" },
    { name: "description", content: "React Router v7とCloudflareで作られた書籍管理アプリ" },
  ];
}

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">書籍管理アプリ</h1>
        <p className="text-lg text-gray-600 mb-8">
          React Router v7とCloudflare D1を使った書籍管理システム
        </p>
        <div className="space-x-4">
          <Link
            to="/books"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
          >
            書籍一覧を見る
          </Link>
          <Link
            to="/books/new"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
          >
            書籍を追加
          </Link>
        </div>
      </div>
    </div>
  );
}
