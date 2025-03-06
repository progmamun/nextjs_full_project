'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Quiz } from '@/types';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function QuizClient({ quiz }: { quiz: Quiz }) {
  const router = useRouter();

  const [step, setStep] = useState<'info' | 'quiz' | 'submitted'>('info');
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

  // Navigate to thank-you page after submission
  useEffect(() => {
    if (step === 'submitted') {
      router.push('/thank-you');
    }
  }, [step, router]);

  const handleInfoSubmit = async () => {
    if (!studentInfo.name || !studentInfo.email || !studentInfo.phone || !studentInfo.dept || !studentInfo.session) {
      toast('Please fill in all fields');
      return;
    }
    try {
      const res = await axios.post('/quiz/verify', { email: studentInfo.email, quizId: quiz.id });
      if (res.data.isEligible) {
        setStep('quiz');
      } else {
        toast.error(`You are not eligible to take this quiz! ${res.data.error}`);
      }
    } catch (error) {
      toast.error(`Error verifying eligibility! ${error}`);
    }
  };

  // Timer logic
  useEffect(() => {
    if (step === 'quiz' && timeLeft > 0 && !submitted) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (step === 'quiz' && timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, submitted, step]);

  // Security features
  useEffect(() => {
    if (step === 'quiz') {
      // Full-screen mode
      const enterFullScreen = async () => {
        try {
          if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
          }
        } catch (err) {
          console.warn('Fullscreen not supported:', err);
          toast('Please enable full-screen mode for the quiz.');
        }
      };
      enterFullScreen();

      // Handle copy-paste
      const handleCopyPaste = (e: Event) => {
        e.preventDefault();
        toast.error('Copying and pasting are disabled during the quiz.');
      };

      // Handle right-click
      const handleContextMenu = (e: Event) => {
        e.preventDefault();
        toast.error('Right-click is disabled during the quiz.');
      };

      // Handle dev tools shortcuts
      const handleKeydown = (e: KeyboardEvent) => {
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
          (e.ctrlKey && e.key === 'U')
        ) {
          e.preventDefault();
          toast.error('Developer tools are disabled during the quiz.');
        }
      };

      // Handle full-screen exit
      const handleFullscreenChange = () => {
        if (!document.fullscreenElement && step === 'quiz' && !submitted) {
          toast.error('Please stay in full-screen mode to continue the quiz.');
          enterFullScreen();
        }
      };

      // Add event listeners
      document.addEventListener('copy', handleCopyPaste);
      document.addEventListener('paste', handleCopyPaste);
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeydown);
      document.addEventListener('fullscreenchange', handleFullscreenChange);

      // Cleanup
      return () => {
        document.removeEventListener('copy', handleCopyPaste);
        document.removeEventListener('paste', handleCopyPaste);
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      };
    }
  }, [step]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/quiz/submit', {
        studentName: studentInfo.name,
        studentEmail: studentInfo.email,
        studentPhone: studentInfo.phone,
        studentDept: studentInfo.dept,
        studentSession: studentInfo.session,
        quizId: quiz.id,
        answers,
      });
      setSubmitted(true);
      setStep('submitted');
      toast.success(`Quiz submitted! Your score: ${res.data.score}`);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Error submitting quiz');
    }
  };

  // Prevent rendering submitted step component
  if (step === 'submitted') {
    return null;
  }

  // Student Info Form
  if (step === 'info') {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Student Information</h1>
        <Input
          type="text"
          placeholder="Your Name"
          value={studentInfo.name}
          onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
          className="mb-4 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        <Input
          type="email"
          placeholder="Your Email"
          value={studentInfo.email}
          onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
          className="mb-4 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        <Input
          type="text"
          placeholder="Your WhatsApp Number"
          value={studentInfo.phone}
          onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
          className="mb-4 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        <Select
          onValueChange={(value) =>
            setStudentInfo({ ...studentInfo, dept: value as 'Bangla' | 'Economics' | 'Management' | 'Sociology' | 'Music' })
          }
        >
          <SelectTrigger className="mb-4 dark:bg-gray-700 dark:text-white">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800">
            <SelectItem value="Bangla">Bangla</SelectItem>
            <SelectItem value="Economics">Economics</SelectItem>
            <SelectItem value="Management">Management</SelectItem>
            <SelectItem value="Sociology">Sociology</SelectItem>
            <SelectItem value="Music">Music</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) =>
            setStudentInfo({
              ...studentInfo,
              session: value as 'Y2017_18' | 'Y2018_19' | 'Y2019_20' | 'Y2020_21' | 'Y2021_22' | 'Y2022_23' | 'Y2024_25',
            })
          }
        >
          <SelectTrigger className="mb-4 dark:bg-gray-700 dark:text-white">
            <SelectValue placeholder="Select Session" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800">
            <SelectItem value="Y2017_18">2017-18</SelectItem>
            <SelectItem value="Y2018_19">2018-19</SelectItem>
            <SelectItem value="Y2019_20">2019-20</SelectItem>
            <SelectItem value="Y2020_21">2020-21</SelectItem>
            <SelectItem value="Y2021_22">2021-22</SelectItem>
            <SelectItem value="Y2022_23">2022-23</SelectItem>
            <SelectItem value="Y2024_25">2024-25</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleInfoSubmit} className="w-full dark:bg-gray-600 dark:hover:bg-gray-500">
          Start Quiz
        </Button>
      </div>
    );
  }

  // Quiz Interface
  const question = quiz.questions[currentQuestion];
  const options = typeof question.options === 'string' ? JSON.parse(question.options) : question.options;
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md relative min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{quiz.title}</h1>
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
          {currentQuestion + 1}. {question.text}
        </h3>
        <RadioGroup
          value={answers[question.id] || ''}
          onValueChange={(value) => handleAnswer(question.id, value)}
        >
          {options.map((opt: string, idx: number) => (
            <div key={idx} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={opt} id={`${question.id}-${idx}`} className="dark:border-gray-600 dark:bg-gray-700" />
              <Label htmlFor={`${question.id}-${idx}`} className="dark:text-white">{opt}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between mb-6">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
          className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentQuestion === quiz.questions.length - 1}
          variant="outline"
          className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
        >
          Next
        </Button>
      </div>

      {currentQuestion === quiz.questions.length - 1 && (
        <Button onClick={handleSubmit} className="w-full dark:bg-gray-600 dark:hover:bg-gray-500">
          Submit Quiz
        </Button>
      )}

      <div className="mt-6">
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-black dark:bg-gray-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </p>
      </div>
    </div>
  );
}