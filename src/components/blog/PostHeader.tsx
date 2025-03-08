import { Calendar, User } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import PageHeading from '@/components/common/PageHeading';
import { FC } from 'react';
import { Post } from '@/types/post';
import formatDateToBangla from '@/utils/helpers';

const PostHeader: FC<{ post: Post }> = ({ post }) => (
  <div className="space-y-4 mb-8">
    <PageHeading title={post.title} as="h2" />
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="flex items-center justify-center w-8 h-8 rounded-full">
            <User className="w-5 h-5 text-sky-500" />  {/* Increased size for better visibility */}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{post.author?.name || 'Unknown Author'}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4" />
        <span className="text-sm">{formatDateToBangla(post.publishedAt)}</span>
      </div>
    </div>
    {post.categories && post.categories.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {post.categories.map((category, index) => (
          <span
            key={category.slug?.current || `category-${index}`} // Fallback key if slug is null
            className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
          >
            {category.title || 'Unnamed Category'} {/* Fallback for missing title */}
          </span>
        ))}
      </div>
    )}
  </div>
);

export default PostHeader;
