// components/dashboard-table.tsx
'use client';

import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { QuizAttempt } from '@prisma/client';

type ExtendedQuizAttempt = QuizAttempt & {
  student: { name: string; email: string; dept: string; session: string };
  quiz: { title: string };
};

interface DashboardTableProps {
  attempts: ExtendedQuizAttempt[];
  total: number;
  page: number;
  itemsPerPage: number;
  quizId: string | null;
}

export function DashboardTable({
  attempts,
  total,
  page,
  itemsPerPage,
  quizId,
}: DashboardTableProps) {
  const router = useRouter();
  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    if (quizId) params.set('quizId', quizId);
    params.set('page', newPage.toString());
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Quiz</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Session</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attempts.map((attempt) => (
            <TableRow key={attempt.id}>
              <TableCell>{attempt.student.name}</TableCell>
              <TableCell>{attempt.student.email}</TableCell>
              <TableCell>{attempt.quiz.title}</TableCell>
              <TableCell>{attempt.score}</TableCell>
              <TableCell>{attempt.student.dept}</TableCell>
              <TableCell>{attempt.student.session}</TableCell>
              <TableCell>
                {attempt.completedAt?.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <p>
          Showing {(page - 1) * itemsPerPage + 1} to{' '}
          {Math.min(page * itemsPerPage, total)} of {total} results
        </p>
        <div className="space-x-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}