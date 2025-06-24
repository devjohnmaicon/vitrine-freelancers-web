import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  open?: boolean;
}

const CardRoot = ({ children, open }: Props) => {
  const bgCard = open
    ? "bg-zinc-50 border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300"
    : "opacity-40 first:border-t-2 cursor-default hover:opacity-80 hover:bg-zinc-100";
  return (
    <div
      className={`w-full h-full bg-base-100 space-y-1 border-b-4 p-2 md:px-4 ${bgCard}`}
    >
      {children}
    </div>
  );
};

export default CardRoot;
