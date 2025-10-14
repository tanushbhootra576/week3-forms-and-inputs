"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SubscriptionForm } from "@/components/subscription-form";
import { SubscriberList } from "@/components/subscriber-list";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MailCheck, Users, Briefcase, Phone } from "lucide-react";

export type Subscription = {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  token: string;
};

export default function Home() {
  const [subscribers, setSubscribers] = useState<Subscription[]>([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    try {
      const storedSubscribers = localStorage.getItem("subscribers");
      if (storedSubscribers) {
        setSubscribers(JSON.parse(storedSubscribers));
      }
    } catch (error) {
      console.error("Failed to parse subscribers from localStorage", error);
    }
  }, []);

  const handleNewSubscription = (subscription: Subscription) => {
    setSubscribers((prevSubscribers) => {
      const newSubscribers = [
        subscription,
        ...prevSubscribers.filter((s) => s.email !== subscription.email),
      ].slice(0, 5);
      try {
        localStorage.setItem("subscribers", JSON.stringify(newSubscribers));
      } catch (error)        {
        console.error("Failed to save subscribers to localStorage", error);
      }
      return newSubscribers;
    });

    router.push(`/subscribed/${subscription.token}?firstName=${subscription.firstName}`);
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-4 antialiased">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-lg z-10">
        <Card className="border-2 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MailCheck className="h-6 w-6" />
            </div>
            <CardTitle className="mt-4 text-3xl font-bold tracking-tight">
              EmailSync Pro
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Join our professional network. Subscribe for exclusive updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubscriptionForm onNewSubscription={handleNewSubscription} />
          </CardContent>
        </Card>

        <div className="text-center mt-6">
            <Button asChild variant="outline" className="shadow-md">
                <Link href="/users">
                    <Users className="mr-2" /> View Users
                </Link>
            </Button>
        </div>

        {isClient && <SubscriberList subscribers={subscribers} />}
      </div>
    </main>
  );
}
