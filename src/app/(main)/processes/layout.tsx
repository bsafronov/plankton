import { AsideProcessNav } from "~/modules/process/ui/aside-process-nav";

type Props = {
  children?: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      <AsideProcessNav />
      <main className="grow">{children}</main>
    </div>
  );
}
