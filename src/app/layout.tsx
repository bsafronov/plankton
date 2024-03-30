import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/shared/lib/trpc/react";
import { ThemeProvider } from "~/shared/ui/theme-provider";
import "./globals.css";
import { Toaster } from "~/shared/ui/sonner";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Template",
  description: "Next.js template",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <ThemeProvider>
            <Toaster />
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
