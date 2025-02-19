import BlogList from '@/components/blog/BlogList';
import PageHeading from '@/components/common/PageHeading';
import { Pagination } from '@/components/common/Pagination';
import { getAllBlogs } from '@/utils/getAllBlogs';
import Head from 'next/head';

const POSTS_PER_PAGE = 9;

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = (await searchParams);

  // Fetch blogs first
  const blogs = await getAllBlogs();
  
  // Sort blogs by publishedAt (newest first)
  const sortedBlogs = [...blogs].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });

  // Parse the page number and default to 1
  const currentPage = Math.max(1, Math.min(Number(page) || 1, Math.ceil(sortedBlogs.length / POSTS_PER_PAGE)));
  const totalPages = Math.ceil(sortedBlogs.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = sortedBlogs.slice(startIndex, endIndex);

  return (
    <div className="dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
      <Head>
        <title>Blogs - Page {currentPage}</title>
        <meta name="description" content={`Browse our blog posts on page ${currentPage}`} />
      </Head>
      <PageHeading title='Blogs' as='h1' />
      <BlogList posts={posts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/blogs" />
      </div>
    </div>
  );
}