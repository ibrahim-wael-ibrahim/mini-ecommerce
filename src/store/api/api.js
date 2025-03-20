import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

// Define API base URL
// const baseUrl = "https://test-ecomerce.xn--hrt-w-ova.de/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      const locale = getState().locale.locale;

      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Accept-Language", locale);
      headers.set("Accept", "application/json");
      headers.set("User-Type", "personal");

      return headers;
    },
  }),
  tagTypes: ["Auth", "Categories", "Products", "Cart", "User", "Order"],
  endpoints: () => ({}),
});
