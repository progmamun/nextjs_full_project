'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      imagePath: '/assets/slide1.jpg',
    },
    {
      id: 2,
      imagePath: '/assets/slide2.jpg',
    },
    {
      id: 3,
      imagePath: '/assets/slide3.jpg',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full h-screen bg-white dark:bg-gray-900">
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={slide.imagePath}
              alt={`Slide ${index + 1}`}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-contain w-full h-full"
              style={{ objectFit: 'contain' }}
            />
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 md:p-3"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 md:p-3"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 md:h-3 md:w-3 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
