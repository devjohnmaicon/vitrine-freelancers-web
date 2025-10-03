'use client';
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


export default  function HeaderNavigation({ session }: { session: any }) {
    let pathname = usePathname();
    if (pathname === '/vagas/minhas-vagas'){
        pathname = '/minhas-vagas'
    }

    return (
        <nav className="hidden lg:block">
            <Link href="/" 
                className={`${navigationMenuTriggerStyle()} ${pathname === '/' ? 'bg-zinc-50 border-b-4 border-zinc-400' : ''}`} 
            > Início </Link>
            <Link href="/vagas"
                className={`${navigationMenuTriggerStyle()} ${pathname === '/vagas' ? 'bg-zinc-50 border-b-4 border-zinc-400' : ''}`}> Vagas </Link>

            {session && <Link href="/vagas/minhas-vagas" 
                className={`${navigationMenuTriggerStyle()} ${pathname === '/minhas-vagas' ? 'bg-zinc-50 border-b-4 border-zinc-400' : ''}`}> Minhas vagas </Link>}
            <Link href="/sobre" 
                className={`${navigationMenuTriggerStyle()} ${pathname === '/sobre' ? 'bg-zinc-50 border-b-4 border-zinc-400' : ''}`}> Sobre </Link>
            <Link href="/contato" 
                className={`${navigationMenuTriggerStyle()} ${pathname === '/contato' ? 'bg-zinc-50 border-b-4 border-zinc-400' : ''}`}> Contato </Link>
        </nav>
    )
}
