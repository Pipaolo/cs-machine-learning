import React from "react";
import { cn } from "~/utils/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GenericLayout = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full min-h-screen w-full flex-col bg-slate-950",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
