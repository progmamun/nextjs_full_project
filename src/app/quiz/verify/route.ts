import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, quizId } = await req.json();

  const student = await prisma.student.findUnique({
    where: { email },
  });

  if (student) {
    const hasAttempt = await prisma.quizAttempt.findFirst({
      where: { studentId: student.id, quizId },
    });
    if (hasAttempt) {
      return NextResponse.json(
        { error: 'You have already participated in this quiz' },
        { status: 403 }
      );
    }
  }

  return NextResponse.json(
    { isEligible: true, studentId: student?.id || null },
    { status: 200 }
  );
}