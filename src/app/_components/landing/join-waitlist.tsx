"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

const FormSchema = z.object({
  email: z.string().email(),
});

export function JoinWaitlist() {
  const addToWaitList = api.waitlist.create.useMutation({
    onSuccess() {
      toast.success("You've been added to the waitlist!");
    },
    onError() {
      toast.error("Failed to add you to the waitlist. Please try again later.");
    },
    onMutate() {
      toast.loading("Adding you to the waitlist..", { id: "waitlist-loading" });
    },
    onSettled() {
      toast.dismiss("waitlist-loading");
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addToWaitList.mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-sm items-center space-x-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="john@doe.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Join our waitlist</Button>
      </form>
    </Form>
  );
}
