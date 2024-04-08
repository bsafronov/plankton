import { CreateProductDialog } from "~/modules/product/ui/create-product/dialog";
import { ProductSearchableList } from "~/modules/product/ui/product-searchable-list";
import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";

export default async function Page() {
  return (
    <>
      <MyBreadcrumb
        items={[
          {
            title: "Панель управления",
            href: "/admin",
          },
          {
            title: "Изделия",
            href: "/admin/products",
          },
        ]}
      />
      <div className="space-y-4 p-4">
        <CreateProductDialog />
        <ProductSearchableList />
      </div>
    </>
  );
}
