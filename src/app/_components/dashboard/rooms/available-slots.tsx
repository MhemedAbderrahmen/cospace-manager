"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { format } from "date-fns";
import dayjs from "dayjs";
import { BookOpen, CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SkeletonLine } from "~/components/skeleton-line";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Card, CardHeader } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Tooltip, TooltipContent } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

const FormSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
});

export function CalendarForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("🚀 ~ onSubmit ~ data:", data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row items-center gap-2"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date: Date) => date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
      </form>
    </Form>
  );
}

export default function AvailableSlots({
  params,
}: {
  params: { slug: number };
}) {
  const { data, isPending } = api.availability.getAvailableSlots.useQuery({
    roomId: params.slug,
    // start date is today and end date is tomorrow
    startDate: "2024-07-19",
    endDate: "2024-07-20",
  });
  if (isPending) return <SkeletonLine />;
  return (
    <div className="flex w-full flex-col gap-4">
      <CalendarForm />
      <div className="flex w-full flex-row flex-wrap gap-4">
        {data?.map((slot) => (
          <Card key={slot.id}>
            <CardHeader className="gap-2">
              <div className="flex flex-row items-center justify-between space-x-2">
                <div>{dayjs(slot.date).format("MMMM D, YYYY")}</div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size={"icon"} className="size-8">
                      <BookOpen size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Book this slot</TooltipContent>
                </Tooltip>
              </div>
              <>{dayjs(slot.startTime).format("h:mm A")}</>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
