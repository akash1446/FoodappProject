import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  const data = localStorage.getItem("cart");

  return data ? JSON.parse(data) : [];
};

const saveCartToLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const cartSlice = createSlice({
  name: "cart",

  initialState: loadCartFromLocalStorage(),

  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1,
        });
      }

      saveCartToLocalStorage(state);
    },

    removeCart: (state, action) => {
      const updatedCart = state.filter((item) => item.id !== action.payload);

      saveCartToLocalStorage(updatedCart);

      return updatedCart;
    },

    incrementQty: (state, action) => {
      const item = state.find((item) => item.id === action.payload);

      if (item) {
        item.quantity += 1;
      }

      saveCartToLocalStorage(state);
    },

    decrementQty: (state, action) => {
      const item = state.find((item) => item.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      saveCartToLocalStorage(state);
    },

    clearCart: () => {
      localStorage.removeItem("cart");
      return [];
    },
  },
});

// Export actions
export const { addToCart, removeCart, incrementQty, decrementQty, clearCart } =
  cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
