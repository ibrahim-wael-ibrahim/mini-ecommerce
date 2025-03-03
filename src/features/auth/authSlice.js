// src/features/auth/authSlice.js
import {createSlice} from "@reduxjs/toolkit";

const loadAuthState = () => {
    if (typeof window === "undefined") return {user: null, token: null};
    try {
        return {
            user: JSON.parse(localStorage.getItem("user")),
            token: localStorage.getItem("token"),
        };
    } catch {
        return {user: null, token: null};
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState: loadAuthState(),
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        },
        clearCredentials: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

export const {setCredentials, clearCredentials} = authSlice.actions;
export default authSlice.reducer;
