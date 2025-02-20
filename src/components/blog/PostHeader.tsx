import { Calendar, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import PageHeading from '@/components/common/PageHeading';
import { FC } from 'react';
import { Post } from '@/types';


const PostHeader: FC<{ post: Post }> = ({ post }) => (
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
        {post.tags.map((tag) => (
          <Badge key={`${post.id}-${tag}`} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );


  export default PostHeader;