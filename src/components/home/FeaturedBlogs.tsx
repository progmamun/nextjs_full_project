import React from 'react';
import Link from 'next/link';
import BlogCard from '../blog/BlogCard';
import { Post } from '@/types';


interface FeaturedBlogsProps {
  posts: Post[];
}

const FeaturedBlogs: React.FC<FeaturedBlogsProps> = ({ posts }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest News</h2>
          <Link href="/blog"
            className="text-blue-600 hover:text-blue-700">View All Posts →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;