"use client";
import { useState, useEffect } from "react";

export default function Quiz({ studentEmail }: { studentEmail: string }) {
  const [score] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(1560); // 26 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    if (submitted) return;
    setSubmitted(true);

    await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: studentEmail, score }),
    });
  };

  return (
    <div>
      <p>Time Left: {Math.floor(timer / 60)}:{timer % 60}</p>
      {/* Quiz Questions Here */}
      <button onClick={handleSubmit} className="bg-green-500 text-white">Submit</button>
    </div>
  );
}
