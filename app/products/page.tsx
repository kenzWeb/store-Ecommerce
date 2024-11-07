'use client';

import { ProductsFilter } from './components/products-filter';
import { ProductCard } from './components/product-card';
import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '@/features/api/apiSlice';
import { selectFilteredProducts } from '@/features/products/productSlice';
import { useTranslation } from 'react-i18next';

export default function ProductsPage() {
  const { data, error, isLoading } = useGetProductsQuery();
  const filteredProducts = useSelector(selectFilteredProducts);
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="h-[400px] bg-muted animate-pulse rounded-lg" />
          </div>
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[300px] bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>Error: { 'status' in error ? `Status: ${error.status}` : error.message }</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <ProductsFilter />
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}