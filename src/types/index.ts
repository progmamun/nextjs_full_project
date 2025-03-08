export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  link?: string;
}

export interface Photo {
  id: string;
  title: string;
  image: string;
}

export interface PeoplePhoto {
  id: string;
  name: string;
  designation: string;
  session: string;
  dept: string;
  image: string;
  hall?: string;
  quotes?: string;
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

export interface FacebookAttachment {
  media?: {
    image?: {
      height: number;
      src: string;
      width: number;
    };
    media_type?: string; // "image" or "video"
    url?: string; // Video URL if media_type is "video"
  };
}

export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  permalink_url: string;
  attachments?: {
    data: FacebookAttachment[];
  };
}