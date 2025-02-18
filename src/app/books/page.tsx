import BooksPageClient from "@/components/book/BooksPageClient";
import { Book } from "@/types";
import { getAllBooks } from "@/utils/getAllBooks";

// Server Component
export default async function BooksPage() {
  const books: Book[] = await getAllBooks();

  return <BooksPageClient books={books} />;
}
