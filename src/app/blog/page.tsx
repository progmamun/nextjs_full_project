// app/blog/page.tsx
import BlogList from '@/components/blog/BlogList';
import { Pagination } from '@/components/common/Pagination';
import { samplePosts } from '@/lib/data';
import Head from 'next/head';

const POSTS_PER_PAGE = 10;

interface BlogPageProps {
  searchParams: { page?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Await searchParams to ensure we get valid data
  const { page } = await searchParams;

  const totalPages = Math.ceil(samplePosts.length / POSTS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(Number(page) || 1, totalPages)); // Clamp between 1 and totalPages
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = samplePosts.slice(startIndex, endIndex);

  return (
    <div className="page-container max-w-7xl mx-auto px-4 py-8">
      <Head>
        <title>Blog - Page {currentPage}</title>
        <meta name="description" content={`Browse our blog posts on page ${currentPage}`} />
      </Head>
      <h1 className="heading-1 mb-8">Blog</h1>
      <BlogList posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl="/blog"
      />
    </div>
  );
}
