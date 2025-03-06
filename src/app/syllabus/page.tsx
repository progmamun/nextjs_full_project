"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, UserCheck, UserPlus } from "lucide-react"; // Icons from lucide-react

export default function SyllabusPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-100 dark:bg-gray-900 px-4 py-8">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-center">
        সিলেবাস
      </h1>
      <h4 className="text-lg md:text-2xl font-semibold text-gray-700 dark:text-gray-200 text-center">
        বাংলাদেশ ইসলামী ছাত্রশিবির, রবীন্দ্র বিশ্ববিদ্যালয়
      </h4>

      {/* Buttons with Links and Icons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl">
        <Button
          asChild
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full flex items-center gap-2 dark:bg-indigo-700 dark:hover:bg-indigo-800"
        >
          <Link href="https://www.icsbook.info/kormi-syllabus" target="_blank">
            <Users className="w-5 h-5" /> কর্মী সিলেবাস
          </Link>
        </Button>

        <Button
          asChild
          size="lg"
          className="bg-teal-600 hover:bg-teal-700 text-white w-full flex items-center gap-2 dark:bg-teal-700 dark:hover:bg-teal-800"
        >
          <Link href="https://www.icsbook.info/sathi-syllabus" target="_blank">
            <UserCheck className="w-5 h-5" /> সাথী সিলেবাস
          </Link>
        </Button>

        <Button
          asChild
          size="lg"
          className="bg-rose-600 hover:bg-rose-700 text-white w-full flex items-center gap-2 dark:bg-rose-700 dark:hover:bg-rose-800"
        >
          <Link href="https://www.icsbook.info/member-syllabus" target="_blank">
            <UserPlus className="w-5 h-5" /> সদস্য সিলেবাস
          </Link>
        </Button>
      </div>
    </div>
  );
}