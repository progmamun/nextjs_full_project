// import BlogList from '@/components/blog/BlogList';
import { Pagination } from '@/components/common/Pagination';
import { getAllBooks } from '@/utils/getAllBooks';
import Head from 'next/head';
import BookCard from './BookCard';

const POSTS_PER_PAGE = 9;

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = (await searchParams);

  // Fetch blogs first
  const books = await getAllBooks();
  
  // Sort blogs by publishedAt (newest first)
  const sortedBooks = [...books].sort((a, b) => {
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
    <div className="page-container max-w-7xl mx-auto px-4 py-8">
      <Head>
        <title>Books - Page {currentPage}</title>
        <meta name="description" content={`Browse our blog posts on page ${currentPage}`} />
      </Head>
      <h1 className="heading-1 mb-8">Books Collection</h1>
      <BookCard books={posts} />
      {/* <BlogList posts={posts} /> */}
      {/* {currentBooks.map((books) => (
          // <BookCard key={books.id} {...books} />
          <BookCard key={books.id} books={[books]}  />
        ))} */}
      
      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/books" />
    </div>
  );
}