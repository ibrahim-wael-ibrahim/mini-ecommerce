//features_OLD/products/productsApiSlice.js
import { apiSlice } from "../../store_OLD/api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      transformResponse: (response) => response.data || [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getProduct: builder.query({
      query: (id) => `/product/${id}`,
      transformResponse: (response) => response.data || null,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    getCategoryProducts: builder.query({
      query: (categoryId) => `/category/${categoryId}/products`,
      transformResponse: (response) => response.data || [],
      providesTags: (result, error, categoryId) => [
        { type: "Products", id: `Category_${categoryId}` },
      ],
    }),
    searchProducts: builder.query({
      query: (searchTerm) => `/products/search?term=${searchTerm}`,
      transformResponse: (response) => response.data || [],
      providesTags: ["Products"],
    }),
  }),
  overrideExisting:
    process.env.NODE_ENV === "development" || typeof window !== "undefined",
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoryProductsQuery,
  useSearchProductsQuery,
} = productsApiSlice;
