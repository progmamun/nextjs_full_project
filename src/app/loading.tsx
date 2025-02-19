import React from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Loading Page
export function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-96 text-center">
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
          <CardDescription>Please wait while we prepare your content</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </CardContent>
      </Card>
    </div>
  );
}