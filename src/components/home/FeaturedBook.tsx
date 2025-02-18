import React from 'react';
import Link from 'next/link';
import { Book } from '@/types';
import BookCard from '../book/BookCard';


interface FeaturedBooksProps {
    books: Book[];
}

const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ books }) => {
  const sortedBooks = [...books].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Book Collection</h2>
          <Link href="/books"
            className="text-blue-600 hover:text-blue-700">View All Books →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6 py-8">
          {sortedBooks.slice(0, 6).map((books) => (
            <BookCard key={books.id} books={[books]} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;