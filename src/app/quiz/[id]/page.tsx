import { PrismaClient } from '@prisma/client';
import QuizClient from './QuizClient';

const prisma = new PrismaClient();

async function getQuiz(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });
    if (!quiz) {
      console.log(`No quiz found for ID: ${id}`);
    }
    return quiz;
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return null;
  }
}

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quiz = await getQuiz(id);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background text-foreground p-8 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
          <h1 className="text-xl font-semibold text-red-600 dark:text-red-400">Quiz Not Found</h1>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            The requested quiz does not exist or there was an error.
          </p>
        </div>
      </div>
    );
  }

  // Transform quiz to ensure options is a string (JSON-encoded)
  const transformedQuiz = {
    ...quiz,
    questions: quiz.questions.map((question) => ({
      ...question,
      options: typeof question.options === 'string' ? question.options : JSON.stringify(question.options),
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 dark:bg-gray-900">
      <QuizClient quiz={transformedQuiz} />
    </div>
  );
}