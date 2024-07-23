"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Room } from "@prisma/client";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { format } from "date-fns";
import dayjs from "dayjs";
import { BookOpen, CalendarIcon, CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { BookingCartDialog } from "~/components/booking-cart-dialog";
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
import { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT } from "~/lib/constants";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export interface SlotType {
  id: number;
  roomId: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  room: Room;
  isBooked: boolean;
}

const FormSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
});

export function CalendarForm({
  handleSubmit,
}: {
  handleSubmit: (date: Date) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleSubmit(data.date);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-row items-center gap-2"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
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
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlots, setSelectedSlots] = useState<SlotType[]>([]);
  const { data, mutate, isPending } =
    api.availability.availableSlotsByDate.useMutation();

  const addSlot = (slot: SlotType) => {
    setSelectedSlots((prev) => [...prev, slot]);
  };

  const submit = (date: Date) => setSelectedDate(date);

  useEffect(() => {
    if (selectedDate)
      mutate({
        roomId: params.slug,
        date: selectedDate.toDateString(),
      });
  }, [mutate, params.slug, selectedDate]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <CalendarForm handleSubmit={(date: Date) => submit(date)} />
        <BookingCartDialog
          next={() =>
            selectedDate &&
            mutate({
              roomId: params.slug,
              date: selectedDate.toDateString(),
            })
          }
          items={selectedSlots}
          setItems={setSelectedSlots}
          roomId={params.slug}
        />
      </div>
      {isPending ? (
        <SkeletonLine />
      ) : (
        <div className="flex w-full flex-row flex-wrap gap-4">
          {data?.length === 0 && <div>No slots available for this date</div>}
          {data?.map((slot) => (
            <Card key={slot.id}>
              <CardHeader className="gap-2">
                <div className="flex flex-row items-center justify-between space-x-2">
                  <div>{dayjs(slot.date).format(DEFAULT_DATE_FORMAT)}</div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size={"icon"}
                        className="size-8"
                        disabled={selectedSlots.includes(slot)}
                        onClick={() => {
                          addSlot(slot);

                          toast.success("Slot added to cart", {
                            duration: 4000,
                          });
                        }}
                      >
                        {selectedSlots.includes(slot) ? (
                          <CheckIcon size={18} />
                        ) : (
                          <BookOpen size={18} />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Book this slot</TooltipContent>
                  </Tooltip>
                </div>
                <>{dayjs(slot.startTime).format(DEFAULT_TIME_FORMAT)}</>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
