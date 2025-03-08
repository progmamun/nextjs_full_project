import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // console.log('Received Data:', body); // Debugging request

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 });
    }

    // Correctly mapping the request body
    const {
      name: studentName,
      email: studentEmail,
      phone: studentPhone,
      dept: studentDept,
      session: studentSession,
      quizId,
      answers,
    } = body;

    if (!studentName || !studentEmail || !studentPhone || !studentDept || !studentSession || !quizId || !answers) {
      // console.log('Missing required fields:', { studentName, studentEmail, quizId, answers });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (typeof answers !== 'object' || answers === null) {
      return NextResponse.json({ error: 'Invalid answers format' }, { status: 400 });
    }

    let student = await prisma.student.findUnique({ where: { email: studentEmail } });

    if (!student) {
      student = await prisma.student.create({
        data: { name: studentName, email: studentEmail, phone: studentPhone, dept: studentDept, session: studentSession },
      });
    }

    const quiz = await prisma.quiz.findUnique({ where: { id: quizId }, include: { questions: true } });

    if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });

    const existingAttempt = await prisma.quizAttempt.findFirst({
      where: { studentId: student.id, quizId },
    });

    if (existingAttempt) {
      return NextResponse.json({ error: 'You have already submitted this quiz.' }, { status: 403 });
    }

    let score = 0;
    quiz.questions.forEach((q) => {
      const userAnswer = answers[q.id];
      if (userAnswer === q.correctAnswer) score += 1;
      else if (userAnswer) score -= 0.25;
    });

    const attempt = await prisma.quizAttempt.create({
      data: { studentId: student.id, quizId, score, completedAt: new Date() },
    });

    return NextResponse.json({ score, attemptId: attempt.id }, { status: 200 });
  } catch (error) {
    console.error('Submission Error:', error);
    return NextResponse.json({ error: 'Submission failed', details: (error instanceof Error ? error.message : 'Unknown error') }, { status: 500 });
  }
}
