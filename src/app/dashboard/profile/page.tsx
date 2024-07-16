import EditProfile from "~/app/_components/edit-profile";
import { api } from "~/trpc/server";

export default function Profile() {
  void api.profile.getUserProfile.prefetch();

  return (
    <div>
      <EditProfile />
    </div>
  );
}
