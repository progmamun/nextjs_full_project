"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <Link href={`/gallery?page=${currentPage - 1}`}>
        <Button
          variant="outline"
          disabled={currentPage === 1}
        >
          Previous
        </Button>
      </Link>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Link href={`/gallery?page=${currentPage + 1}`}>
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Link>
    </div>
  );
}