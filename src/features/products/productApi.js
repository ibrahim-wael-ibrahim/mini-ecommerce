import {api} from "../../store/api/api";

export const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProductsByCategory: builder.query({
            query: ({categoryId, locale}) =>
                `/product/category?category_id=${categoryId}`,
            transformResponse: (response) => {
                return response.data;
            },
            providesTags: ["Products"],
        }),
        getProductById: builder.query({
            query: ({id, locale}) => `/product/find/${id}`,
            transformResponse: (response) => response.data,
            providesTags: ["Products"],
        }),
    }),
    overrideExisting: true,
});

export const {useGetProductsByCategoryQuery, useGetProductByIdQuery} =
    productApi;
