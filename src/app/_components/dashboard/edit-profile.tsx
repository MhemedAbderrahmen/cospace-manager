"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  bio: z.string().min(2).max(50),
});

export default function EditProfile() {
  const { data, isPending } = api.profile.getUserProfile.useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      bio: "",
    },
  });

  const updateProfile = api.profile.update.useMutation({
    onSuccess: async () => {
      toast.dismiss("pending");
      toast.success("Profile updated", {
        duration: 1000,
      });
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("username", data.username);
      form.setValue("bio", data.bio ?? "");
    }
  }, [data]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.message("Updating profile", { id: "pending" });
    updateProfile.mutate({
      id: data?.id ?? 0,
      data: values,
    });
  }

  if (isPending) return <div>Loading...</div>;
  return (
    <div className="flex w-full flex-col space-y-4 lg:w-1/2">
      <>
        <div className="text-lg font-semibold">Profile</div>
        <div className="text-sm">
          The king, seeing how much happier his subjects were, realized the
          error of his ways and repealed the joke tax.
        </div>
      </>
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Bio" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nulla dolore duis amet elit velit Lorem quis sint.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size={"sm"}
              disabled={updateProfile.isPending}
            >
              {updateProfile.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </form>
        </Form>
      </>
    </div>
  );
}
