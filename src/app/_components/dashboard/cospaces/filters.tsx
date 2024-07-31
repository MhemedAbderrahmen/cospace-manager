import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
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
import { api } from "~/trpc/react";

const formSchema = z.object({
  username: z.string().optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  isFeatured: z.boolean().optional(),
});

export function Filters({ pending }: { pending: boolean }) {
  // const { data: countries } = api.countries.getAllCountries.useQuery();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { data: cities } = api.countries.getCities.useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      address: "",
      country: "",
      city: "",
      email: "",
      phone: "",
      website: "",
      isFeatured: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams(searchParams);

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        params.set(key, value as string);
      } else {
        params.delete(key);
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>Workspace Filters</CardHeader>
          <CardContent className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="john@doe.com" {...field} />
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+216 95 178 394" {...field} />
                  </FormControl>
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
                    <Input placeholder="Address" {...field} />
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
                        <SelectItem value={"tunisia"}>Tunisia</SelectItem>
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
          </CardContent>
          <CardFooter className="flex flex-row justify-end">
            <div className="space-x-2">
              <Button
                variant="ghost"
                onClick={() => {
                  form.reset();
                  form.handleSubmit(onSubmit);
                }}
              >
                Reset
              </Button>
              <Button type="submit" disabled={pending}>
                {pending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Search
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
