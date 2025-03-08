'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quiz } from '@/types';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function QuizClient({ quiz }: { quiz: Quiz }) {
  const router = useRouter();
  const [step, setStep] = useState<'info' | 'quiz' | 'submitted'>('info');
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    email: '',
    phone: '',
    dept: '' as 'Bangla' | 'Economics' | 'Management' | 'Sociology' | 'Music' | '',
    session: '' as 'Y2017_18' | 'Y2018_19' | 'Y2019_20' | 'Y2020_21' | 'Y2021_22' | 'Y2022_23' | 'Y2024_25' | '',
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [submitted, setSubmitted] = useState(false);

  // Navigation to thank-you page
  useEffect(() => {
    if (step === 'submitted') router.push('/thank-you');
  }, [step, router]);

  // Timer logic
  useEffect(() => {
    if (step !== 'quiz' || timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft, submitted]);

  // Security features
  useEffect(() => {
    if (step !== 'quiz') return;

    const enterFullScreen = async () => {
      try {
        await document.documentElement.requestFullscreen();
      } catch {
        toast('Please enable full-screen mode.');
      }
    };
    enterFullScreen();

    const preventAction = (e: Event) => {
      e.preventDefault();
      toast.error('This action is disabled during the quiz.');
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'F12' || (e.ctrlKey && (e.shiftKey || e.key === 'u'))) {
        preventAction(e);
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !submitted) enterFullScreen();
    };

    document.addEventListener('copy', preventAction);
    document.addEventListener('paste', preventAction);
    document.addEventListener('contextmenu', preventAction);
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('copy', preventAction);
      document.removeEventListener('paste', preventAction);
      document.removeEventListener('contextmenu', preventAction);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.exitFullscreen?.();
    };
  }, [step, submitted]);

  const handleInfoSubmit = async () => {
    if (Object.values(studentInfo).some((val) => !val)) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post('/quiz/verify', { email: studentInfo.email, quizId: quiz.id });
      if (res.data.isEligible) {
        setStep('quiz');
      } else {
        toast.error(`Not eligible: ${res.data.error}`);
      }
    } catch (error) {
      toast.error(`Verification failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('/quiz/submit', {
        ...studentInfo,
        quizId: quiz.id,
        answers,
      });
      setSubmitted(true);
      setStep('submitted');
      toast.success(`Quiz submitted! Score: ${res.data.score}`);
    } catch {
      toast.error('Submission failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'submitted') return null;

  if (step === 'info') {
    return (
      <Card className="max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-center">Student Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Your Name"
            value={studentInfo.name}
            onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={studentInfo.email}
            onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
          />
          <Input
            placeholder="Your WhatsApp Number"
            value={studentInfo.phone}
            onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
          />
          <Select
            onValueChange={(value) => setStudentInfo({ ...studentInfo, dept: value as typeof studentInfo.dept })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {['Bangla', 'Economics', 'Management', 'Sociology', 'Music'].map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => setStudentInfo({ ...studentInfo, session: value as typeof studentInfo.session })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Session" />
            </SelectTrigger>
            <SelectContent>
              {['Y2017_18', 'Y2018_19', 'Y2019_20', 'Y2020_21', 'Y2021_22', 'Y2022_23', 'Y2024_25'].map((session) => (
                <SelectItem key={session} value={session}>
                  {session.replace('Y', '').replace('_', '-')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleInfoSubmit} className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Starting...
              </>
            ) : (
              'Start Quiz'
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = quiz.questions[currentQuestion];
  const options = typeof question.options === 'string' ? JSON.parse(question.options) : question.options;

  return (
    <Card className="max-w-2xl mx-auto mt-10 min-h-screen">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{quiz.title}</CardTitle>
          <span className="text-muted-foreground">
            Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
        <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">
            {currentQuestion + 1}. {question.text}
          </h3>
          <RadioGroup value={answers[question.id] || ''} onValueChange={(value) => handleAnswer(question.id, value)}>
            {options.map((opt: string, idx: number) => (
              <div key={idx} className="flex items-center space-x-2">
                <RadioGroupItem value={opt} id={`${question.id}-${idx}`} />
                <Label htmlFor={`${question.id}-${idx}`}>{opt}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex justify-between">
          <Button
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            Previous
          </Button>
          {currentQuestion < quiz.questions.length - 1 ? (
            <Button onClick={() => setCurrentQuestion((prev) => prev + 1)} variant="outline">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Quiz'
              )}
            </Button>
          )}
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </p>
      </CardContent>
    </Card>
  );
}