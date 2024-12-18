import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: 'Home',
      products: 'Products',
      categories: 'Categories',
      cart: 'Cart',
      search: 'Search products...',
      'Loading...': 'Loading...',
      'No results found.': 'No results found.',
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
      search: 'Поиск товаров...',
      'Loading...': 'Загрузка...',
      'No results found.': 'Ничего не найдено.',
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
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;