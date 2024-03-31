import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseIds<T extends Record<string, string>>(
  obj: T,
): { [K in keyof T]: number } {
  const result: { [K in keyof T]: number } = {} as { [K in keyof T]: number };

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value) {
        result[key] = parseInt(value);
      }
    }
  }

  return result;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
