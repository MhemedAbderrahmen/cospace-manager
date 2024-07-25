import { TabsList, TabsTrigger } from "~/components/ui/tabs";

export function SettingsTabsList() {
  return (
    <TabsList className="w-full justify-start">
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="notifications">Notification</TabsTrigger>
      <TabsTrigger value="payments">Payments</TabsTrigger>
      <TabsTrigger value="integrations">Integrations</TabsTrigger>
      <TabsTrigger value="privacy">Privacy</TabsTrigger>
    </TabsList>
  );
}
