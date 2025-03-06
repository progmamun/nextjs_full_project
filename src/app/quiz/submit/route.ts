import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { studentName, studentEmail, studentPhone, studentDept, studentSession, quizId, answers } = await req.json();

  const existingStudent = await prisma.student.findUnique({
    where: { email: studentEmail },
  });

  const student = existingStudent || await prisma.student.create({
    data: {
      name: studentName,
      email: studentEmail,
      phone: studentPhone,
      dept: studentDept,
      session: studentSession,
    },
  });

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: true },
  });
  if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });

  let score = 0;
  quiz.questions.forEach((q) => {
    const userAnswer = answers[q.id];
    if (userAnswer === q.correctAnswer) score += 1;
    else if (userAnswer) score -= 0.25;
  });

  const attempt = await prisma.quizAttempt.create({
    data: {
      studentId: student.id,
      quizId,
      score,
      completedAt: new Date(),
    },
  });

  return NextResponse.json({ score, attemptId: attempt.id }, { status: 200 });
}