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
  id: string;
  title: string;
  author: string;
  genre: string;
  published_year: number;
  image: string;
  link: string;
  publishedAt: string;
}

export interface Photo {
  id: string;
  title: string;
  image: string;
}

export interface Quiz {
  id: string;
  title: string;
  duration: number;
  questions: Question[];
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  options: string[] | string; // Can be string (JSON) or array
  correctAnswer: string;
}

export interface QuizAttempt {
  id: string;
  studentId: string;
  quizId: string;
  score: number;
  startedAt: Date;
  completedAt?: Date;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  dept: 'Bangla' | 'Economics' | 'Management' | 'Sociology' | 'Music';
  session: 'Y2017_18' | 'Y2018_19' | 'Y2019_20' | 'Y2020_21' | 'Y2021_22' | 'Y2022_23' | 'Y2024_25';
  createdAt: Date;
}