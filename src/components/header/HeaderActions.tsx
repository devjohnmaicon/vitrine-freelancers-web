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
import Link from "next/link";

export default async function HeaderActions({ session }: { session?: any }) {
  return (
    <div className="hidden lg:flex items-center gap-2">
      {session ? (
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
}: {
  userName?: string;
  userProfile?: string;
}) => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="h-9 px-3 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-sm font-medium">
          <HeaderProfile userName={userName} userProfile={userProfile} />
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-40 p-1">
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

export const ActionsNotLogged = () => (
  <div className="flex items-center gap-2">
    <Button asChild variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
      <Link href="/login">Entrar</Link>
    </Button>
    <Button asChild size="sm" className="bg-blue-950 hover:bg-blue-900 text-white">
      <Link href="/register">Criar conta</Link>
    </Button>
  </div>
);
