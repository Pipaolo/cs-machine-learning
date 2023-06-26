import Link from "next/link";
import { type ReactNode } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/utils/utils";

interface Props {
  className?: string;
  title: string;
  description: string;
  content: ReactNode;
  link: string;
}
const HomeProjectCard = ({ className, ...props }: Props) => {
  const { description, link, title, content } = props;
  return (
    <Card
      className={cn(
        "animate-in fade-in duration-1000 ease-in-out fill-mode-backwards",
        className
      )}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="flex w-full items-center justify-center">
        <Link href={link} className="w-full">
          <Button className="w-full">Visit</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default HomeProjectCard;
