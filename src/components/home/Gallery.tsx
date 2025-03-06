import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/types";
import { getAllPhotos } from "@/utils/getAllPhotos";

export default async function Gallery() {
  // Fetch all photos and sort by latest first
  const photos: Photo[] = await getAllPhotos();
  const sortedPhotos = photos.sort((a, b) => Number(b.id) - Number(a.id));

  // Get only the 4 latest photos
  const featuredPhotos = sortedPhotos.slice(0, 6);

  return (
    <div className="bg-background text-foreground dark:bg-gray-900">
      <div className="container mx-auto p-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-6 text-center">ফটো গ্যালারি</h1>

        {/* Featured Photos - 2 columns, 4 images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredPhotos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative w-full h-[250px] md:h-[300px]">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">{photo.title}</h2>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Link href="/gallery" className="dark:bg-blue-600 dark:hover:bg-blue-700 p-3">
            <Button size="lg">আরো ছবি দেখুন →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}