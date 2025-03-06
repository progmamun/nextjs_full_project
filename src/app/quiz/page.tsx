import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Import shadcn/ui Card

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
    <div className="min-h-screen bg-background text-foreground p-8 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Welcome to the Quiz App</h1>
        <nav>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </nav>
      </div>
    </div>
  );
}