import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book } from '@/types';

const BookCard: React.FC<Book> = ({
  title,
  author,
  genre,
  published_year,
  image,
  publishedAt,
  link
}) => {
  return (
    <Card className="w-full max-w-sm transition-shadow hover:shadow-lg">
      <CardHeader className="relative h-48 p-0">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full rounded-t-lg"
        />
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
            <Badge variant="secondary">{genre}</Badge>
          </div>
          
          <p className="text-sm text-muted-foreground">by {author}</p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Published: {new Date(publishedAt).toLocaleDateString()}</span>
            <span>{published_year}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <a 
          href={link}
          className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </a>
      </CardFooter>
    </Card>
  );
};

export default BookCard;