"use client";
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
];

export default function HeaderNavigation({ session }: { session: any }) {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navLinks(session).map(({ href, label }) => {
        const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-950 text-white"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
