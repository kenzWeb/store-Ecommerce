"use client";

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const i18n = i18next.createInstance();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          home: 'Home',
          products: 'Products',
          categories: 'Categories',
          cart: 'Cart',
          search: 'Search',
          filters: {
            color: 'Color',
            size: 'Size',
            price: 'Price',
            sort: 'Sort by',
          },
          colors: {
            black: 'Black',
            white: 'White',
            red: 'Red',
            blue: 'Blue',
            green: 'Green',
          },
          sizes: {
            xs: 'XS',
            s: 'S',
            m: 'M',
            l: 'L',
            xl: 'XL',
          },
        },
      },
      ru: {
        translation: {
          home: 'Главная',
          products: 'Товары',
          categories: 'Категории',
          cart: 'Корзина',
          search: 'Поиск',
          filters: {
            color: 'Цвет',
            size: 'Размер',
            price: 'Цена',
            sort: 'Сортировать по',
          },
          colors: {
            black: 'Черный',
            white: 'Белый',
            red: 'Красный',
            blue: 'Синий',
            green: 'Зеленый',
          },
          sizes: {
            xs: 'XS',
            s: 'S',
            m: 'M',
            l: 'L',
            xl: 'XL',
          },
        },
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;