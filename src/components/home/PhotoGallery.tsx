'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Photo } from '@/types';
import PageHeading from '../common/PageHeading';


interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className='container mx-auto py-12 max-w-7xl'>
        <div className="text-center mb-8">
          <PageHeading title='Photo Gallery' as='h2' />
        </div>
        <Slider {...settings} className="">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative h-64 cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <Image
                src={photo.image}
                alt={photo.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-end">
                <h2 className="text-white text-lg font-bold bg-black bg-opacity-50 p-2">
                  {photo.title}
                </h2>
              </div>
            </div>
          ))}
        </Slider>
        {selectedPhoto && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
            onClick={() => setSelectedPhoto(null)}
          >
            <Image
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
              layout="fill"
              objectFit="contain"
              className="max-h-full max-w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
