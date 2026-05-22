import React from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  removeOrder,
  clearOrders,
  confirmOrder,
  cancelOrder,
} from "./redux/orderSlice";

import "./Order.css";

function Order() {
  // =========================
  // REDUX
  // =========================

  const dispatch = useDispatch();

  const orders = useSelector((globalState) => globalState.orders) || [];

  console.log("Orders:", orders);

  // =========================
  // REMOVE EMPTY / INVALID ORDERS
  // =========================

  const validOrders = orders.filter(
    (order) =>
      order &&
      order.orderId &&
      order.items &&
      Array.isArray(order.items) &&
      order.items.length > 0,
  );

  // =========================
  // REMOVE SINGLE ORDER
  // =========================

  const handleRemoveOrder = (id) => {
    dispatch(removeOrder(id));
  };

  // =========================
  // CLEAR ALL ORDERS
  // =========================

  const handleClearOrders = () => {
    dispatch(clearOrders());
  };

  // =========================
  // CONFIRM ORDER
  // =========================

  const handleConfirmOrder = (id) => {
    dispatch(confirmOrder(id));
  };

  // =========================
  // CANCEL ORDER
  // =========================

  const handleCancelOrder = (id) => {
    dispatch(cancelOrder(id));
  };

  return (
    <div className="orders-page">
      {/* TITLE */}

      <div className="orders-top">
        <h1 className="orders-title">Your Order History</h1>

        {validOrders.length > 0 && (
          <button className="clear-orders-btn" onClick={handleClearOrders}>
            Clear All Orders
          </button>
        )}
      </div>

      {/* VALID ORDERS */}

      {validOrders.length > 0 ? (
        <ol className="orders-list">
          {validOrders.map((order, orderIndex) => (
            <li className="order-card" key={order.orderId || orderIndex}>
              {/* ORDER HEADER */}

              <div className="order-header">
                <div>
                  <p className="order-id">Order ID: {order.orderId}</p>

                  <p className="order-date">{order.date}</p>

                  {/* ORDER STATUS */}

                  <p
                    className={`order-status ${
                      order.status?.toLowerCase() || "pending"
                    }`}
                  >
                    Status: {order.status || "Pending"}
                  </p>
                </div>

                {/* BUTTONS */}

                <div className="order-buttons">
                  {/* CONFIRM BUTTON */}

                  <button
                    className="confirm-order-btn"
                    onClick={() => handleConfirmOrder(order.orderId)}
                  >
                    Confirm
                  </button>

                  {/* CANCEL BUTTON */}

                  <button
                    className="cancel-order-btn"
                    onClick={() => handleCancelOrder(order.orderId)}
                  >
                    Cancel
                  </button>

                  {/* REMOVE BUTTON */}

                  <button
                    className="remove-order-btn"
                    onClick={() => handleRemoveOrder(order.orderId)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* ORDER ITEMS */}

              <ul className="order-items">
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="order-item-card">
                    {/* IMAGE */}

                    <img
                      src={
                        item.imageUrl ||
                        "https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                      }
                      alt={item.name}
                      className="order-item-image"
                      onError={(e) => {
                        e.target.src =
                          "https://cdn-icons-png.flaticon.com/512/1046/1046784.png";
                      }}
                    />

                    {/* ITEM INFO */}

                    <div className="order-item-info">
                      <h3>{item.name}</h3>

                      <p>Price: ₹{item.price}</p>

                      <p>Quantity: {item.quantity}</p>

                      <p className="item-total">
                        Total: ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* TOTAL */}

              <p className="order-total">
                Total Amount: ₹
                {order.totalPrice
                  ? Number(order.totalPrice).toFixed(2)
                  : "0.00"}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="empty-orders">No Orders Found</p>
      )}
    </div>
  );
}

export default Order;
