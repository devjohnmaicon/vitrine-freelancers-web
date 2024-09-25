import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import CardComponent from "@/components/CardComponent";

export default async function JobsPage() {
  const session = await auth();
  // if (!session) {
  //   redirect("/login");
  // }
  return (
    <div className="bg-slate-100 min-h-screen  max-w-screen-md flex flex-col gap-3 m-auto p-4 rounded-sm">
      <CardComponent />
      <CardComponent />
      <CardComponent />
      <CardComponent />
      <CardComponent />
    </div>
  );
}
