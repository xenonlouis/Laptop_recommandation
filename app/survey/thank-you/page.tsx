'use client'; // Keep it client-side for simplicity, can use Link

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-2xl">Thank You!</CardTitle>
          <CardDescription>
            Your survey response has been submitted successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Your IT team will review your responses and prepare your setup.
          </p>
          <Link href="/">
            <Button>Return to Homepage</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
} 