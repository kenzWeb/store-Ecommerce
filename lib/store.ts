import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import productReducer from "@/features/products/productSlice";
import { apiSlice } from "@/features/api/apiSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;