import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setProducts } from "@/features/products/productSlice";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Add mock color and size data since the API doesn't provide them
          const productsWithAttributes = data.map(product => ({
            ...product,
            color: ['black', 'white', 'red', 'blue', 'green'][Math.floor(Math.random() * 5)],
            size: ['xs', 's', 'm', 'l', 'xl'][Math.floor(Math.random() * 5)]
          }));
          dispatch(setProducts(productsWithAttributes));
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      },
    }),
    getCategories: builder.query<string[], void>({
      query: () => "products/categories",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
} = apiSlice;