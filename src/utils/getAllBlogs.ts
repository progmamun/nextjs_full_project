import { sanityClient } from '@/lib/sanity';
import { Post } from '@/types/post';

export interface BlogFilters {
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}

export const getAllBlogs = async (filters?: BlogFilters): Promise<Post[]> => {
  // Construct GROQ query with sorting and limiting
  const sortOrder = filters?.sortOrder === 'asc' ? 'publishedAt' : '-publishedAt';
  const limitClause = filters?.limit && filters.limit > 0 ? `[0..${filters.limit - 1}]` : '';
  
  const query = `*[_type == "post"] | order(${sortOrder}) ${limitClause} {
    _id,
    title,
    slug,
    publishedAt,
    author-> { name },
    body,
    mainImage,
    categories[]-> { title, slug }
  }`;

  const blogs: Post[] = await sanityClient.fetch(query);
  return blogs || [];
};
