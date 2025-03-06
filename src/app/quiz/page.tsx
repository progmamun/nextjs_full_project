import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Import shadcn/ui Card
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const prisma = new PrismaClient();

async function getQuizzes() {
  const quizzes = await prisma.quiz.findMany({
    select: { id: true, title: true },
  });
  return quizzes;
}

export default async function QuizPage() {
  const quizzes = await getQuizzes();

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-gray-900">
      <Navigation/>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">বাংলাদেশ ইসলামী ছাত্রশিবির</h1>
        <h1 className="text-3xl font-bold mb-8 text-center">রবীন্দ্র বিশ্ববিদ্যালয়</h1>
        
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3">
            {quizzes.map((quiz) => (
              <li key={quiz.id}>
                <Link href={`/quiz/${quiz.id}`}>
                  <Card className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <CardTitle className="text-xl">{quiz.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Take this quiz to test your knowledge!
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
      </div>
      <Footer/>
    </div>
  );
}