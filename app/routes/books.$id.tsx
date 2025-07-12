import { type LoaderFunctionArgs, type ActionFunctionArgs } from "react-router";
import { useLoaderData, Link, Form, redirect } from "react-router";
import { getBook, deleteBook } from "~/lib/db";
import { getDbFromContext } from "~/lib/context";

export async function loader({ params, context }: LoaderFunctionArgs) {
  const id = parseInt(params.id!);
  const db = getDbFromContext(context);
  const book = await getBook(db, id);
  
  if (!book) {
    throw new Response("書籍が見つかりません", { status: 404 });
  }
  
  return { book };
}

export async function action({ params, context, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  
  if (intent === "delete") {
    const id = parseInt(params.id!);
    const db = getDbFromContext(context);
    await deleteBook(db, id);
    return redirect("/books");
  }
  
  return null;
}

export default function BookDetail() {
  const { book } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">書籍詳細</h1>
          <Link
            to="/books"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            一覧に戻る
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">タイトル</h3>
              <p className="mt-1 text-lg font-semibold">{book.title}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">著者</h3>
              <p className="mt-1 text-gray-900">{book.author}</p>
            </div>

            {book.isbn && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">ISBN</h3>
                <p className="mt-1 text-gray-900">{book.isbn}</p>
              </div>
            )}

            {book.publication_date && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">出版日</h3>
                <p className="mt-1 text-gray-900">{book.publication_date}</p>
              </div>
            )}

            {book.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">説明</h3>
                <p className="mt-1 text-gray-900 whitespace-pre-line">
                  {book.description}
                </p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-gray-500">登録日</h3>
              <p className="mt-1 text-gray-900">
                {new Date(book.created_at).toLocaleDateString('ja-JP')}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">更新日</h3>
              <p className="mt-1 text-gray-900">
                {new Date(book.updated_at).toLocaleDateString('ja-JP')}
              </p>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <Link
              to={`/books/${book.id}/edit`}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              編集
            </Link>
            <Form method="post" className="inline">
              <input type="hidden" name="intent" value="delete" />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  if (!confirm("本当に削除しますか？")) {
                    e.preventDefault();
                  }
                }}
              >
                削除
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}