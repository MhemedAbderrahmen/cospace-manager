"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Amenties, RoomType } from "@prisma/client";
import { Loader2, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  name: z.string().min(1),
  capacity: z.coerce.number(),
  type: z.nativeEnum(RoomType),
  amenties: z.array(z.nativeEnum(Amenties)),
});

const items = [
  {
    id: Amenties.COFFEE,
    label: Amenties.COFFEE,
  },
  {
    id: Amenties.INTERNET,
    label: Amenties.INTERNET,
  },
  {
    id: Amenties.PROJECTOR,
    label: Amenties.PROJECTOR,
  },
  {
    id: Amenties.SNACKS,
    label: Amenties.SNACKS,
  },
  {
    id: Amenties.TEA,
    label: Amenties.TV,
  },
  {
    id: Amenties.WATER,
    label: Amenties.WATER,
  },
  {
    id: Amenties.WHITEBOARD,
    label: Amenties.WHITEBOARD,
  },
] as const;

export const RoomCreateModal: React.FC = () => {
  const { data } = api.cospace.getCospace.useQuery();

  const utils = api.useUtils();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amenties: [],
      capacity: 0,
      type: "MEETING",
    },
  });

  const createRoom = api.room.create.useMutation({
    onMutate: () => {
      toast.message("Creating your room", { id: "isPending" });
    },
    onSuccess: async () => {
      await utils.room.invalidate();
      toast.dismiss("isPending");
      toast.success("Room created", {
        duration: 1000,
      });
      setIsOpen(false);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createRoom.mutateAsync(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <PlusIcon className="m-2" size={18} /> New Room
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a room</DialogTitle>
          <DialogDescription className="flex flex-col gap-4">
            Creating a room for coworking space - {data?.name}
          </DialogDescription>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room name</FormLabel>
                    <FormControl>
                      <Input placeholder="Room name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of the room
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <Input
                      type="number"
                      placeholder="Number of persons"
                      {...field}
                    />
                    <FormDescription>
                      Choose the Capacity of your room
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a room type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MEETING">Meeting Room</SelectItem>
                        <SelectItem value="REGULAR">Regular Room</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the type of your room
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amenties"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Amenties</FormLabel>
                      <FormDescription>
                        Select the items you want to display in the sidebar.
                      </FormDescription>
                    </div>
                    <div className="flex w-full flex-row flex-wrap gap-4">
                      {items.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="amenties"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={createRoom.isPending}>
                {createRoom.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
