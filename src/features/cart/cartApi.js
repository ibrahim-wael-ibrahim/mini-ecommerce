// src/features/cart/cartApi.js
import { api } from "@/store/api/api";

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: () => "/cart/items",
      providesTags: ["Cart"],
      transformResponse: (response) => response.data.cart_items,
    }),
    addItemToCart: builder.mutation({
      query: (data) => ({
        url: "/cart/add-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    increaseItem: builder.mutation({
      query: (data) => ({
        url: "/cart/increase-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    decreaseItem: builder.mutation({
      query: (data) => ({
        url: "/cart/decrease-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeItem: builder.mutation({
      query: (data) => ({
        url: "/cart/remove-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: "/cart/destroy-cart",
        method: "POST",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCartItemsQuery,
  useAddItemToCartMutation,
  useIncreaseItemMutation,
  useDecreaseItemMutation,
  useRemoveItemMutation,
  useClearCartMutation,
} = cartApi;
