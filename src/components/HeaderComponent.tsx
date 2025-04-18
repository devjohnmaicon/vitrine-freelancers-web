"use client";

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
import {useRouter} from "next/navigation";

export default function HeaderComponent() {
    const router = useRouter();
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
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/minhas-vagas"
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Minhas vagas
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/sobre"
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Sobre
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="hidden items-center gap-4 lg:flex">
                        <Button variant="outline" onClick={() => router.push("/login")}>Login</Button>
                        <Button onClick={() => router.push("/register")}>Registre-se</Button>
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
                                        href="https://www.shadcnblocks.com"
                                        className="flex items-center gap-2"
                                    >
                                        <img
                                            src="https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"
                                            className="max-h-8"
                                            alt="Shadcn UI Navbar"
                                        />
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
                                    <a href="/minhas-vagas" className="font-medium">
                                        Minhas Vagas
                                    </a>
                                    <a href="/sobre" className="font-medium">
                                        Sobre
                                    </a>
                                </div>
                                <div className="mt-6 flex flex-col gap-4">
                                    <a href="/login"
                                       className="text-sm font-medium transition-colors text-center rounded-md py-2 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
                                        Login
                                    </a>
                                    <a href="/register"
                                       className="text-sm font-medium transition-colors text-center rounded-md py-2 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground bg-primary text-primary-foreground shadow hover:bg-primary/90">
                                        Registrar-se
                                    </a>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </header>
    );
};

