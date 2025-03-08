'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import ShareSection from './ShareSection';
import { Post } from '@/types/post';
import { urlFor } from '@/lib/sanity';

interface BlogFilters {
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

interface InfiniteScrollBlogProps {
  initialPost: Post;
}

async function fetchPosts(filters?: BlogFilters): Promise<Post[]> {
  const params = new URLSearchParams({
    sortOrder: filters?.sortOrder || 'desc',
    limit: (filters?.limit || 5).toString(),
    offset: (filters?.offset || 0).toString(),
  });
  const response = await fetch(`/api/posts?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}

export default function InfiniteScrollBlog({ initialPost }: InfiniteScrollBlogProps) {
  const [posts, setPosts] = useState<Post[]>([initialPost]);
  const [loadedPostIds, setLoadedPostIds] = useState<string[]>([initialPost._id]);
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const POSTS_PER_FETCH = 5;

  useEffect(() => {
    const currentPost = posts[currentPostIndex];
    if (currentPost) {
      const newUrl = `/blog/${currentPost.slug.current}`;
      window.history.pushState({}, '', newUrl);
    }
  }, [currentPostIndex, posts]);

  const debounce = (fn: () => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(fn, delay);
    };
  };

  const loadNextPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const offset = posts.length;
    try {
      const newPosts = await fetchPosts({
        sortOrder: 'desc',
        limit: POSTS_PER_FETCH,
        offset,
      });

      if (newPosts.length < POSTS_PER_FETCH) setHasMore(false);
      setPosts(prev => [
        ...prev,
        ...newPosts.filter(np => !prev.some(p => p._id === np._id)),
      ]);
      setLoadedPostIds(prev => [
        ...prev,
        ...newPosts.map(np => np._id).filter(id => !prev.includes(id)),
      ]);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, posts.length]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadNextPosts();
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(loaderRef.current);
    return () => observerRef.current?.disconnect();
  }, [loadNextPosts, hasMore]);

  const handleScroll = useCallback(() => {
    const postElements = document.querySelectorAll('[data-post-slug]');
    postElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const slug = element.getAttribute('data-post-slug');
      const postIndex = posts.findIndex(post => post.slug.current === slug);

      if (rect.top <= 200 && rect.bottom >= 200 && postIndex !== -1 && postIndex !== currentPostIndex) {
        setCurrentPostIndex(postIndex);
      }
    });
  }, [currentPostIndex, posts]);

  const debouncedScroll = useCallback(debounce(handleScroll, 100), [handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [debouncedScroll]);

  return (
    <div className="dark:bg-gray-900 min-h-screen">
      {loadedPostIds.map((postId) => {
        const post = posts.find(p => p._id === postId);
        if (!post) return null;

        return (
          <article
            key={post._id}
            data-post-slug={post.slug.current}
            className="max-w-4xl mx-auto px-4 py-8 border-b border-gray-200 dark:border-gray-800"
          >
            <PostHeader post={post} />
            {post.mainImage && (
              <Card className="mb-8">
                <CardContent className="p-0">
                  <img
                    src={urlFor(post.mainImage)}
                    alt={post.mainImage.alt || `${post.title} main image`}
                    className="w-full h-auto rounded-lg object-cover"
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            )}
            <PostContent post={post} />
            <ShareSection post={post} />
          </article>
        );
      })}
      <div ref={loaderRef} className="py-8 text-center text-gray-500">
        {loading && <p>Loading next articles...</p>}
        {!loading && !hasMore && <p>You have read all our articles!</p>}
      </div>
    </div>
  );
}