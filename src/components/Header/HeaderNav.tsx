import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import React from "react";

export default function HeaderNav() {
    return (
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
    )
}