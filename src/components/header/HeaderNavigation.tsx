import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";

export default async function HeaderNavigation({ session }: { session: any }) {

    return (
        <nav className="hidden lg:block">
             <Link href="/" className={`${navigationMenuTriggerStyle()}`}> Início </Link>
            <Link href="/vagas"
                  className={`${navigationMenuTriggerStyle()}`}> Vagas </Link>
            {session && <Link href="/vagas/minhas-vagas" className={navigationMenuTriggerStyle()}> Minhas vagas </Link>}
            <Link href="/sobre" className={navigationMenuTriggerStyle()}> Sobre </Link>
            <Link href="/contato" className={navigationMenuTriggerStyle()}> Contato </Link>
        </nav>
    )
}
