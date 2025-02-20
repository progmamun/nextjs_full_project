'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import PostHeader from './PostHeader'; // Adjust the import path as necessary
import PostContent from './PostContent'; // Adjust the import path as necessary
import ShareSection from './ShareSection'; // Adjust the import path as necessary
import { Post } from '@/types';

interface InfiniteScrollBlogProps {
  initialPost: Post;
  allPosts: Post[];
}

export default function InfiniteScrollBlog({ initialPost, allPosts }: InfiniteScrollBlogProps) {
  const uniqueAllPosts = allPosts.filter((post, index, self) =>
    index === self.findIndex(p => p.slug === post.slug)
  );

  const initialIndex = uniqueAllPosts.findIndex(post => post.slug === initialPost.slug);
  const [loadedPostIds, setLoadedPostIds] = useState<string[]>([`${initialPost.id}`]);
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(initialIndex);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentPostIndex >= 0 && uniqueAllPosts[currentPostIndex]) {
      const newUrl = `/blogs/${uniqueAllPosts[currentPostIndex].slug}`;
      window.history.pushState({}, '', newUrl);
    }
  }, [currentPostIndex, uniqueAllPosts]);

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

  const loadNextPost = () => {
    if (currentPostIndex >= uniqueAllPosts.length - 1) return;

    setLoading(true);
    const nextIndex = currentPostIndex + 1;
    const nextPost = uniqueAllPosts[nextIndex];
    const nextPostId = nextPost.id;

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

  useEffect(() => {
    const handleScroll = () => {
      const postElements = document.querySelectorAll('[data-post-slug]');

      postElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
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
            <PostHeader post={post} />
            <Card className="mb-8">
              <CardContent className="p-0">
                <img src={post.imageUrl} alt={`${post.title} featured image`} className="w-full h-auto rounded-lg" />
              </CardContent>
            </Card>
            <PostContent post={post} />
            <ShareSection post={post} />
          </div>
        );
      })}
      <div ref={loaderElementRef} className="py-8 text-center">
        {loading && <p className="text-gray-500">Loading next article...</p>}
        {currentPostIndex >= uniqueAllPosts.length - 1 &&
          <p className="text-gray-500">{"You've read all our articles!"}</p>
        }
      </div>
    </div>
  );
}
