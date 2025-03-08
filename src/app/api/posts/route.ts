import { sanityClient } from '@/lib/sanity';
import { NextResponse } from 'next/server';
import { Post } from '@/types/post';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const limit = Number(searchParams.get('limit')) || 5;
  const offset = Number(searchParams.get('offset')) || 0;

  const groqSortOrder = sortOrder === 'asc' ? 'publishedAt' : '-publishedAt';
  const limitClause = `[${offset}..${offset + limit - 1}]`;
  const query = `*[_type == "post"] | order(${groqSortOrder}) ${limitClause} {
    _id,
    title,
    slug,
    publishedAt,
    author-> { name },
    body,
    mainImage,
    categories[]-> { title, slug }
  }`;

  const posts: Post[] = (await sanityClient.fetch(query)) || [];
  return NextResponse.json(posts);
}