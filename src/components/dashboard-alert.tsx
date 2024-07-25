import { CheckIcon, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function DashboardAlert({
  title,
  message,
  type,
}: {
  title: string;
  message: string;
  type: "success" | "warning";
}) {
  return (
    <Alert>
      <TriangleAlert className="h-4 w-4" />
      {type === "success" ?? <CheckIcon className="h-4 w-4" />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
