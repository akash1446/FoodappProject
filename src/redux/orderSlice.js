import { createSlice } from "@reduxjs/toolkit";

// =========================
// LOAD ORDERS FROM LOCAL STORAGE
// =========================
const loadOrdersFromLocalStorage = () => {
  const data = localStorage.getItem("orders");

  return data ? JSON.parse(data) : [];
};

// =========================
// SAVE ORDERS TO LOCAL STORAGE
// =========================
const saveOrdersToLocalStorage = (state) => {
  localStorage.setItem("orders", JSON.stringify(state));
};

// =========================
// ORDER SLICE
// =========================
const orderSlice = createSlice({
  name: "orders",

  // =========================
  // INITIAL STATE
  // =========================
  initialState: loadOrdersFromLocalStorage(),

  reducers: {
    // =========================
    // ADD TO ORDERS
    // =========================
    addToOrders: (state, action) => {
      state.push({
        ...action.payload,
        status: "Pending",
      });

      saveOrdersToLocalStorage(state);
    },

    // =========================
    // CONFIRM ORDER
    // =========================
    confirmOrder: (state, action) => {
      const order = state.find((item) => item.orderId === action.payload);

      if (order) {
        order.status = "Confirmed";
      }

      saveOrdersToLocalStorage(state);
    },

    // =========================
    // CANCEL ORDER
    // =========================
    cancelOrder: (state, action) => {
      const order = state.find((item) => item.orderId === action.payload);

      if (order) {
        order.status = "Cancelled";
      }

      saveOrdersToLocalStorage(state);
    },

    // =========================
    // REMOVE SINGLE ORDER
    // =========================
    removeOrder: (state, action) => {
      const updatedOrders = state.filter(
        (order) => order.orderId !== action.payload,
      );

      saveOrdersToLocalStorage(updatedOrders);

      return updatedOrders;
    },

    // =========================
    // CLEAR ALL ORDERS
    // =========================
    clearOrders: () => {
      localStorage.removeItem("orders");

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
