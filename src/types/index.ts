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
}