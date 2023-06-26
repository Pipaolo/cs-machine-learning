import React from "react";
import { cn } from "~/utils/utils";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GenericLayout = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-screen w-full flex-col bg-slate-950",
        className
      )}
      {...props}
    >
      <Button variant={"outline"} className="absolute left-4 top-4" asChild>
        <Link href={"/"}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Go Back to Home
        </Link>
      </Button>
      {children}
    </div>
  );
};
