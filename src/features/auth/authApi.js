// src/features/auth/authApi.js
import {api} from "@/store/api/api";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: "/register",
                method: "POST",
                body: userData,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/out",
                method: "GET",
            }),
        }),
        socialLogin: builder.mutation({
            query: (accessToken) => ({
                url: "/sociallogin",
                method: "POST",
                body: {
                    account_type: "google",
                    token: accessToken,
                },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useSocialLoginMutation,
} = authApi;
