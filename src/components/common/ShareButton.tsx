'use client';
import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface ShareButtonProps {
  url: string;
  title: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, title }) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          url: url,
        });
      } else {
        // Fallback for browsers that do not support the Web Share API
        // alert('Web Share API is not supported in this browser.');
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error: Web Share API is not supported in this browser.</AlertTitle>
          <AlertDescription>
            Please try sharing the link manually. We apologize for the inconvenience.
          </AlertDescription>
        </Alert>
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleShare}>
      <Share2 className="h-4 w-4 mr-2" />
      Share
    </Button>
  );
};

export default ShareButton;
