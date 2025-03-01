import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import localeReducer from "./Slices/localeSlice";
import categoryReducer from "../features/categories/categorySlice";
import productReducer from "../features/products/productSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      locale: localeReducer,
      category: categoryReducer,
      product: productReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

export default makeStore();
