'use client';
import React from "react";
import { cn } from "@/lib/utils";
import { Button as ShadcnButton } from "@/components/ui/button";

// Button Component with dark mode support
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <ShadcnButton
        className={cn(
          "transition-colors",
          isLoading && "cursor-not-allowed opacity-70",
          className
        )}
        variant={variant}
        size={size}
        disabled={isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Loading...
          </span>
        ) : (
          children
        )}
      </ShadcnButton>
    );
  }
);
Button.displayName = "Button";

// Paragraph Component with dark mode support
interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'muted';
}

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, size = 'md', variant = 'default', children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "text-pretty transition-colors",
          size === 'sm' && "text-sm leading-6",
          size === 'md' && "text-base leading-7",
          size === 'lg' && "text-lg leading-8",
          variant === 'muted' && "text-muted-foreground dark:text-muted-foreground",
          variant === 'default' && "text-foreground dark:text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
Paragraph.displayName = "Paragraph";

// H2 Component with dark mode support
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'muted';
}

export const H2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size = 'md', variant = 'default', children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          "font-semibold tracking-tight transition-colors",
          size === 'sm' && "text-2xl",
          size === 'md' && "text-3xl",
          size === 'lg' && "text-4xl",
          variant === 'muted' && "text-muted-foreground dark:text-muted-foreground",
          variant === 'default' && "text-foreground dark:text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }
);
H2.displayName = "H2";

// Span Component with dark mode support
interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'muted' | 'success' | 'warning' | 'error';
}

export const Span = React.forwardRef<HTMLSpanElement, SpanProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "transition-colors",
          variant === 'default' && "text-foreground dark:text-foreground",
          variant === 'muted' && "text-muted-foreground dark:text-muted-foreground",
          variant === 'success' && "text-green-600 dark:text-green-400",
          variant === 'warning' && "text-yellow-600 dark:text-yellow-400",
          variant === 'error' && "text-red-600 dark:text-red-400",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Span.displayName = "Span";

// Image Component with dark mode support
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, fallback = '/placeholder.png', aspectRatio = 'auto', alt = '', ...props }, ref) => {
    const [error, setError] = React.useState(false);

    return (
      <div
        className={cn(
          "overflow-hidden rounded-lg transition-colors",
          aspectRatio === 'square' && "aspect-square",
          aspectRatio === 'video' && "aspect-video",
          className
        )}
      >
        <img
          ref={ref}
          className={cn(
            "h-full w-full object-cover transition-opacity",
            error && "bg-muted dark:bg-muted"
          )}
          alt={alt}
          onError={() => setError(true)}
          src={error ? fallback : props.src}
          {...props}
        />
      </div>
    );
  }
);
Image.displayName = "Image";