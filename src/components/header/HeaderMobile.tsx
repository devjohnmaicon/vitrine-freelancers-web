import HeaderActions, {
  ActionsLogged,
  ActionsNotLogged,
} from "@/components/header/HeaderActions";
import HeaderProfile from "@/components/header/HeaderProfile";
import LogoutButton from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export default function HeaderMobile({ session }: { session: any }) {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon">
          <MenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent className="max-h-screen overflow-auto ">
        <SheetHeader>
          <SheetTitle>
            <a className="flex gap-2">
              <span className="text-2xl font-semibold tracking-tighter">
                Vitrine Freelancers
              </span>
            </a>
          </SheetTitle>
          {!!session && (
            <div className="border-y-2 py-2">
              <HeaderProfile
                userName={session?.user?.name}
                userProfile={session?.user?.image}
              />
            </div>
          )}
        </SheetHeader>

        <div className="flex flex-col p-4">
          <div className="flex flex-col gap-6 mb-2">
            <a href="/" className="font-medium">
              Inicio
            </a>
            <a href="/vagas" className="font-medium">
              Vagas
            </a>
            {!!session && (
              <a href="/vagas/minhas-vagas" className="font-medium">
                Minhas Vagas
              </a>
            )}
            <a href="/sobre" className="font-medium">
              Sobre
            </a>
            <a href="/contato" className="font-medium">
              contato
            </a>
          </div>

          {!!session ? <LogoutButton /> : <ActionsNotLogged />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
