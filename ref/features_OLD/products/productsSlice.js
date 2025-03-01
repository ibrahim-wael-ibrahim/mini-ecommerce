//features_OLD/products/products\lice.js

import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { productsApiSlice } from "./productsApiSlice";

// Create an entity adapter for normalized state management
const productsAdapter = createEntityAdapter();

// Initial state with adapter and loading state
const initialState = productsAdapter.getInitialState({
  selectedProductId: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filteredProductIds: [],
  searchTerm: "",
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProductId = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProductId = null;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    filterProducts: (state, action) => {
      state.filteredProductIds = action.payload;
    },
    clearFilters: (state) => {
      state.filteredProductIds = [];
      state.searchTerm = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        productsApiSlice.endpoints.getProducts.matchPending,
        (state) => {
          state.status = "loading";
        },
      )
      .addMatcher(
        productsApiSlice.endpoints.getProducts.matchFulfilled,
        (state, { payload }) => {
          state.status = "succeeded";
          // Use the adapter to update state with the products array
          productsAdapter.setAll(state, payload);
        },
      )
      .addMatcher(
        productsApiSlice.endpoints.getProducts.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message || "Failed to fetch products";
        },
      )
      .addMatcher(
        productsApiSlice.endpoints.getProduct.matchFulfilled,
        (state, { payload }) => {
          if (payload) {
            // Update or add a single product
            productsAdapter.upsertOne(state, payload);
          }
        },
      )
      .addMatcher(
        productsApiSlice.endpoints.getCategoryProducts.matchFulfilled,
        (state, { payload }) => {
          if (payload && payload.length) {
            // Update or add multiple products
            productsAdapter.upsertMany(state, payload);
          }
        },
      )
      .addMatcher(
        productsApiSlice.endpoints.searchProducts.matchFulfilled,
        (state, { payload }) => {
          if (payload && payload.length) {
            // Update or add search results
            productsAdapter.upsertMany(state, payload);
            // Store the IDs of the filtered products
            state.filteredProductIds = payload.map((product) => product.id);
          } else {
            state.filteredProductIds = [];
          }
        },
      );
  },
});

export const {
  setSelectedProduct,
  clearSelectedProduct,
  setSearchTerm,
  filterProducts,
  clearFilters,
} = productsSlice.actions;

// Export the entity adapter selectors
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors((state) => state.products);

// Additional selectors
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectSelectedProductId = (state) =>
  state.products.selectedProductId;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectFilteredProductIds = (state) =>
  state.products.filteredProductIds;

// Memoized selector for the selected product
export const selectSelectedProduct = createSelector(
  [selectAllProducts, selectSelectedProductId],
  (products, selectedId) =>
    products.find((product) => product.id === selectedId) || null,
);

// Memoized selector for filtered products
export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectFilteredProductIds],
  (products, filteredIds) =>
    filteredIds.length > 0
      ? products.filter((product) => filteredIds.includes(product.id))
      : products,
);

export default productsSlice.reducer;
