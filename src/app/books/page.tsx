import BookCard from '@/components/book/BookCard';
import SearchInput from '@/components/book/SearchInput';
import { Pagination } from '@/components/common/Pagination';
import { getAllBooks } from '@/utils/getAllBooks';
import Head from 'next/head';

const POSTS_PER_PAGE = 9;

import { Book } from '@/types';
import PageHeading from '@/components/common/PageHeading';

interface BlogPageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page, search } = await searchParams;

  // Fetch books first
  const books = await getAllBooks();

  // Filter books based on search query
 

  const filteredBooks: Book[] = books.filter((book: Book) =>
    book.title.toLowerCase().includes(search?.toLowerCase() || '')
  );

  // Sort books by publishedAt (newest first)
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });

  // Parse the page number and default to 1
  const currentPage = Math.max(1, Math.min(Number(page) || 1, Math.ceil(sortedBooks.length / POSTS_PER_PAGE)));
  const totalPages = Math.ceil(sortedBooks.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = sortedBooks.slice(startIndex, endIndex);

  return (
    <div className="dark:bg-gray-900">
      
      <div className="container max-w-7xl mx-auto px-4 py-8">
      <Head>
        <title>Books - Page {currentPage}</title>
        <meta name="description" content={`Browse our blog posts on page ${currentPage}`} />
      </Head>
      <PageHeading title='Books Collection' as='h2' />
      <SearchInput initialSearch={search || ''} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BookCard books={posts} />
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/books" />
      </div>
    </div>
  );
}
