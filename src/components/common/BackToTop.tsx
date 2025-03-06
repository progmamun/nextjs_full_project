"use client";
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${
        isVisible ? 'opacity-100 animate-pulse' : 'opacity-0'
      }`}
      style={{ width: '42px', height: '42px' }} // Fixed size
    >
      <ArrowUp size={24} />
    </Button>
  );
};

export default BackToTop;