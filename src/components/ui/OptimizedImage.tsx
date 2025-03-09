import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
}

// Helper function to transform ImgBB URL for better quality/size
function getOptimizedImgBBUrl(url: string, width?: number): string {
  if (!url.includes('ibb.co')) return url;
  
  // If it's an ImgBB URL, ensure we're using the best format
  const baseUrl = url.replace(/\.(jpg|jpeg|png|gif)$/, '');
  
  if (width) {
    // ImgBB size parameters:
    // width <= 320: use _320
    // width <= 640: use _640
    // width <= 1024: use _1024
    // else: use original
    const sizeParam = 
      width <= 320 ? '_320' :
      width <= 640 ? '_640' :
      width <= 1024 ? '_1024' : '';
    
    return `${baseUrl}${sizeParam}.webp`;
  }
  
  return `${baseUrl}.webp`;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 90,
}: OptimizedImageProps) {
  const [isLoading, setLoading] = useState(true);
  const optimizedSrc = getOptimizedImgBBUrl(src, width);

  return (
    <div className="overflow-hidden">
      <Image
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
          ${className}
        `}
        onLoadingComplete={() => setLoading(false)}
        priority={priority}
        quality={quality}
        sizes="(max-width: 640px) 100vw,
               (max-width: 768px) 80vw,
               (max-width: 1024px) 60vw,
               50vw"
        loading={priority ? 'eager' : 'lazy'}
        placeholder={isLoading ? 'blur' : 'empty'}
        blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
          '<svg width="100" height="100" version="1.1" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#CCCCCC"/></svg>'
        ).toString('base64')}`}
      />
    </div>
  );
} 