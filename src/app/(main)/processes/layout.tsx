import { AsideProcessList } from "~/modules/process/ui/aside-process-list";

type Props = {
  children?: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      <AsideProcessList />
      <main className="grow">{children}</main>
    </div>
  );
}
