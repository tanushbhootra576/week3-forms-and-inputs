"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { User, Briefcase } from "lucide-react"
import { Subscription } from "@/app/page";
import { Badge } from "@/components/ui/badge";

type SubscriberListProps = {
  subscribers: Subscription[]
}

export function SubscriberList({ subscribers }: SubscriberListProps) {
  const validSubscribers = subscribers.filter(s => s && s.token);

  if (validSubscribers.length === 0) {
    return (
        <Card className="mt-8 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-xl">Recent Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-center py-4">No subscribers yet. Be the first!</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="mt-8 shadow-lg bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">Recent Subscribers</CardTitle>
        <CardDescription>
            Here are the last 5 people who subscribed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <AnimatePresence>
            {validSubscribers.map((subscriber, index) => (
              <motion.li
                key={subscriber.token}
                className="flex items-center gap-4 p-2 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full text-primary">
                    <User className="h-5 w-5" />
                </div>
                <div className="flex-grow">
                    <p className="font-semibold text-foreground">{`${subscriber.firstName} ${subscriber.lastName}`}</p>
                    <p className="text-sm text-muted-foreground">{subscriber.email}</p>
                </div>
                {subscriber.company && (
                    <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {subscriber.company}
                    </Badge>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </CardContent>
    </Card>
  )
}
