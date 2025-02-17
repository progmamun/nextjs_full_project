import BlogList from '@/components/blog/BlogList';
import { Pagination } from '@/components/common/Pagination';
import Head from 'next/head';

const POSTS_PER_PAGE = 10;

async function fetchBlogs() {
  const response = await fetch('https://rubshibir.github.io/api/blogs.json', {
    cache: 'no-store', // Ensures SSR by always fetching fresh data
  });
  return response.json();
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;

  // Parse the page number and handle undefined values
  const currentPage = Math.max(
    1,
    Math.min(Number(page) || 1, Math.ceil(await fetchBlogs().then((blogs) => blogs.length / POSTS_PER_PAGE)))
  );

  const blogs = await fetchBlogs();
  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = blogs.slice(startIndex, endIndex);

  return (
    <div className="page-container max-w-7xl mx-auto px-4 py-8">
      <Head>
        <title>Blog - Page {currentPage}</title>
        <meta name="description" content={`Browse our blog posts on page ${currentPage}`} />
      </Head>
      <h1 className="heading-1 mb-8">Blog</h1>
      <BlogList posts={posts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/blog" />
    </div>
  );
}
