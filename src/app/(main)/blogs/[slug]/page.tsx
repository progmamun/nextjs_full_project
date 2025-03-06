import { notFound } from 'next/navigation';
import { getAllBlogs } from '@/utils/getAllBlogs';
import InfiniteScrollBlog from '@/components/blog/InfiniteScrollBlog';
import { Post } from '@/types';


export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  const sliceBlogs = blogs.slice(0, 9);
  return sliceBlogs.map((blog: Post) => ({ slug: blog.slug }));
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await the resolved params object
  const blogs = await getAllBlogs();
  const post = blogs.find((p: Post) => p.slug === slug);

  if (!post) {
    notFound();
    return null;
  }
  
  // Pass all posts to avoid client-side fetching
  return <InfiniteScrollBlog initialPost={post} allPosts={blogs} />;
}