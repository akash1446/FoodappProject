import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import couponReducer from "./cuponSlice";
import orderReducer from "./orderSlice";


const store = configureStore({
  reducer: {
    cart: cartReducer,

    couponDetails: couponReducer,

    orders: orderReducer,
  },
});

export default store;
