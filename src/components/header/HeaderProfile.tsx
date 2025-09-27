import { ActionsLoggedProps } from "@/types/Header";
import Link from "next/link";

const HeaderProfile = ({ userName, userProfile }: ActionsLoggedProps) => {
  return (
    <div className="h-auto flex align-center space-x-3">
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
      <h3 className="font-medium text-lg">{userName}</h3>
    </div>
  );
};

export default HeaderProfile;
