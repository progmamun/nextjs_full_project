import { sanityClient } from "@/lib/sanity";
import { Post } from "@/types/post";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const limit = Number(searchParams.get('limit')) || 5;
  const offset = Number(searchParams.get('offset')) || 0;

  const groqSortOrder = sortOrder === 'asc' ? 'publishedAt' : '-publishedAt';
  const range = `[${offset}..${offset + limit - 1}]`;

  const query = `*[_type == "post" && defined(publishedAt) && !(_id in path("drafts.**"))] | order(${groqSortOrder}) ${range} {
    _id,
    title,
    slug,
    publishedAt,
    author-> { name },
    body,
    mainImage,
    categories[]-> { title, slug }
  }`;
  const totalQuery = 'count(*[_type == "post" && defined(publishedAt) && !(_id in path("drafts.**"))])';

  const [posts, total] = await Promise.all([
    sanityClient.fetch(query).then((res: Post[]) => res || []),
    sanityClient.fetch(totalQuery).then((res: number) => res || 0),
  ]);

  // Only sort if Sanity order is unreliable (optional)
  let sortedPosts = posts;
  if (sortOrder === 'desc') {
    sortedPosts = posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } else {
    sortedPosts = posts.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
  }

  console.log(`API fetched ${sortedPosts.length} posts for offset=${offset}, limit=${limit}, total=${total}`);
  return NextResponse.json({ posts: sortedPosts, total });
}