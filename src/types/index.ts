export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: {
    name: string;
    image: string;
    role: string;
  };
  publishedAt: string;
  readingTime: string;
  tags: string[];
  imageUrl: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  link?: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  published_year: number;
  image: string;
  publishedAt: string;
  link: string;
}