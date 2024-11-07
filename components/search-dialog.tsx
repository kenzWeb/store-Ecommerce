"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setFilters } from "@/features/products/productSlice";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useGetProductsQuery } from "@/features/api/apiSlice";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: products, isLoading } = useGetProductsQuery();
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredProducts = React.useMemo(() => {
    if (!products || !searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const handleSelect = (productId: string) => {
    dispatch(setFilters({ search: "" }));
    onOpenChange(false);
    router.push(`/products/${productId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 p-0">
        <VisuallyHidden>
          <DialogTitle>Search Products</DialogTitle>
        </VisuallyHidden>
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder={t("search")}
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-12"
          />
          <CommandList className="max-h-[500px] overflow-y-auto">
            <CommandEmpty className="py-6 text-center text-sm">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("Loading...")}
                </div>
              ) : (
                t("No results found.")
              )}
            </CommandEmpty>
            <CommandGroup heading="Products">
              {filteredProducts.map((product) => (
                <CommandItem
                  key={product.id}
                  value={product.title}
                  onSelect={() => handleSelect(product.id.toString())}
                  className="flex items-center gap-4 px-4 py-2"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{product.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.category}
                    </p>
                    <p className="text-sm font-semibold">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}