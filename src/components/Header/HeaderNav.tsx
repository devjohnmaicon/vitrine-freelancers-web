import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {auth} from "../../../auth";
import {headers} from "next/headers";

export default async function HeaderNav() {
    const session = await auth()
    // const headerList = headers();
    // const pathname = headerList.get("x-current-path");
    // console.log('pathname', pathname)
    // const isActive = (path: string) => pathname === path;

    return (
        <nav className="hidden lg:block">
            <Link href="/" className={`${navigationMenuTriggerStyle()}`}> Início </Link>
            <Link href="/vagas"
                  className={`${navigationMenuTriggerStyle()}`}> Vagas </Link>
            {session && <Link href="/minhas-vagas" className={navigationMenuTriggerStyle()}> Minhas vagas </Link>}
            <Link href="/sobre" className={navigationMenuTriggerStyle()}> Sobre </Link>
            <Link href="/contato" className={navigationMenuTriggerStyle()}> Contato </Link>
        </nav>
    )
}