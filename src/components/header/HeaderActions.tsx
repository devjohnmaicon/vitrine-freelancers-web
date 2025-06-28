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
import { auth } from "../../../auth";

export default async function HeaderActions() {
  const session = await auth();
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

type ActionsLoggedProps = {
  userName: string | null | undefined;
  userProfile: string | null | undefined;
};

const ActionsLogged = ({ userName, userProfile }: ActionsLoggedProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center space-x-3">
            <Link href="/perfil">
              <img
                src={
                  userProfile ??
                  "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"
                }
                className="max-h-8 rounded-full"
                alt="User Avatar"
              />
            </Link>
            <h3 className="font-medium text-md">{userName}</h3>
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

const ActionsNotLogged = () => {
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
