// components/ButtonGrid.tsx
import { Button } from "@/components/ui/button";
import {
  Newspaper,
  BookOpen,
  DollarSign,
  LifeBuoy,
} from "lucide-react";
import Link from "next/link";

export default function ButtonGrid() {
  return (
    <div className="dark:bg-gray-900">
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 max-w-4xl mx-auto">
      {/* Support Button */}
      <Link href="/supporter" className="w-full">
        <Button
          size="lg"
          className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-blue-900 text-white hover:bg-blue-800 transition-colors duration-200"
        >
          <LifeBuoy className="w-8 h-8" />
          <span className="text-lg">সমর্থক ফর্ম</span>
        </Button>
      </Link>

      {/* News Button */}
      <Link href="/blog" className="w-full">
        <Button
          size="lg"
          className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-purple-900 text-white hover:bg-purple-800 transition-colors duration-200"
        >
          <Newspaper className="w-8 h-8" />
          <span className="text-lg">সংবাদ</span>
        </Button>
      </Link>

      {/* Syllabus Button */}
      <Link href="/syllabus" className="w-full">
        <Button
          size="lg"
          className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-green-900 text-white hover:bg-green-800 transition-colors duration-200"
        >
          <BookOpen className="w-8 h-8" />
          <span className="text-lg">সিলেবাস</span>
        </Button>
      </Link>

      {/* Scholarship Button */}
      <Link href="/scholarship" className="w-full">
        <Button
          size="lg"
          className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-amber-900 text-white hover:bg-amber-800 transition-colors duration-200"
        >
          <DollarSign className="w-8 h-8" />
          <span className="text-lg">শিক্ষাবৃত্তি ফর্ম</span>
        </Button>
      </Link>
    </div>
    </div>
    
  );
}