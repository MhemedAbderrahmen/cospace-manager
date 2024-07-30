"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "~/components/skeleton-card";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { MEMBER_COSPACE, SEARCH_COSPACE } from "~/lib/paths";
import { api } from "~/trpc/react";

interface ICospaceItemProps {
  id: number;
  managerId: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  manager: {
    id: number;
    userId: string;
    username: string;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

function CospaceItem({ data }: Readonly<{ data: ICospaceItemProps }>) {
  const router = useRouter();
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <div className="text-lg font-semibold">{data.name}</div>
        <small className="text-sm font-medium leading-none text-muted-foreground">
          Space Manager @{data.manager.username}
        </small>
      </div>
      <Button size={"sm"} onClick={() => router.push(MEMBER_COSPACE + data.id)}>
        Details
      </Button>
    </div>
  );
}

export default function CospaceList() {
  const { data, isPending } = api.cospace.getAll.useQuery({
    limit: 5,
    offset: 0,
  });

  if (isPending) return <SkeletonCard />;
  return (
    <Card className="w-full md:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>Coworking Spaces Available</div>
        <Link href={SEARCH_COSPACE}>
          <Button variant={"link"}>View more</Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {data?.map((cospace, index) => (
          <CospaceItem data={cospace} key={index} />
        ))}
      </CardContent>
    </Card>
  );
}
