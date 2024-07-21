"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (onboarding: {
  username: string;
  role: "MANAGER" | "MEMBER";
}) => {
  const { userId } = auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  try {
    const res = await clerkClient().users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        username: onboarding.username,
        role: onboarding.role,
      },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};
