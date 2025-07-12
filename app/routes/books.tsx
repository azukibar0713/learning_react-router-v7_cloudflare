import { type LoaderFunctionArgs } from "react-router";
import { Link, useLoaderData } from "react-router";
import { getAllBooks, type Book } from "~/lib/db";
import { getDbFromContext } from "~/lib/context";

export async function loader({ context }: LoaderFunctionArgs) {
  const db = getDbFromContext(context);
  const books = await getAllBooks(db);
  return { books };
}

export default function Books() {
  const { books } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">書籍一覧</h1>
        <Link
          to="/books/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          新しい書籍を追加
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">登録されている書籍がありません</p>
          <Link
            to="/books/new"
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            最初の書籍を追加
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book: Book) => (
            <div
              key={book.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-2">著者: {book.author}</p>
              {book.isbn && (
                <p className="text-gray-500 text-sm mb-2">ISBN: {book.isbn}</p>
              )}
              {book.publication_date && (
                <p className="text-gray-500 text-sm mb-2">
                  出版日: {book.publication_date}
                </p>
              )}
              {book.description && (
                <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                  {book.description}
                </p>
              )}
              <div className="flex space-x-2">
                <Link
                  to={`/books/${book.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white text-sm py-1 px-3 rounded"
                >
                  詳細
                </Link>
                <Link
                  to={`/books/${book.id}/edit`}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white text-sm py-1 px-3 rounded"
                >
                  編集
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}