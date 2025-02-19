import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


export function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-96 text-center">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold">404</CardTitle>
                    <CardDescription className="text-xl">Page Not Found</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        {"The page you're looking for doesn't exist or has been moved."}
                    </p>
                </CardContent>
                <CardFooter
                    className="flex justify-center">
                    <Button onClick={() => window.location.href = "/"}>
                        Return Home
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}