'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { addToCart } from '@/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  color?: string;
  size?: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex gap-2 mb-2">
          {product.color && (
            <Badge variant="secondary">
              {t(`colors.${product.color}`)}
            </Badge>
          )}
          {product.size && (
            <Badge variant="secondary">
              {t(`sizes.${product.size}`)}
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="font-bold text-lg">{formatPrice(product.price)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}