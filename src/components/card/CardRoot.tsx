import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  open?: boolean;
}

const CardRoot = ({ children, open }: Props) => {
  return (
    <div
      className={`w-full bg-white rounded-xl border border-slate-200 p-4 md:p-5 transition-all duration-200 ${
        open
          ? "hover:shadow-md hover:border-slate-300"
          : "opacity-50 cursor-default"
      }`}
    >
      {children}
    </div>
  );
};

export default CardRoot;
