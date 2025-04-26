'use client'

import {MenuIcon} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet";
import {signOut, useSession} from "next-auth/react";
import {ExitIcon} from "@radix-ui/react-icons";


export default function HeaderComponent() {
    const {data: session} = useSession()

    const HeaderButtons = () => {
        return (
            <>
                {session?.user ? (
                        <Button variant="outline" onClick={() => signOut()}>Sair <ExitIcon/></Button>
                    )
                    : (
                        <>
                            <a href="/login"
                               className="text-sm font-medium transition-colors text-center rounded-md py-2 md:px-3 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
                                Login
                            </a>
                            <a href="/register"
                               className="text-sm font-medium transition-colors text-center rounded-md py-2 md:px-3 border border-input shadow-sm bg-primary hover:bg-primary/95 text-primary-foreground hover:text-zinc-300    ">
                                Registrar-se
                            </a>
                        </>
                    )

                }
            </>
        )
    }

    return (
        <header className="border-b py-4 px-2">
            <div className="container m-auto">
                <nav className="flex items-center justify-between">
                    <a
                        href="/"
                        className="flex items-center gap-2"
                    >
                        <img
                            src="https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"
                            className="max-h-8"
                            alt="Shadcn UI Navbar"
                        />
                        <span className="text-lg font-semibold tracking-tighter">Vitrine Freelancers</span>
                    </a>
                    <NavigationMenu className="hidden lg:block">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/"
                                    className={`${navigationMenuTriggerStyle()}  rounded-none border-b-4 border-zinc-700`}
                                >
                                    Início
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/vagas"
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Vagas
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            {session?.user &&
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        href="/minhas-vagas"
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        Minhas vagas
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            }
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/sobre"
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Sobre
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/contato"
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Contato
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="hidden items-center gap-4 lg:flex">
                        <HeaderButtons/>
                    </div>

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
                                    {session?.user &&
                                        <a href="/minhas-vagas" className="font-medium">
                                            Minhas Vagas
                                        </a>
                                    }
                                    <a href="/sobre" className="font-medium">
                                        Sobre
                                    </a>
                                    <a href="/contato" className="font-medium">
                                        contato
                                    </a>
                                </div>

                                <div className="mt-6 flex flex-col gap-4">
                                    <HeaderButtons/>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </header>
    )
        ;
};



