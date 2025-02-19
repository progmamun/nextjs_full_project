import React from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import BlogCard from '../blog/BlogCard';


interface FeaturedBlogsProps {
  posts: Post[];
}

const FeaturedBlogs: React.FC<FeaturedBlogsProps> = ({ posts }) => {
  const sortedBlogs = [...posts].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });
  // console.log(posts, 'posts');
  return (
    <section className="py-12 bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest News</h2>
          <Link href="/blogs"
            className="text-blue-600 hover:text-blue-700">View All Posts →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 py-8">
          {sortedBlogs.slice(0, 3).map((post) => (
            <BlogCard key={post.id} posts={[post]} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;