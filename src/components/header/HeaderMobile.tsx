"use client";
import { ActionsNotLogged } from "@/components/header/HeaderActions";
import LogoutButton from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = (session: any) => [
  { href: "/", label: "Início" },
  { href: "/vagas", label: "Vagas" },
  ...(session ? [{ href: "/vagas/minhas-vagas", label: "Minhas Vagas" }] : []),
  ...(session && !session?.user?.companyId
    ? [{ href: "/vagas/minhas-candidaturas", label: "Candidaturas" }]
    : []),
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function HeaderMobile({ session }: { session: any }) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon" className="border-slate-200">
          <MenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-72">
        <SheetHeader className="pb-4 border-b border-slate-100">
          <SheetTitle className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-blue-950 flex items-center justify-center">
              <span className="text-white text-xs font-bold">VF</span>
            </div>
            <span className="font-bold text-slate-900">Vitrine Freelancers</span>
          </SheetTitle>
          {session && (
            <div className="flex items-center gap-2 pt-2 text-sm text-slate-600">
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                <User size={14} className="text-slate-500" />
              </div>
              <span className="font-medium truncate">{session?.user?.name ?? "Usuário"}</span>
            </div>
          )}
        </SheetHeader>

        <nav className="flex flex-col gap-1 mt-4">
          {navLinks(session).map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <a
                key={href}
                href={href}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-950 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <div className="mt-6 pt-4 border-t border-slate-100">
          {session ? (
            <LogoutButton />
          ) : (
            <ActionsNotLogged />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
