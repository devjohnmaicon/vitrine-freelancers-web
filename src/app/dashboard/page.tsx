import { redirect } from "next/navigation";
import { auth } from "../../../auth";

export default async function Dashboard() {
  const session = await auth();
  // if (!session) {
  //   redirect("/login");
  // }
  return (
    <div className="flex flex-col gap-3 h-screen items-center justify-center">
      <h2>Dashboard</h2>
    </div>
  );
}
