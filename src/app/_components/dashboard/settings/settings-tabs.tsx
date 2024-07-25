"use client";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "~/components/ui/tabs";
import { Payments } from "./payments";
import { SettingsTabsList } from "./tabs-list";

export function SettingsTabs() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <Tabs defaultValue={tab ?? "account"}>
      <SettingsTabsList />
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="payments">
        <Payments />
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}
