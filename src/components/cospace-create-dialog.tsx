"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
});

export const CospaceCreateModal: React.FC = () => {
  const utils = api.useUtils();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const createCospace = api.cospace.create.useMutation({
    onMutate: () => {
      toast.message("Creating your cospace", { id: "isPending" });
    },
    onSuccess: async () => {
      await utils.cospace.invalidate();
      await utils.profile.invalidate();
      toast.dismiss("isPending");
      toast.success("Cospace created", {
        duration: 1000,
      });
      setIsOpen(false);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createCospace.mutateAsync(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="w-full" variant={"outline"}>
          <PlusIcon className="m-2" size={18} /> Create a new cospace
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get started</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Cospacy" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your coworking space name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Cospacy descrition" {...field} />
                      </FormControl>
                      <FormDescription>
                        Write a good description; this will be displayed for all
                        members
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={createCospace.isPending}>
                  {createCospace.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
