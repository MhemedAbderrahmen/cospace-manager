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
import { Card, CardContent, CardHeader } from "~/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { UploadButton } from "~/lib/uploadthing";
import { api } from "~/trpc/react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(250),
  coverImage: z.string().url(),
  address: z.string().min(2).max(250),
  city: z.string().min(2).max(250),
  country: z.string().min(2).max(250),
  phone: z.string().min(2).max(250),
  email: z.string().min(2).max(250),
  website: z.string().min(2).max(250),
});

export default function CospaceGeneral() {
  const utils = api.useUtils();

  const { data, isPending } = api.cospace.getCospace.useQuery();
  const { data: cities } = api.countries.getCities.useQuery();

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
      address: "",
      city: "",
      country: "",
      phone: "",
      email: "",
      website: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name);
      form.setValue("description", data.description);
      form.setValue("coverImage", data.coverImage);
      form.setValue("address", data.addresse);
      form.setValue("city", data.city);
      form.setValue("country", data.country);
      form.setValue("email", data.email);
      form.setValue("phone", data.phone);
      form.setValue("website", data.website);
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
    <Card>
      <CardHeader>General</CardHeader>
      <CardContent className="space-y-2">
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
                    <Textarea placeholder="Cospacy description" {...field} />
                  </FormControl>
                  <FormDescription>
                    Write a good description; this will be displayed for all
                    members
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Cospacy address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tunisia">Tunisa</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities?.map((city, index) => (
                          <SelectItem value={city} key={index}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Cospacy phone" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="Cospacy website" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact E-mail" {...field} />
                  </FormControl>
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
      </CardContent>
    </Card>
  );
}
