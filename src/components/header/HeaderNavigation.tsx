import Link from "next/link";
import { auth } from "../../../auth";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default async function HeaderNavigation() {
    const session = await auth()

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
