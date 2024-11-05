import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  color?: string;
  size?: string;
}

interface ProductsState {
  items: Product[];
  filters: {
    category: string | null;
    color: string | null;
    size: string | null;
    price: [number, number];
    sort: string | null;
    search: string;
  };
}

const initialState: ProductsState = {
  items: [],
  filters: {
    category: null,
    color: null,
    size: null,
    price: [0, 1000],
    sort: null,
    search: "",
  },
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductsState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setProducts, setFilters } = productSlice.actions;

export const selectFilteredProducts = (state: RootState) => {
  let filtered = [...state.products.items];
  const filters = state.products.filters;

  if (filters.category) {
    filtered = filtered.filter(product => product.category === filters.category);
  }

  if (filters.color) {
    filtered = filtered.filter(product => product.color === filters.color);
  }

  if (filters.size) {
    filtered = filtered.filter(product => product.size === filters.size);
  }

  if (filters.price) {
    filtered = filtered.filter(
      product => product.price >= filters.price[0] && product.price <= filters.price[1]
    );
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
    );
  }

  if (filters.sort) {
    switch (filters.sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.rating.count - a.rating.count);
        break;
      case 'newest':
        // Предполагаем, что у товаров есть ID, и более новые имеют больший ID
        filtered.sort((a, b) => b.id - a.id);
        break;
    }
  }

  return filtered;
};

export default productSlice.reducer;