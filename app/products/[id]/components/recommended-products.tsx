"use client";

import { useGetProductsQuery } from "@/features/api/apiSlice";
import { ProductCard } from "../../components/product-card";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface RecommendedProductsProps {
  currentProductId: number;
  category: string;
}

export function RecommendedProducts({ currentProductId, category }: RecommendedProductsProps) {
  const { data: products, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const recommendedProducts = products
    ?.filter(product => 
      product.id !== currentProductId && 
      product.category === category
    )
    .slice(0, 3);

  if (!recommendedProducts?.length) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">You might also like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}