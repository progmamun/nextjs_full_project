'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import ShareSection from './ShareSection';
import { Post } from '@/types/post';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';

interface BlogFilters {
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

interface InfiniteScrollBlogProps {
  initialPost: Post;
}

interface FetchResponse {
  posts: Post[];
  total: number;
}

async function fetchPosts(filters?: BlogFilters): Promise<FetchResponse> {
  const params = new URLSearchParams({
    sortOrder: filters?.sortOrder || 'desc',
    limit: (filters?.limit || 5).toString(),
    offset: (filters?.offset || 0).toString(),
  });
  // console.log(`Fetching posts with params: ${params.toString()}`);
  const response = await fetch(`/api/posts?${params.toString()}`, {
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Failed to fetch posts: ${response.statusText}`);
  const data: FetchResponse = await response.json();
  
  // console.log(`Fetched ${data.posts.length} posts, Total: ${data.total}`);
  // data.posts.forEach((post, index) => 
  //   console.log(`Post ${index + (filters?.offset || 0) + 1}: "${post.title}", Published: ${post.publishedAt}, ID: ${post._id}`)
  // );
  return data;
}

export default function InfiniteScrollBlog({ initialPost }: InfiniteScrollBlogProps) {
  const [posts, setPosts] = useState<Post[]>([initialPost]);
  const [loadedPostIds, setLoadedPostIds] = useState<string[]>([initialPost._id]);
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalPosts, setTotalPosts] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const POSTS_PER_FETCH = 5;

  // console.log(`Initial Post: "${initialPost.title}", Published: ${initialPost.publishedAt}, ID: ${initialPost._id}`);

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
    if (loading || !hasMore) {
      // console.log('Skipping load: loading or no more posts');
      return;
    }

    setLoading(true);
    // Offset starts after initialPost, so we fetch remaining posts
    const offset = posts.length - 1; // Subtract 1 to account for initialPost
    try {
      const { posts: newPosts, total } = await fetchPosts({
        sortOrder: 'desc',
        limit: POSTS_PER_FETCH,
        offset: offset < 0 ? 0 : offset, // Ensure offset isn’t negative
      });

      if (totalPosts === null) setTotalPosts(total);

      // Ensure initialPost is preserved and deduplicate new posts
      const updatedPosts = [
        initialPost, // Always keep initialPost at the start
        ...posts.filter(p => p._id !== initialPost._id), // Existing posts minus initialPost
        ...newPosts.filter(np => np._id !== initialPost._id && !posts.some(p => p._id === np._id)), // New posts, excluding initialPost and duplicates
      ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()); // Re-sort to ensure order

      setPosts(updatedPosts);
      setLoadedPostIds(prev => [
        initialPost._id, // Ensure initialPost ID is first
        ...prev.filter(id => id !== initialPost._id),
        ...newPosts.map(np => np._id).filter(id => id !== initialPost._id && !prev.includes(id)),
      ]);

      setHasMore(updatedPosts.length < total);
      // console.log(`Offset: ${offset}, Limit: ${POSTS_PER_FETCH}, Fetched: ${newPosts.length}, Total: ${total}, HasMore: ${updatedPosts.length < total}`);
      // console.log('Current posts array:', updatedPosts.map(p => ({ title: p.title, publishedAt: p.publishedAt, _id: p._id })));
    } catch (error) {
      console.error('Error fetching posts:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, posts, totalPosts, initialPost]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) {
      // console.log('Observer not set: no loader or no more posts');
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // console.log('Loader intersected, triggering loadNextPosts');
          loadNextPosts();
        }
      },
      { threshold: 0.5 }
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

  const debouncedScroll = useCallback(() => debounce(handleScroll, 100)(), [handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [debouncedScroll]);

  return (
    <div className="dark:bg-gray-900 min-h-screen">
      {loadedPostIds.map((postId) => {
        const post = posts.find(p => p._id === postId);
        if (!post) {
          // console.log(`Post with ID ${postId} not found in posts array`);
          return null;
        }

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
                  <Image
                    src={urlFor(post.mainImage)}
                    alt={post.mainImage.alt || `${post.title} main image`}
                    width={800}
                    height={450}
                    quality={75}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-auto rounded-lg object-cover"
                    priority={postId === initialPost._id}
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