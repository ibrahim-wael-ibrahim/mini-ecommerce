import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// Define API base URL
const baseUrl = "http://test-ecomerce.xn--hrt-w-ova.de/api";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            headers.set("Accept", "application/json");
            headers.set("User-Type", "personal");
            headers.set("Accept-Language", getState().locale.locale); // 🎯 Get locale from Redux
            return headers;
        },
    }),
    tagTypes: ["Auth", "Categories", "Products", "cart", "User"],
    endpoints: () => ({}),
});
