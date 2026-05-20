import React from "react";

interface CardActionsProps {
  children?: React.ReactNode;
}

const CardActions = ({ children }: CardActionsProps) => (
  <div className="flex justify-end items-center gap-2 mt-3 pt-3 border-t border-slate-100">
    {children}
  </div>
);

export default CardActions;
