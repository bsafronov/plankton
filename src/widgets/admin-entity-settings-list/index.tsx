import {
  Building,
  Cog,
  GraduationCap,
  LayoutList,
  Plane,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

type NavItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

const items: NavItem[] = [
  {
    title: "Шаблоны",
    description: "Настройка этапов, связей и полей процессов",
    href: "/admin/templates",
    icon: Cog,
  },
  {
    title: "Отделы",
    description: "Настройка отделов пользователей",
    href: "/admin/departments",
    icon: Building,
  },
  {
    title: "Должности",
    description: "Настройка должностей пользователей",
    href: "/admin/positions",
    icon: GraduationCap,
  },
  {
    title: "Перечисления",
    description:
      "Настройка предустановленных списков для использования в селекторах",
    href: "/admin/enums",
    icon: LayoutList,
  },
  {
    title: "Изделия",
    description: "Настройка изделий, производимых предприятием",
    href: "/admin/products",
    icon: Plane,
  },
];

export const AdminEntitySettingsList = () => {
  return (
    <div className="flex flex-col gap-2">
      {items.map(({ description, href, icon: Icon, title }) => (
        <Link href={href} key={href}>
          <div className="flex gap-2 rounded-md border p-4 hover:bg-muted/20">
            <Icon />
            <div className="flex flex-col">
              <h5 className="font-semibold">{title}</h5>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
