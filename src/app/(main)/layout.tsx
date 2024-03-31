import { Navbar } from "~/widgets/navbar";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="h-screen min-h-screen pl-[56.8px]">{children}</main>
    </>
  );
}
