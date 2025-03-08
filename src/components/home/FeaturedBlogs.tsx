import React from 'react';
import Link from 'next/link';
// import { Post } from '@/types';
import PageHeading from '../common/PageHeading';
import FacebookPostPage from './FacebookPost';
import TableBlogCard from './TableBlogCard';
import BlogCard from '../blog/BlogCard';
import { Post } from '@/types/post';

interface FeaturedBlogsProps {
  posts: Post[];
}

const FeaturedBlogs: React.FC<FeaturedBlogsProps> = ({ posts }) => {
  const sortedBlogs = [...posts].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });

  return (
    <section className="py-12 bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <PageHeading title="সর্বশেষ" as="h2" className="pl-5" />
          <Link href="/blog" className="text-blue-600 hover:text-blue-700">
            আরো দেখুন →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First Section: 3 Blog Posts in Column */}
          <div className="flex flex-col gap-6">
            <TableBlogCard posts={sortedBlogs.slice(0, 4)} />
          </div>

          {/* Second Section: 1 Blog Post */}
          <div className="flex items-start">
            {sortedBlogs.length > 4 && <BlogCard posts={[sortedBlogs[4]]} />}
          </div>

          {/* Third Section: Facebook Posts */}
          <div className="flex items-start">
            <FacebookPostPage />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;