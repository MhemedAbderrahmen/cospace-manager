/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SkeletonImage } from "~/components/skeleton-image";
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
import { UploadButton } from "~/lib/uploadthing";
import { api } from "~/trpc/react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(250),
  coverImage: z.string().url(),
});

export default function CospaceGeneral() {
  const utils = api.useUtils();

  const { data, isPending } = api.cospace.getCospace.useQuery();

  const updateMedia = api.cospace.updateMedia.useMutation({
    onSuccess: async () => {
      await utils.cospace.invalidate();
    },
  });

  const updateCospace = api.cospace.update.useMutation({
    onMutate: () => {
      toast.loading("Update your cospace", { id: "isPending" });
    },
    onSuccess: async () => {
      toast.dismiss("isPending");
      toast.success("Cospace updated", {
        duration: 1000,
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      coverImage: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name);
      form.setValue("description", data.description);
      form.setValue("coverImage", data.coverImage);
    }
  }, [data, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateCospace.mutateAsync({
      ...values,
      id: data?.id ?? 0,
    });
  }

  async function handleImageUploadComplete(url: string) {
    await updateMedia.mutateAsync({
      id: data?.id ?? 0,
      resourceType: "COVER_IMAGE",
      resourceUrl: url,
    });
    toast.dismiss("isPending");
    toast.success("Image uploaded", { duration: 1000 });
    form.setValue("coverImage", url);
  }

  if (isPending) return <SkeletonImage />;
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">General</h2>
      <Image
        src={data?.coverImage ?? ""}
        alt="cospace cover"
        className="h-44 w-full rounded-md object-cover"
        width={1080}
        height={1920}
      />
      <UploadButton
        endpoint="imageUploader"
        onUploadBegin={() =>
          toast.loading("Uploading image", { id: "isPending" })
        }
        onClientUploadComplete={(res) =>
          handleImageUploadComplete(res[0]?.url ?? "")
        }
        onUploadError={(error: Error) => {
          toast.dismiss("isPending");
          toast.error(error.message, { duration: 3000 });
        }}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cospace name</FormLabel>
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
                <FormLabel>Cospace description</FormLabel>
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
          <div className="flex justify-end">
            <Button type="submit" disabled={updateCospace.isPending}>
              {updateCospace.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Update cospace
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}