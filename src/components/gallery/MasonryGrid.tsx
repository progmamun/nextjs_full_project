"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./MasonryGrid.module.css";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Photo } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageHeading from "../common/PageHeading";

interface MasonryGridProps {
  items: Photo[];
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "auto";
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % items.length);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === "ArrowRight") {
      setSelectedIndex((selectedIndex + 1) % items.length);
    } else if (e.key === "ArrowLeft") {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
    } else if (e.key === "Escape") {
      closeLightbox();
    }
  };

  return (
    <>
      <PageHeading title="ফটো গ্যালারি" as="h2" className="py-5 text-center" />
      <div className={styles.masonryGrid}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={styles.masonryItem}
            onClick={() => openLightbox(index)}
          >
            <div style={{ position: "relative", width: "100%", paddingTop: "66.67%" }}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="100vw"
                className={styles.masonryImage}
              />
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
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
          <button
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all z-[60]"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all z-50"
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
          <div className="w-full max-w-4xl p-4 flex flex-col items-center">
            <div style={{ position: "relative", width: "100%", maxHeight: "75vh" }}>
              <Image
                src={items[selectedIndex].image}
                alt={items[selectedIndex].title}
                width={800}
                height={600}
                className="max-h-[75vh] max-w-full object-contain z-[55]"
              />
            </div>
            <div className="bg-black bg-opacity-75 p-4 text-white text-center mt-2 w-full">
              <h2 className="text-xl font-semibold">{items[selectedIndex].title}</h2>
            </div>
          </div>
        </div>
      )}
      <div className="text-center mt-8">
        <Link href="/gallery" className="dark:bg-blue-600 p-1">
          <Button size="sm">আরো ছবি দেখুন →</Button>
        </Link>
      </div>
    </>
  );
};

export default MasonryGrid;