'use client';

import { useSearchParams, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SubscribedPage() {
  const params = useParams<{ token: string }>();
  const searchParams = useSearchParams();
  const firstName = searchParams.get('firstName');
  const token = params.token;

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 antialiased">
      <div className="w-full max-w-md">
        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center items-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
              <CheckCircle className="h-8 w-8" />
            </div>
            <CardTitle className="mt-4 text-3xl font-bold tracking-tight">
              Subscription Confirmed!
            </CardTitle>
            <CardDescription className="text-muted-foreground pt-2">
              Thank you for subscribing, {firstName || 'friend'}!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-muted/50 rounded-lg p-4 my-4">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Your Subscription Token
              </p>
              <p className="text-sm font-mono break-all mt-2 text-foreground p-2 bg-background rounded">
                {token}
              </p>
            </div>
             <Button asChild className="mt-4">
               <Link href="/">Back to Home</Link>
             </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
