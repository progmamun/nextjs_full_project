// components/blog/ShareSection.tsx
import ShareButton from '@/components/common/ShareButton';
import { Post } from '@/types/post';
import { FC } from 'react';

const ShareSection: FC<{ post: Post }> = ({ post }) => (
  <div className="mt-12 pt-6">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">Share this article</h3>
      <div className="flex gap-2">
        <ShareButton
          url={`${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${post.slug.current}`} // Updated to slug.current
          title={post.title}
        />
      </div>
    </div>
  </div>
);

export default ShareSection;