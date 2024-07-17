import EditProfile from "~/app/_components/dashboard/edit-profile";
import { HydrateClient } from "~/trpc/server";

export default function Profile() {
  return (
    <HydrateClient>
      <EditProfile />
    </HydrateClient>
  );
}
