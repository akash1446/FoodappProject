import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",

  // =========================
  // INITIAL STATE
  // =========================
  initialState: [],

  reducers: {
    // =========================
    // ADD TO ORDERS
    // =========================
    addToOrders: (state, action) => {
      state.push({
        ...action.payload,
        status: "Pending", // Default Status
      });
    },

    // =========================
    // CONFIRM ORDER
    // =========================
    confirmOrder: (state, action) => {
      const order = state.find((item) => item.orderId === action.payload);

      if (order) {
        order.status = "Confirmed";
      }
    },

    // =========================
    // CANCEL ORDER
    // =========================
    cancelOrder: (state, action) => {
      const order = state.find((item) => item.orderId === action.payload);

      if (order) {
        order.status = "Cancelled";
      }
    },

    // =========================
    // REMOVE SINGLE ORDER
    // =========================
    removeOrder: (state, action) => {
      return state.filter((order) => order.orderId !== action.payload);
    },

    // =========================
    // CLEAR ALL ORDERS
    // =========================
    clearOrders: () => {
      return [];
    },
  },
});

// =========================
// EXPORT ACTIONS
// =========================
export const {
  addToOrders,
  confirmOrder,
  cancelOrder,
  removeOrder,
  clearOrders,
} = orderSlice.actions;

// =========================
// EXPORT REDUCER
// =========================
export default orderSlice.reducer;
