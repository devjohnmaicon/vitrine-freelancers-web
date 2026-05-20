import { Header } from "@/components/header";
import { auth } from "../../../auth";

export default async function HeaderComponent() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Header.Identity />
        <Header.Navigation session={session} />
        <Header.Actions session={session} />
        <Header.Mobile session={session} />
      </div>
    </header>
  );
}
