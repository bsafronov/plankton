import { ProcessAsideNav } from "~/modules/process/ui/aside/nav";

type Props = {
  children?: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      <ProcessAsideNav />
      <main className="grow">{children}</main>
    </div>
  );
}
