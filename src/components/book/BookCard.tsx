import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book } from '@/types';
import { Button, Image } from '../common/StyleComponents';

interface BookListProps {
  books?: Book[];
}

const BookCard = ({ books = [] }: BookListProps) => {
  const bookPosts = books || [];

  if (bookPosts.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-500">No blog posts available.</p>
      </Card>
    );
  }
  return (
    <>
      {bookPosts.map((book) => (
        <Card key={book.id} className="w-full max-w-sm transition-shadow hover:shadow-lg">
          <CardHeader className="relative h-48 p-0">
            {/* <img
              src={book?.image}
              alt={book.title}
              className="object-cover w-full h-full rounded-t-lg"
            /> */}
            <Image
              src={book?.image}
              alt={book.title}
              aspectRatio='square'
              
            />
          </CardHeader>

          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
                <Badge variant="secondary">{book.genre}</Badge>
              </div>

              <p className="text-sm text-muted-foreground">by {book.author}</p>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Published: {new Date(book.publishedAt).toLocaleDateString()}</span>
                <span>{book?.published_year}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button variant="outline" size="icon" className="w-full">
              <a href={book.link} target="_blank" rel="noopener noreferrer">
                View
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};


export default BookCard;