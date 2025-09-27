import HeaderProfile from "@/components/header/HeaderProfile";
import LogoutButton from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ActionsLoggedProps } from "@/types/Header";
import Link from "next/link";

export default async function HeaderActions({ session }: { session?: any }) {
  return (
    <div className="hidden items-center gap-4 lg:flex">
      {!!session ? (
      <ActionsLogged
        userName={session?.user?.name}
        userProfile={session?.user?.image}
      />
      ) : (
      <ActionsNotLogged />
      )}
    </div>
  );
}


export const ActionsLogged = ({
  userName,
  userProfile,
}: ActionsLoggedProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="border-2 border-zinc-100 py-2 flex align-center">
            <HeaderProfile userName={userName} userProfile={userProfile} />
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid w-[140px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <LogoutButton />
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const ActionsNotLogged = () => {
  return (
    <div className="flex flex-col lg:flex-row mt-4 lg:mt-0 gap-2">
      <Button asChild variant="outline">
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/register">Registrar-se</Link>
      </Button>
    </div>
  );
};
