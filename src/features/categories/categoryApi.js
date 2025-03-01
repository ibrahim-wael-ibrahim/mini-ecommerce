import {api} from "../../store/api/api";

export const categoryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: (locale) => "/category/get",
            transformResponse: (response) => response.data,
            providesTags: ["Categories"],
        }),
        getCategoryById: builder.query({
            query: ({id, locale}) => `/category/find/${id}`,
            transformResponse: (response) => response.data,
            providesTags: ["Categories"],
        }),
    }),
    overrideExisting: true,
});

export const {useGetCategoriesQuery, useGetCategoryByIdQuery} = categoryApi;
