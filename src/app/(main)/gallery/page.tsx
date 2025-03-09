import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/types";
import { getAllPhotos } from "@/utils/getAllPhotos";
import PaginationControls from "@/components/common/PaginationControls";

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
        <h1 className="text-3xl font-bold mb-6 text-center">ফটো গ্যালারি</h1>
        
        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPhotos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative w-full h-[200px] md:h-[250px]">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">{photo.title}</h2>
              </CardContent>
            </Card>
          ))}
        </div>

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