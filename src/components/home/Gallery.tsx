// components/Gallery.tsx
import { Button } from "@/components/ui/button";
// import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/types";
import { getAllPhotos } from "@/utils/getAllPhotos";
import PageHeading from "../common/PageHeading";
import GalleryComLightbox from "./GalleryComLightBox";

export default async function Gallery() {
  // Fetch all photos and sort by latest first
  const photos: Photo[] = await getAllPhotos();
  const sortedPhotos = photos.sort((a, b) => Number(b.id) - Number(a.id));

  // Get only the 6 latest photos
  const featuredPhotos = sortedPhotos.slice(0, 6);

  return (
    <div className="bg-background text-foreground dark:bg-gray-900">
      <div className="container mx-auto py-12 max-w-7xl">
        <PageHeading title="ফটো গ্যালারি" as="h2" className="py-5 text-center" />

        {/* Featured Photos with Lightbox */}
        <GalleryComLightbox photos={featuredPhotos} />

        {/* See More Button */}
        <div className="text-center mt-8">
          <Link href="/gallery" className="dark:bg-blue-600 dark:hover:bg-blue-700 p-3">
            <Button size="lg">আরো ছবি দেখুন →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}