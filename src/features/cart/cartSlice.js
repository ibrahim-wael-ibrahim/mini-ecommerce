// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCart(),
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.qty += action.payload.qty;
      } else {
        state.items.push({
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price, // Include price here
          qty: action.payload.qty,
          image: action.payload.image,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
    setCart: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("cart", JSON.stringify(action.payload));
    },
    incrementItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty += 1;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decrementItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const {
  addItem,
  updateItem,
  removeItem,
  clearCart,
  setCart,
  decrementItem,
  incrementItem,
} = cartSlice.actions;
export default cartSlice.reducer;
