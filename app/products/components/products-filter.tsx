'use client';

import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useDispatch } from 'react-redux';
import { setFilters } from '@/features/products/productSlice';

const colorOptions = [
  { label: 'colors.black', value: 'black' },
  { label: 'colors.white', value: 'white' },
  { label: 'colors.red', value: 'red' },
  { label: 'colors.blue', value: 'blue' },
  { label: 'colors.green', value: 'green' },
];

const sizeOptions = [
  { label: 'sizes.xs', value: 'xs' },
  { label: 'sizes.s', value: 's' },
  { label: 'sizes.m', value: 'm' },
  { label: 'sizes.l', value: 'l' },
  { label: 'sizes.xl', value: 'xl' },
];

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Popular', value: 'popular' },
];

export function ProductsFilter() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleFilterChange = (type: string, value: any) => {
    dispatch(setFilters({ [type]: value }));
  };

  return (
    <div className="space-y-6 p-4 bg-card rounded-lg shadow-sm">
      <div>
        <Label>{t('filters.sort')}</Label>
        <Select onValueChange={(value) => handleFilterChange('sort', value)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder={t('filters.sort')} />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>{t('filters.color')}</Label>
        <Select onValueChange={(value) => handleFilterChange('color', value)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder={t('filters.color')} />
          </SelectTrigger>
          <SelectContent>
            {colorOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {t(option.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>{t('filters.size')}</Label>
        <Select onValueChange={(value) => handleFilterChange('size', value)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder={t('filters.size')} />
          </SelectTrigger>
          <SelectContent>
            {sizeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {t(option.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>{t('filters.price')}</Label>
        <div className="pt-4">
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            step={10}
            onValueChange={(value) => handleFilterChange('price', value)}
          />
        </div>
      </div>
    </div>
  );
}