//features_OLD/categoriesApiSlice.js
import { apiSlice } from "../../store_OLD/api/apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/category/get",
      transformResponse: (response) => response.data || [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Categories", id })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),
    getCategory: builder.query({
      query: (id) => `/category/find/${id}`,
      transformResponse: (response) => response.data || null,
      providesTags: (result, error, id) => [{ type: "Categories", id }],
    }),
    getCategoryProducts: builder.query({
      query: (categoryId) => `/category/${categoryId}/products`,
      transformResponse: (response) => response.data || [],
      providesTags: (result, error, categoryId) => [
        { type: "Products", id: `Category_${categoryId}` },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetCategoryProductsQuery,
} = categoriesApiSlice;
