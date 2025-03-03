// src/features/order/orderApi.js
import { api } from "@/store/api/api";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrderPrice: builder.query({
      query: () => "/order/order-price",
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart", "Order"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetOrderPriceQuery, useCreateOrderMutation } = orderApi;
