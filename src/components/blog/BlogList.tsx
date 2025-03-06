'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, User } from "lucide-react";
import { Post } from '@/types';
import Link from "next/link";
import { Button } from '../ui/button';

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
      {blogPosts.map((post) => (
        <Card
          key={post.id}
          className="flex flex-col hover:shadow-lg transition-shadow duration-200"
        >
          <div className="relative">
            <img
              src="/api/placeholder/400/200"
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-xl font-bold line-clamp-2">
              {post.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-sm text-gray-500">
              <User size={16} />
              {post.author.name}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow">
            <p
              className="text-gray-600 line-clamp-3 mb-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between items-center">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <CalendarDays size={16} />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {post.readingTime}
              </span>
            </div>

            <Button variant={'outline'} className="dark:bg-blue-600 dark:hover:bg-blue-700">
              <Link href={`/blogs/${post.slug}`}>
                Read More
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BlogList;
