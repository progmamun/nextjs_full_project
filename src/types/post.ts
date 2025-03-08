// types/post.ts
import { PortableTextBlock } from '@portabletext/react';

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  author: { name: string };
  body: PortableTextBlock[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: { _type: 'image'; alt?: string; asset: any } | null;
  categories: { title: string; slug: { current: string } }[] | null; // Changed from tags
}