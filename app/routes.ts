import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("books", "routes/books.tsx"),
  route("books/new", "routes/books.new.tsx"),
  route("books/:id", "routes/books.$id.tsx"),
] satisfies RouteConfig;
