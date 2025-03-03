//features_OLD/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "./authApiSlice";

// Load token from localStorage during initialization if available
const getInitialToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || null;
  }
  return null;
};

const initialState = {
  user: null,
  token: getInitialToken(),
  isAuthenticated: !!getInitialToken(),
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register cases
      .addMatcher(authApiSlice.endpoints.login.matchPending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addMatcher(
        authApiSlice.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.status = "succeeded";
          if (payload.isSuccessful && payload.data) {
            state.user = payload.data;
            state.token = payload.data.token;
            state.isAuthenticated = true;
            if (typeof window !== "undefined") {
              localStorage.setItem("token", payload.data.token);
            }
          }
        },
      )
      .addMatcher(
        authApiSlice.endpoints.login.matchRejected,
        (state, { error }) => {
          state.status = "failed";
          state.error = error.message || "register failed";
        },
      )
      // Register cases
      .addMatcher(authApiSlice.endpoints.register.matchPending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addMatcher(
        authApiSlice.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.status = "succeeded";
          if (payload.isSuccessful && payload.data) {
            state.user = payload.data;
            state.token = payload.data.token;
            state.isAuthenticated = true;
            if (typeof window !== "undefined") {
              localStorage.setItem("token", payload.data.token);
            }
          }
        },
      )
      .addMatcher(
        authApiSlice.endpoints.register.matchRejected,
        (state, { error }) => {
          state.status = "failed";
          state.error = error.message || "Registration failed";
        },
      )
      // Logout cases
      .addMatcher(authApiSlice.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
      });
  },
});

export const { logout, clearError } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
