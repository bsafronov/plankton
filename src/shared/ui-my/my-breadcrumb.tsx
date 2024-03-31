import { Fragment, type ReactNode } from "react";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "../lib/utils";

export type Breadcrumb = {
  href?: string;
  children?: Breadcrumb[];
  title?: ReactNode;
};

type Props = {
  items: Breadcrumb[];
  className?: string;
};

export const MyBreadcrumb = ({ items, className }: Props) => {
  const isLast = (i: number) => {
    return items.length - 1 === i;
  };

  return (
    <Breadcrumb className={cn("border-b px-4 py-2", className)}>
      <BreadcrumbList>
        {items.map((item, i) => (
          <Fragment key={i}>
            <BreadcrumbItem>
              <BreadcrumbContent item={item} isLast={isLast(i)} />
            </BreadcrumbItem>
            {!isLast(i) && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

type BreadcrumbContentProps = {
  item: Props["items"][number];
  isLast: boolean;
};

const BreadcrumbContent = ({ item, isLast }: BreadcrumbContentProps) => {
  if (isLast) {
    return <BreadcrumbPage>{item.title}</BreadcrumbPage>;
  }

  if (item.children) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          {item.title ?? <BreadcrumbEllipsis />}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {item.children.map((item, i) => (
            <DropdownMenuItem key={i}>
              <Link href={item.href ?? ""}>{item.title}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <BreadcrumbLink asChild>
      <Link href={item.href ?? ""}>{item.title}</Link>
    </BreadcrumbLink>
  );
};
