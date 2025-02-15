import { notFound } from 'next/navigation';
import React from 'react';
import { samplePosts } from '@/lib/data';
import { Calendar, Clock, Share2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";


interface Post {
  slug: string;
  title: string;
  author: {
    name: string;
    role: string;
    image?: string;
  };
  publishedAt: string;
  readingTime: string;
  tags: string[];
  imageUrl: string;
  content: string;
}

// Convert to an async server component
async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = (await params);

  // Find the post based on the slug
  const post = samplePosts.find((p: Post) => p.slug === slug);

  if (!post) {
    notFound();
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {post.title}
        </h1>

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
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Featured Image */}
      <Card className="mb-8">
        <CardContent className="p-0">
          <img
            src={post.imageUrl}
            alt="Blog post featured image"
            className="w-full h-auto rounded-lg"
          />
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
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailsPage;
