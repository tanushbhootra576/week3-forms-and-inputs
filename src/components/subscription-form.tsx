"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Subscription } from "@/app/page";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  // allow common phone characters but disallow letters
  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true
      // only allow digits, spaces, +, -, (, ), and .
      return /^[0-9()+.\-\s]+$/.test(val)
    }, { message: "Phone number contains invalid characters." }),
  company: z.string().optional(),
})

type SubscriptionFormProps = {
  onNewSubscription: (subscription: Subscription) => void
}

export function SubscriptionForm({ onNewSubscription }: SubscriptionFormProps) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success!",
          description: "You have been subscribed to our newsletter.",
        })
        onNewSubscription(data)
        form.reset()
      } else {
        throw new Error(data.error || "Something went wrong during subscription.")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof Error
            ? error.message
            : "There was a problem with your request.",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Anup" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Joy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="tel"
                    pattern="[0-9()+.\-\s]+"
                    placeholder="+91-9996663330"
                    {...field}
                  />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
            type="submit"
            className="w-full h-12 text-base font-bold"
            disabled={form.formState.isSubmitting}
        >
            {form.formState.isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                "Subscribe Now"
            )}
        </Button>
      </form>
    </Form>
  )
}
