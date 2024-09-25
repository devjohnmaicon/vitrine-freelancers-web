import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import CardComponent from "@/components/CardComponent";

export default async function MyJobsPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="bg-slate-100 min-h-screen  max-w-screen-lg flex flex-col gap-3 m-auto p-4">
      <CardComponent />
      <CardComponent />
    </div>
  );
}
