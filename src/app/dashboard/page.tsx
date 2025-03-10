// app/dashboard/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DashboardTable } from '@/components/dashboard/dashboard-table';

// Define types for quiz and participant data
interface Quiz {
  id: string;
  title: string;
}

interface QuizAttempt {
  id: string;
  studentId: string;
  quizId: string;
  score: number;
  startedAt: Date;
  completedAt: Date | null;
  student: { name: string; email: string; dept: string; session: string };
  quiz: { title: string };
}

interface ParticipantsData {
  attempts: QuizAttempt[];
  total: number;
  itemsPerPage: number;
}

// Fetch quizzes
async function getQuizzes(): Promise<Quiz[]> {
  return await prisma.quiz.findMany({
    select: { id: true, title: true },
  });
}

// Fetch participant data with filters
async function getParticipantsData(
  quizId: string | null,
  page: number
): Promise<ParticipantsData> {
  const ITEMS_PER_PAGE = 20;

  const whereClause: { quizId?: string } = {};
  if (quizId) whereClause.quizId = quizId;

  const [attempts, total] = await Promise.all([
    prisma.quizAttempt.findMany({
      where: whereClause,
      include: {
        student: { select: { name: true, email: true, dept: true, session: true } },
        quiz: { select: { title: true } },
      },
      orderBy: { score: 'desc' },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    }),
    prisma.quizAttempt.count({ where: whereClause }),
  ]);

  return { attempts, total, itemsPerPage: ITEMS_PER_PAGE };
}

interface DashboardProps {
  searchParams: Promise<{
    quizId?: string;
    page?: string;
  }>;
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  // Check if user is an admin (sync Clerk userId with Admin table)
  const admin = await prisma.admin.findUnique({
    where: { id: userId },
  });

  if (!admin) {
    redirect('/');
  }

  // Await the searchParams
  const resolvedSearchParams = await searchParams;
  const quizId = resolvedSearchParams.quizId || null;
  const page = parseInt(resolvedSearchParams.page || '1', 10) || 1;

  const quizzes = await getQuizzes();
  const { attempts, total, itemsPerPage } = await getParticipantsData(quizId, page);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Participants Overview</h1>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Select name="quizId" defaultValue={quizId || undefined}>
                  <SelectTrigger className="bg-white border border-gray-300">
                    <SelectValue placeholder="Select Quiz" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-md z-50">
                    <SelectItem value="all" className="hover:bg-gray-100">
                      All Quizzes
                    </SelectItem>
                    {quizzes.map((quiz) => (
                      <SelectItem
                        key={quiz.id}
                        value={quiz.id}
                        className="hover:bg-gray-100"
                      >
                        {quiz.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="bg-blue-500 text-white">
                Filter
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Participants Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quiz Attempts</CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardTable
            attempts={attempts}
            total={total}
            page={page}
            itemsPerPage={itemsPerPage}
            quizId={quizId}
          />
        </CardContent>
      </Card>
    </div>
  );
}