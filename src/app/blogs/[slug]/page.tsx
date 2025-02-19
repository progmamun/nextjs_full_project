import React from 'react';
import { notFound } from 'next/navigation';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Post } from '@/types';
import { getAllBlogs } from '@/utils/getAllBlogs';
import PageHeading from '@/components/common/PageHeading';
import ShareButton from '@/components/common/ShareButton';

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  const sliceBlogs = blogs.slice(0, 9); // Slice the first 9 blogs
  const slugParams = sliceBlogs.map((blog: Post) => ({ slug: blog.slug }));
  return slugParams;
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await the resolved params object
  const blogs = await getAllBlogs();
  const post = blogs.find((p: Post) => p.slug === slug);

  if (!post) {
    notFound();
    return null;
  }

  const articleUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="dark:bg-gray-900">
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      {/* Header Section */}
      <div className="space-y-4 mb-8">
        <PageHeading title={post.title} as='h2' />
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author?.image} alt={post.author?.name} />
              <AvatarFallback>{post.author?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{post.author.name}</span>
              <span className="text-xs">{post.author.role}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{post?.publishedAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{post?.readingTime}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      {/* Featured Image */}
      <Card className="mb-8">
        <CardContent className="p-0">
          <img src={post.imageUrl} alt="Blog post featured image" className="w-full h-auto rounded-lg" />
        </CardContent>
      </Card>
      {/* Content */}
      <article className="prose prose-lg max-w-none">
        <p className="text-lg leading-relaxed">{post.content}</p>
      </article>
      {/* Share Section */}
      <div className="mt-12 border-t pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Share this article</h3>
          <div className="flex gap-2">
            <ShareButton url={articleUrl} title={post.title} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
