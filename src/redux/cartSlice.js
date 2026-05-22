import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  // ================= INITIAL STATE =================
  initialState: [],

  reducers: {
    // ================= ADD TO CART =================
    addToCart: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);

      // If item already exists increase quantity
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // Add new item
        state.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    // ================= REMOVE PRODUCT =================
    removeCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },

    // ================= INCREMENT QUANTITY =================
    incrementQty: (state, action) => {
      const item = state.find((i) => i.id === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },

    // ================= DECREMENT QUANTITY =================
    decrementQty: (state, action) => {
      const item = state.find((i) => i.id === action.payload);

      if (item) {
        // If quantity greater than 1 decrease quantity
        if (item.quantity > 1) {
          item.quantity -= 1;
        }
        // If quantity becomes 1 and user clicks minus remove item
        else {
          return state.filter((i) => i.id !== action.payload);
        }
      }
    },

    // ================= CLEAR CART =================
    clearCart: () => {
      return [];
    },
  },
});

// ================= EXPORT ACTIONS =================
export const { addToCart, removeCart, incrementQty, decrementQty, clearCart } =
  cartSlice.actions;

// ================= EXPORT REDUCER =================
export default cartSlice.reducer;
