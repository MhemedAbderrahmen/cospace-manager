/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SkeletonImage } from "~/components/skeleton-image";
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

  const updateMedia = api.cospace.updateMedia.useMutation({
    onSuccess: async () => {
      await utils.cospace.invalidate();
    },
  });
  const createCospace = api.cospace.create.useMutation({
    onMutate: () => {
      toast.loading("Creating your cospace", { id: "isPending" });
    },
    onSuccess: async () => {
      toast.dismiss("isPending");
      toast.success("Cospace created", {
        duration: 1000,
      });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createCospace.mutateAsync(values);
  }

  if (isPending) return <SkeletonImage />;
  return (
    <div className="space-y-4">
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
        onClientUploadComplete={async (res) => {
          await updateMedia.mutateAsync({
            id: data?.id ?? 0,
            mediaType: "COVER_IMAGE",
            resourceUrl: res[0]?.url ?? "",
          });
          toast.dismiss("isPending");
          toast.success("Image uploaded", { duration: 1000 });
          form.setValue("coverImage", res[0]?.url ?? "");
        }}
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
          {/* <Button type="submit" disabled={createCospace.isPending}>
            {createCospace.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button> */}
        </form>
      </Form>
    </div>
  );
}
