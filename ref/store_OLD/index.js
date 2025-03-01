// src/store_OLD/index.js
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features_OLD/auth/authSlice";
import categoriesReducer from "../features_OLD/categories/categoriesSlice";
import productsReducer from "../features_OLD/products/productsSlice";
import cartReducer from "../features_OLD/cart/cartSlice";
import localeReducer from "../features_OLD/locale/localeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
      categories: categoriesReducer,
      products: productsReducer,
      cart: cartReducer,
      locale: localeReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};

export const store = makeStore();
