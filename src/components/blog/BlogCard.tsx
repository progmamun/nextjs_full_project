import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User, Bookmark } from "lucide-react";
import { Post } from '@/types';



interface BlogCardProps {
  post?: Post;
  variant?: 'default' | 'featured' | 'compact';
  onReadMore?: (slug: string) => void;
  onBookmark?: (id: string) => void;
}

const defaultPost: Post = {
  id: "",
  title: "Untitled Post",
  description: "No description available",
  author: "string",
  date: "No date",
  readTime: "0 min read",
  tags: [],
  slug: "",
};

const BlogCard = ({ 
  post = defaultPost, 
  variant = 'default',
  // onReadMore,
  // onBookmark 
}: BlogCardProps) => {
  if (!post) {
    return null;
  }

  // const handleReadMore = () => {
  //   if (onReadMore && post.slug) {
  //     onReadMore(post.slug);
  //   }
  // };

  // const handleBookmark = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (onBookmark && post.id) {
  //     onBookmark(post.id);
  //   }
  // };

  if (variant === 'compact') {
    return (
      <Card className="flex flex-row items-center p-4 hover:shadow-md transition-shadow duration-200">
        <div className="flex-grow">
          <h3 className="font-semibold line-clamp-1">{post.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <span className="flex items-center gap-1">
              <User size={14} />
              {/* {post.author?.name || 'Anonymous'} */}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>
        </div>
        {/* <Button variant="ghost" size="sm" onClick={handleReadMore}> */}
        <Button variant="ghost" size="sm">
          Read
        </Button>
      </Card>
    );
  }

  return (
    <Card className={`flex flex-col hover:shadow-lg transition-shadow duration-200 ${
      variant === 'featured' ? 'border-primary' : ''
    }`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            {/* {variant === 'featured' && post.isFeatured && (
              <Badge className="mb-2">Featured</Badge>
            )} */}
            <CardTitle className="text-xl font-bold line-clamp-2">
              {post.title}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            // onClick={handleBookmark}
            // className={post.isBookmarked ? 'text-primary' : ''}
          >
            <Bookmark size={20} />
          </Button>
        </div>
        <CardDescription className="flex items-center gap-2 text-sm text-gray-500">
          <User size={16} />
          {/* {post.author?.name || 'Anonymous'} */}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-600 line-clamp-3 mb-4">
          {post.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag, index) => (
            <Badge key={`${tag}-${index}`} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <CalendarDays size={16} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} />
            {post.readTime}
          </span>
        </div>
        <Button 
          variant="outline" 
          // onClick={handleReadMore}
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;