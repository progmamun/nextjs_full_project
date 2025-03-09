'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Photo } from '@/types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryLightboxProps {
    photos: Photo[];
}

export default function GalleryComLightbox({ photos }: GalleryLightboxProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        setSelectedIndex(index);
        // Prevent scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedIndex(null);
        // Allow scrolling again
        document.body.style.overflow = 'auto';
    };

    const goToNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex === null) return;
        setSelectedIndex((selectedIndex + 1) % photos.length);
    };

    const goToPrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex === null) return;
        setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (selectedIndex === null) return;

        if (e.key === 'ArrowRight') {
            setSelectedIndex((selectedIndex + 1) % photos.length);
        } else if (e.key === 'ArrowLeft') {
            setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    };

    return (
        <>
            {/* Photo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {photos.map((photo, index) => (
                    <Card
                        key={photo.id}
                        className="overflow-hidden cursor-pointer"
                        onClick={() => openLightbox(index)}
                    >
                        <CardHeader className="p-0">
                            <div className="relative w-full h-[200px] md:h-[250px]">
                                <Image
                                    src={photo.image}
                                    alt={photo.title}
                                    fill
                                    loading="lazy"
                                    className="object-cover transition-transform hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <h2 className="text-lg font-semibold">{photo.title}</h2>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
                    onClick={closeLightbox}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    {/* Close button */}
                    <button
                        className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all z-50"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeLightbox();
                        }}
                        aria-label="Close lightbox"
                    >
                        <X size={24} />
                    </button>

                    {/* Navigation arrows - positioned at 50% height */}
                    <button
                        className="absolute left-0 md:left-[-60px] top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all z-[60]"
                        onClick={goToPrevious}
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all z-50"
                        onClick={goToNext}
                        aria-label="Next image"
                    >
                        <ChevronRight size={28} />
                    </button>

                    <div className="w-full max-w-4xl p-4 flex flex-col items-center">
                        {/* Use standard img tag for lightbox */}
                        <Image
                            src={photos[selectedIndex].image}
                            alt={photos[selectedIndex].title}
                            width={800} // Set an appropriate width
                            height={600} // Set an appropriate height
                            className="max-h-[75vh] max-w-full object-contain"
                        />
                        <div className="bg-black bg-opacity-75 p-4 text-white text-center mt-2 w-full">
                            <h2 className="text-xl font-semibold">{photos[selectedIndex].title}</h2>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}