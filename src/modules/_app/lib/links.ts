import { type ReactNode } from "react";

export const links = {
  adminPanel: {
    index: {
      title: "Панель управления",
      href: "/admin",
    },
    processes: {
      index: {
        title: "Процессы",
        href: "/admin/processes",
      },
      id: (title: ReactNode, id: ID) => ({
        title,
        href: `/admin/processes/${id}`,
      }),
    },
    templates: {
      index: {
        title: "Шаблоны",
        href: "/admin/templates",
      },
      id: (title: ReactNode, id: ID) => ({
        title,
        href: `/admin/templates/${id}`,
      }),
    },
    departments: {
      index: {
        title: "Отделы",
        href: "/admin/departments",
      },
      id: (title: ReactNode, id: ID) => ({
        title,
        href: `/admin/departments/${id}`,
      }),
    },
    enums: {
      index: {
        title: "Перечисления",
        href: "/admin/enums",
      },
      id: (title: ReactNode, id: ID) => ({
        title,
        href: `/admin/enums/${id}`,
      }),
    },
    positions: {
      index: {
        title: "Должности",
        href: "/admin/positions",
      },
      id: (title: ReactNode, id: ID) => ({
        title,
        href: `/admin/positions/${id}`,
      }),
    },
    products: {
      index: {
        title: "Изделия",
        href: "/admin/products",
      },
      id: (title: ReactNode, id: ID) => ({
        title,
        href: `/admin/products/${id}`,
      }),
    },
  },
  processes: {
    index: {
      title: "Процессы",
      href: "/processes",
    },
    id: (title: ReactNode, id: ID) => ({
      title,
      href: `/processes/${id}`,
    }),
  },
} as const;
