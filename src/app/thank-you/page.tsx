"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const [referenceNumber, setReferenceNumber] = useState<string>('#TYP-000000');

  useEffect(() => {
    // Generate reference number client-side to avoid hydration mismatch
    setReferenceNumber(`#TYP-${Math.floor(100000 + Math.random() * 900000)}`);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg dark:bg-slate-800 dark:border-slate-700">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold dark:text-white">Thank You!</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Your submission has been received
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 dark:text-slate-300">
            We appreciate you taking the time to complete the form. Our team will process your information and get back to you shortly.
          </p>
          <div className="rounded-lg bg-slate-50 dark:bg-slate-900 p-4 mb-4">
            <h3 className="font-medium text-sm text-slate-700 dark:text-slate-300 mb-1">Reference Number</h3>
            <p className="text-slate-900 dark:text-slate-100 font-mono">{referenceNumber}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}