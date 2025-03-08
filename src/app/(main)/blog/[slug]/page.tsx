import InfiniteScrollBlog from '@/components/blog/InfiniteScrollBlog';
import { sanityClient } from '@/lib/sanity';
import { Post } from '@/types/post';
import { notFound } from 'next/navigation';

export const revalidate = 60;

async function getPostBySlug(slug: string): Promise<Post> {
  const decodedSlug = decodeURIComponent(slug);
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    author-> { name },
    body,
    mainImage,
    categories[]-> { title, slug }
  }`;
  const post = await sanityClient.fetch(query, { slug: decodedSlug });
  if (!post?._id) notFound();
  return post;
}

export async function generateStaticParams() {
  const query = `*[_type == "post"] | order(-publishedAt) [0..8] {
    slug
  }`;
  const blogs = await sanityClient.fetch(query);
  return blogs.map((blog: { slug: { current: string } }) => ({ slug: blog.slug.current }));
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const initialPost = await getPostBySlug(slug);

  return <InfiniteScrollBlog initialPost={initialPost} />;
}