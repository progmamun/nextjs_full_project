'use client';

// InfiniteScrollBlog.tsx - Client Component
import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import PageHeading from '@/components/common/PageHeading';
import ShareButton from '@/components/common/ShareButton';
import { Post } from '@/types';


interface InfiniteScrollBlogProps {
  initialPost: Post;
  allPosts: Post[];
}

export default function InfiniteScrollBlog({ initialPost, allPosts }: InfiniteScrollBlogProps) {
  // Ensure we have unique posts
  const uniqueAllPosts = allPosts.filter((post, index, self) => 
    index === self.findIndex(p => p.slug === post.slug)
  );
  
  const initialIndex = uniqueAllPosts.findIndex(post => post.slug === initialPost.slug);
  const [loadedPostIds, setLoadedPostIds] = useState<string[]>([`${initialPost.id}`]);
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(initialIndex);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderElementRef = useRef<HTMLDivElement>(null);

  // Update URL when current post changes
  useEffect(() => {
    if (currentPostIndex >= 0 && uniqueAllPosts[currentPostIndex]) {
      const newUrl = `/blog/${uniqueAllPosts[currentPostIndex].slug}`;
      window.history.pushState({}, '', newUrl);
    }
  }, [currentPostIndex, uniqueAllPosts]);

  // Setup intersection observer for infinite scrolling
  useEffect(() => {
    const hasMorePosts = currentPostIndex < uniqueAllPosts.length - 1;
    if (!loaderElementRef.current || !hasMorePosts) return;
    
    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading && hasMorePosts) {
        loadNextPost();
      }
    }, { threshold: 0.1 });
    
    observerRef.current.observe(loaderElementRef.current);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [currentPostIndex, loading, uniqueAllPosts.length]);

  // Load next post function
  const loadNextPost = () => {
    if (currentPostIndex >= uniqueAllPosts.length - 1) return;
    
    setLoading(true);
    const nextIndex = currentPostIndex + 1;
    const nextPost = uniqueAllPosts[nextIndex];
    
    // Use the post's actual ID from the JSON
    const nextPostId = nextPost.id;
    
    // Check if this post is already loaded
    if (!loadedPostIds.includes(nextPostId)) {
      setTimeout(() => {
        setLoadedPostIds(prev => [...prev, nextPostId]);
        setCurrentPostIndex(nextIndex);
        setLoading(false);
      }, 300);
    } else {
      setLoading(false);
    }
  };

  // Handle scroll position change to update current post
  useEffect(() => {
    const handleScroll = () => {
      const postElements = document.querySelectorAll('[data-post-slug]');
      
      postElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        // If element is in viewport (with some threshold)
        if (rect.top <= 200 && rect.bottom >= 200) {
          const slug = element.getAttribute('data-post-slug');
          const postIndex = uniqueAllPosts.findIndex(post => post.slug === slug);
          if (postIndex !== -1 && postIndex !== currentPostIndex) {
            setCurrentPostIndex(postIndex);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [uniqueAllPosts, currentPostIndex]);

  return (
    <div className="dark:bg-gray-900">
      {loadedPostIds.map((postId) => {
        const post = uniqueAllPosts.find(p => p.id === postId);
        
        if (!post) return null;
        
        return (
          <div
            key={post.id}
            data-post-slug={post.slug}
            className="max-w-4xl mx-auto px-4 py-8 border-b border-gray-200 dark:border-gray-800"
          >
            {/* Header Section */}
            <div className="space-y-4 mb-8">
              <PageHeading title={post.title} as='h2' />
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author.image} alt={post.author.name} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{post.author.name}</span>
                    <span className="text-xs">{post.author.role}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{post.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{post.readingTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Badge key={`${post.id}-${tag}`} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Featured Image */}
            <Card className="mb-8">
              <CardContent className="p-0">
                <img src={post.imageUrl} alt={`${post.title} featured image`} className="w-full h-auto rounded-lg" />
              </CardContent>
            </Card>
            
            {/* Content */}
            <article className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed">{post.content}</p>
            </article>
            
            {/* Share Section */}
            <div className="mt-12 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Share this article</h3>
                <div className="flex gap-2">
                  <ShareButton 
                    url={`${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${post.slug}`} 
                    title={post.title} 
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Loading indicator - observed for infinite scrolling */}
      <div 
        ref={loaderElementRef} 
        className="py-8 text-center"
      >
        {loading && <p className="text-gray-500">Loading next article...</p>}
        {currentPostIndex >= uniqueAllPosts.length - 1 && 
          <p className="text-gray-500">{"You've read all our articles!"}</p>
        }
      </div>
    </div>
  );
}