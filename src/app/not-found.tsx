'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-foreground">
            404
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Page Not Found
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Oops! It seems you&apos;ve wandered into uncharted territory. The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex justify-center">
            <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}