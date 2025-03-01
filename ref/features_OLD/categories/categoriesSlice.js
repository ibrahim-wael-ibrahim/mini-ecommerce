//features_OLD/categoriesSlice.js

import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { categoriesApiSlice } from "./categoriesApiSlice";

// Create an entity adapter for normalized state management
const categoriesAdapter = createEntityAdapter();

// Initial state with adapter and loading state
const initialState = categoriesAdapter.getInitialState({
  selectedCategoryId: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategoryId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        categoriesApiSlice.endpoints.getCategories.matchPending,
        (state) => {
          state.status = "loading";
        },
      )
      .addMatcher(
        categoriesApiSlice.endpoints.getCategories.matchFulfilled,
        (state, { payload }) => {
          state.status = "succeeded";
          // Use the adapter to update state with the categories array
          categoriesAdapter.setAll(state, payload);
        },
      )
      .addMatcher(
        categoriesApiSlice.endpoints.getCategories.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message || "Failed to fetch categories";
        },
      )
      .addMatcher(
        categoriesApiSlice.endpoints.getCategory.matchFulfilled,
        (state, { payload }) => {
          if (payload) {
            // Update or add a single category
            categoriesAdapter.upsertOne(state, payload);
          }
        },
      );
  },
});

export const { setSelectedCategory, clearSelectedCategory } =
  categoriesSlice.actions;

// Export the entity adapter selectors
export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = categoriesAdapter.getSelectors((state) => state.categories);

// Additional selectors
export const selectCategoriesStatus = (state) => state.categories.status;
export const selectCategoriesError = (state) => state.categories.error;
export const selectSelectedCategoryId = (state) =>
  state.categories.selectedCategoryId;

// Memoized selector for the selected category
export const selectSelectedCategory = createSelector(
  [selectAllCategories, selectSelectedCategoryId],
  (categories, selectedId) =>
    categories.find((category) => category.id === selectedId) || null,
);

export default categoriesSlice.reducer;
