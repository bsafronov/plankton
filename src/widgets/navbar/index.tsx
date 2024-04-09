"use client";

import { AppWindow, Cog, FileText, MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/shared/ui/button";
import { ThemeSwitcher } from "~/shared/ui/theme-switcher";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/shared/ui/tooltip";

const navItems = [
  {
    href: "/",
    title: "Главная",
    icon: AppWindow,
  },
  {
    href: "/admin",
    title: "Панель управления",
    icon: Cog,
  },
  {
    href: "/processes",
    title: "Процессы",
    icon: FileText,
  },
  {
    href: "/messages",
    title: "Сообщения",
    icon: MessageCircleIcon,
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 top-0 flex h-full flex-col border-r p-2">
      <div className="flex flex-col gap-1">
        <TooltipProvider>
          {navItems.map(({ href, icon: Icon, title }) => (
            <Tooltip key={href}>
              <TooltipTrigger asChild>
                <Button
                  variant={pathname === href ? "secondary" : "ghost"}
                  size={"icon"}
                  asChild
                  key={href}
                >
                  <Link href={href}>
                    <Icon />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">{title}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      <div className="mt-auto">
        <ThemeSwitcher />
      </div>
    </nav>
  );
};
