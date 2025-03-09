// app/photo-gallery/page.tsx
import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/types";
import { getAllPhotos } from "@/utils/getAllPhotos";
import PaginationControls from "@/components/common/PaginationControls";
import PageHeading from "@/components/common/PageHeading";
import LightboxGallery from "@/components/home/LightboxGallery";
// import LightboxGallery from "@/components/LightboxGallery";

const ITEMS_PER_PAGE = 9;

export default async function PhotoGallery({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) || 1 : 1;
  
  const photos: Photo[] = await getAllPhotos();
  // Sort photos by id descending (latest first)
  const sortedPhotos = photos.sort((a, b) => Number(b.id) - Number(a.id));
  
  const totalPages = Math.ceil(sortedPhotos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPhotos = sortedPhotos.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-gray-900">
      <div className="container mx-auto p-8 max-w-7xl">
        <PageHeading title="ফটো গ্যালারি" as="h2" className="py-5 text-center" />
        
        {/* Photo Grid with Lightbox */}
        <LightboxGallery photos={currentPhotos} />

        {/* Pagination */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
        />

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link href="/">
            <Button variant="link">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}