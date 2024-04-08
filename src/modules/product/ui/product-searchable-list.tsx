import { api } from "~/shared/lib/trpc/server";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/shared/ui/command";
import { UpdateProductDialog } from "./update-product/dialog";
import { DeleteProductDialog } from "./delete-product/dialog";

export const ProductSearchableList = async () => {
  const products = await api.product.findMany({});

  return (
    <Command>
      <CommandInput />
      <CommandList className="p-1">
        <CommandEmpty />
        {products.map((product) => (
          <CommandItem key={product.id}>
            <div className="flex w-full justify-between">
              {product.name}
              <div className="flex items-center gap-2">
                <UpdateProductDialog product={product} />
                <DeleteProductDialog productId={product.id} />
              </div>
            </div>
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
};
