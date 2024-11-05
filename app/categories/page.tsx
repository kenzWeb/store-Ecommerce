"use client";

import { useGetCategoriesQuery } from "@/features/api/apiSlice";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setFilters } from "@/features/products/productSlice";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag } from "lucide-react";

export default function CategoriesPage() {
  const { data: categories, isLoading } = useGetCategoriesQuery({});
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[200px] rounded-lg bg-muted animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category: string, index: number) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href="/products"
              onClick={() => dispatch(setFilters({ category }))}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    <CardTitle>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    Browse our collection of {category}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}