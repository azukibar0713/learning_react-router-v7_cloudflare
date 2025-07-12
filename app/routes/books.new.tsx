import { type ActionFunctionArgs } from "react-router";
import { Form, redirect, useNavigate } from "react-router";
import { createBook } from "~/lib/db";
import { getDbFromContext } from "~/lib/context";

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const isbn = formData.get("isbn") as string;
  const publication_date = formData.get("publication_date") as string;
  const description = formData.get("description") as string;

  if (!title || !author) {
    throw new Error("タイトルと著者は必須です");
  }

  const db = getDbFromContext(context);
  await createBook(db, {
    title,
    author,
    isbn: isbn || undefined,
    publication_date: publication_date || undefined,
    description: description || undefined,
  });

  return redirect("/books");
}

export default function NewBook() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">新しい書籍を追加</h1>
          <button
            onClick={() => navigate("/books")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            戻る
          </button>
        </div>

        <Form method="post" className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              タイトル *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              著者 *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-2">
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="publication_date" className="block text-sm font-medium text-gray-700 mb-2">
              出版日
            </label>
            <input
              type="date"
              id="publication_date"
              name="publication_date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              説明
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              保存
            </button>
            <button
              type="button"
              onClick={() => navigate("/books")}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              キャンセル
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}