"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SubscriberList } from "@/components/subscriber-list";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

type ApiResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};

export type Subscription = {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  token: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscribers, setSubscribers] = useState<Subscription[]>([]);
  const [isClient, setIsClient] = useState(false);

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

    async function fetchUsers() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://reqres.in/api/users", {
          headers: {
            'x-api-key': 'reqres-free-v1'
          }
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch users. Status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();
        if (data && data.data) {
          setUsers(data.data);
        } else {
            throw new Error("Invalid API response format");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 antialiased">
      <div className="w-full max-w-4xl">
        <div className="mb-4">
            <Button asChild variant="outline">
                <Link href="/">
                    <ArrowLeft className="mr-2" /> Back to Home
                </Link>
            </Button>
        </div>
        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">
              API Users
            </CardTitle>
            <CardDescription>
              A list of users from the reqres.in API.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="flex flex-col items-center p-4">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <Skeleton className="h-4 w-32 mt-4" />
                    <Skeleton className="h-4 w-40 mt-2" />
                  </Card>
                ))}
              </div>
            )}
            {error && <p className="text-destructive text-center font-semibold p-4">{error}</p>}
            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <Card key={user.id} className="text-center p-4 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg">
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                      <AvatarImage src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                      <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">{`${user.first_name} ${user.last_name}`}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <div className="mt-8">
            {isClient && <SubscriberList subscribers={subscribers} />}
        </div>
      </div>
    </main>
  );
}
