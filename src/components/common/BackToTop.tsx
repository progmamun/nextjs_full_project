"use client";
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="relative">
            {/* Multiple pulse effect circles */}
            <div className="absolute inset-0 rounded-full bg-blue-300 opacity-20 animate-ping"></div>
            <div className="absolute inset-0 scale-125 rounded-full bg-blue-400 opacity-15 animate-pulse"></div>
            <div className="absolute inset-0 scale-150 rounded-full bg-blue-500 opacity-10 animate-pulse" style={{animationDuration: '3s'}}></div>
            <div className="absolute inset-0 scale-175 rounded-full bg-blue-600 opacity-5 animate-pulse" style={{animationDuration: '4s'}}></div>
            
            {/* Gradient overlay for more depth */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 opacity-20 blur-sm"></div>
            
            {/* Main button */}
            <Button
              onClick={scrollToTop}
              className="relative bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center w-10 h-10 group"
              aria-label="Back to top"
            >
              <ArrowUp 
                size={20} 
                className="group-hover:-translate-y-1 transition-transform duration-200"
              />
              
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-white opacity-10 blur-sm group-hover:opacity-20 transition-opacity"></div>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;