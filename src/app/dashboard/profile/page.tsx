import EditProfile from "~/app/_components/edit-profile";
import { api, HydrateClient } from "~/trpc/server";

export default function Profile() {
  void api.profile.getUserProfile.prefetch();

  return (
    <HydrateClient>
      <EditProfile />
    </HydrateClient>
  );
}
