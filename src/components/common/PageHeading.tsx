import React from 'react';
import { cn } from "@/lib/utils";

interface PageHeadingProps {
  title: string;
  description?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const PageHeading = ({
  title,
  description,
  className,
  as: Component = 'h1'
}: PageHeadingProps) => {
  return (
    <div className={cn(
      "space-y-2 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-12",
      className
    )}>
      <Component
        className={cn(
          "text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl",
          !description && "pb-4"
        )}
      >
        {title}
      </Component>
      {description && (
        <p className="text-muted-foreground max-w-[750px] text-base sm:text-xl">
          {description}
        </p>
      )}
    </div>
  );
};

export default PageHeading;