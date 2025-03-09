'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, User } from "lucide-react";
import Link from "next/link";
import { Button } from '../ui/button';
import { Post } from '@/types/post';
import { urlFor } from '@/lib/sanity';
import formatDateToBangla from '@/utils/helpers';
import Image from 'next/image';

interface BlogListProps {
  posts?: Post[];
}


const BlogList = ({ posts = [] }: BlogListProps) => {
  const blogPosts = posts || [];

  if (blogPosts.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-500">No blog posts available.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 py-8">
      {blogPosts.map((post) => {
        const encodedSlug = encodeURIComponent(post.slug.current);
        // console.log(`Encoded slug for ${post.title}: /blog/${encodedSlug}`);
        
        return (
          <Card
            key={post._id}
            className="flex flex-col hover:shadow-lg transition-shadow duration-200"
          >
            <div className="relative">
              {post.mainImage ? (
                <Image
                src={urlFor(post.mainImage)}
                alt={post.mainImage.alt || post.title}
                width={0}
                height={0}
                quality={75}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-48 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity"
              />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold line-clamp-2">
                {post.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-sm text-gray-500">
                <User size={16} />
                {post.author?.name || 'Unknown Author'}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow">
              <p className="text-gray-600 line-clamp-3 mb-4">
                {post.body && post.body.length > 0 && post.body[0].children
                  ? post.body[0].children[0].text.slice(0, 100) + '...'
                  : 'No description available.'}
              </p>
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, index) => (
                    <span
                      key={category.slug?.current || `category-${index}`}
                      className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
                    >
                      {category.title || 'Unnamed Category'}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <CalendarDays size={16} />
                  {formatDateToBangla(post.publishedAt)}
                </span>
              </div>
              <Button variant="default" className="dark:bg-blue-600 dark:hover:bg-blue-700">
                <Link href={`/blog/${encodedSlug}`}>
                বিস্তারিত পড়ুন →
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default BlogList;