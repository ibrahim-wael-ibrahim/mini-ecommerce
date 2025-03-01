//features_OLD/cart/cartSlice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";

// Load cart from localStorage during initialization if available
const loadCartFromStorage = () => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }
  return { items: [], totalQuantity: 0, totalAmount: 0 };
};

// Helper function to calculate totals
const calculateTotals = (items) => {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  return { totalQuantity, totalAmount };
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id,
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        state.items[existingItemIndex].quantity += newItem.quantity || 1;
      } else {
        // Add new item
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
        });
      }

      // Update totals
      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;

      // Save to localStorage
      saveCartToStorage(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);

      // Update totals
      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;

      // Save to localStorage
      saveCartToStorage(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex >= 0) {
        state.items[itemIndex].quantity = Math.max(1, quantity);
      }

      // Update totals
      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;

      // Save to localStorage
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      // Save to localStorage
      saveCartToStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

// Memoized selector for cart item by id
export const selectCartItemById = createSelector(
  [selectCartItems, (_, itemId) => itemId],
  (items, itemId) => items.find((item) => item.id === itemId) || null,
);

export default cartSlice.reducer;
