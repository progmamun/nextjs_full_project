import React from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import BlogCard from '../blog/BlogCard';
import PageHeading from '../common/PageHeading';


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
        <PageHeading title='সর্বশেষ' as='h2' className='pl-5'/>
          <Link href="/blogs"
            className="text-blue-600 hover:text-blue-700">আরো দেখুন →
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