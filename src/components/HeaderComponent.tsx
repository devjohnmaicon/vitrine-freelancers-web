import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {MenuIcon} from "lucide-react";
import {auth} from "../../auth";
import Link from "next/link";
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";
import LogoutButton from "@/components/LogoutButton";


export default async function HeaderComponent() {
    return (
        <header className="border-b py-4 px-2">
            <div className="container m-auto">
                <nav className="flex items-center justify-between ">
                    <HeaderIdentity/>
                    <HeaderNavigation/>

                    <div className="hidden items-center gap-4 lg:flex">
                        <HeaderActions/>
                    </div>

                    <HeaderMobile/>
                </nav>
            </div>
        </header>
    )
        ;
};


const HeaderIdentity = () => {
    return (
        <a
            href="/"
            className="flex items-center gap-2"
        >
            {/*<img*/}
            {/*    src="https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"*/}
            {/*    className="max-h-8"*/}
            {/*    alt="Shadcn UI Navbar"*/}
            {/*/>*/}
            <span className="text-lg font-semibold tracking-tighter">Vitrine Freelancers</span>
        </a>
    )
}

const HeaderNavigation = async () => {
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

const HeaderMobile = () => {
    return (
        <Sheet>
            <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                    <MenuIcon className="h-4 w-4"/>
                </Button>
            </SheetTrigger>

            <SheetContent className="max-h-screen overflow-auto">
                <SheetHeader>
                    <SheetTitle>
                        <a
                            className="flex items-center gap-2"
                        >
                            {/*<img*/}
                            {/*    src="https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"*/}
                            {/*    className="max-h-8"*/}
                            {/*    alt="Vitrine UI Navbar"*/}
                            {/*/>*/}
                            <span className="text-lg font-semibold tracking-tighter">Vitrine Freelancers</span>
                        </a>
                    </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-4">
                    <div className="flex flex-col gap-6">
                        <a href="/" className="font-medium">
                            Inicio
                        </a>
                        <a href="/vagas" className="font-medium">
                            Vagas
                        </a>
                        {/*{session?.user &&*/}
                        <a href="/vagas/minhas-vagas" className="font-medium">
                            Minhas Vagas
                        </a>
                        {/*}*/}
                        <a href="/sobre" className="font-medium">
                            Sobre
                        </a>
                        <a href="/contato" className="font-medium">
                            contato
                        </a>
                    </div>

                    <HeaderActions/>
                </div>
            </SheetContent>
        </Sheet>
    )
}


const HeaderActions = async () => {
    const session = await auth()
    const userLogged = !!session;
    return (
        <>
            {userLogged && <LogoutButton/>}
            {
                !userLogged &&
                <div className='flex flex-col lg:flex-row mt-4 lg:mt-0 gap-2'>
                    <Button asChild variant='outline'>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/register">Registrar-se</Link>
                    </Button>

                </div>
            }
        </>
    )
}
