"use client";

import { useGetProductQuery } from "@/features/api/apiSlice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { Loader2, Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { RecommendedProducts } from "./components/recommended-products";
import { ProductReviews } from "./components/product-reviews";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import { toast } from "sonner";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { data: product, isLoading, error } = useGetProductQuery(params.id);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
    toast.success("Added to cart!", {
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{product.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span className="text-sm">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              </div>
              <p className="text-2xl font-bold mb-4">
                {formatPrice(product.price)}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
            </div>
            <div className="flex gap-4">
              {product.color && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Color</h3>
                  <Badge variant="outline">{t(`colors.${product.color}`)}</Badge>
                </div>
              )}
              {product.size && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Size</h3>
                  <Badge variant="outline">{t(`sizes.${product.size}`)}</Badge>
                </div>
              )}
            </div>
            <AddToCartButton onAdd={handleAddToCart} className="w-full" />
          </div>
        </div>
      </Card>
      
      <ProductReviews productId={product.id} />
      
      <RecommendedProducts 
        currentProductId={product.id} 
        category={product.category} 
      />
    </div>
  );
}