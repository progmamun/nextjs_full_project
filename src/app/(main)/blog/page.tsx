import BlogList from '@/components/blog/BlogList';
import PageHeading from '@/components/common/PageHeading';
import { Pagination } from '@/components/common/Pagination';
import { sanityClient } from '@/lib/sanity';
import { Post } from '@/types/post';
import Head from 'next/head';

export const revalidate = 60; // Regenerate page every 60 seconds

const POSTS_PER_PAGE = 9;

export interface BlogFilters {
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

async function getAllBlogs(filters: BlogFilters = { sortOrder: 'desc', limit: POSTS_PER_PAGE, offset: 0 }): Promise<{ posts: Post[], total: number }> {
  const offset = filters.offset || 0;
  const limit = filters.limit || POSTS_PER_PAGE;
  const range = `[${offset}..${offset + limit - 1}]`;

  const query = `*[_type == "post" && defined(publishedAt) && !(_id in path("drafts.**"))] ${range} {
    _id,
    title,
    slug,
    publishedAt,
    author-> { name },
    body,
    mainImage,
    categories[]-> { title, slug }
  }`;
  let posts: Post[] = (await sanityClient.fetch(query)) || [];

  // Fallback sorting in JavaScript
  posts = posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const totalQuery = 'count(*[_type == "post" && defined(publishedAt) && !(_id in path("drafts.**"))])';
  const total: number = await sanityClient.fetch(totalQuery);

  // console.log(`Offset: ${offset}, Limit: ${limit}, Fetched: ${posts.length}, Total: ${total}`);
  // posts.forEach((post, index) => {
  //   console.log(`Post ${index + offset + 1}: "${post.title}", Published: ${post.publishedAt}, ID: ${post._id}`);
  // });

  return { posts, total };
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const offset = (currentPage - 1) * POSTS_PER_PAGE;

  const { posts, total } = await getAllBlogs({
    sortOrder: 'desc', // Latest posts first
    limit: POSTS_PER_PAGE,
    offset,
  });

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  return (
    <div className="dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Head>
          <title>ব্লগ - Page {currentPage}</title>
          <meta name="description" content={`Browse our latest blog posts on page ${currentPage}`} />
        </Head>
        <PageHeading title="ব্লগ" as="h2" className="text-center" />
        <BlogList posts={posts} />
        <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/blog" />
      </div>
    </div>
  );
}