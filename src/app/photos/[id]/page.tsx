import { Photo } from '@/types';
import { getAllPhotos } from '@/utils/getAllPhotos';
import React from 'react';

export default async function PhotoPage({ params } : { params: Promise<{id: string}>}) {
  const resolvedParams = await params;
  const photos: Photo[] = await getAllPhotos();
  const photo = photos.find((p) => p.id.toString() === resolvedParams.id);

  if (!photo) {
    return <div>Photo not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{photo.title}</h1>
      <img src={photo.image} alt={photo.title} className="rounded-lg" />
    </div>
  );
};

export const generateStaticParams = async () => {
  const photos: Photo[] = await getAllPhotos();

  return photos.map((photo) => ({
    id: photo.id.toString(),
  }));
};
