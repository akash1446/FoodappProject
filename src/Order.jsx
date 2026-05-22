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
  // VALID ORDERS
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
      {/* =========================
          FLOATING BACKGROUND
      ========================= */}

      <div className="floating-bg">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* =========================
          TITLE SECTION
      ========================= */}

      <div className="orders-top">
        <div>
          <h1 className="orders-title">Your Order History</h1>

          <p className="orders-subtitle">
            Track your recent purchases and manage your orders
          </p>
        </div>

        {validOrders.length > 0 && (
          <button className="clear-orders-btn" onClick={handleClearOrders}>
            Clear All Orders
          </button>
        )}
      </div>

      {/* =========================
          ORDER LIST
      ========================= */}

      {validOrders.length > 0 ? (
        <ol className="orders-list">
          {validOrders.map((order, orderIndex) => (
            <li className="order-card" key={order.orderId || orderIndex}>
              {/* =========================
                  TOP BADGE
              ========================= */}

              <div className="order-badge">#{orderIndex + 1}</div>

              {/* =========================
                  ORDER HEADER
              ========================= */}

              <div className="order-header">
                <div className="order-left">
                  <p className="order-id">
                    Order ID :<span> {order.orderId}</span>
                  </p>

                  <p className="order-date">
                    📅 {order.date || "No Date Available"}
                  </p>

                  {/* STATUS */}

                  <p
                    className={`order-status ${
                      order.status?.toLowerCase() || "pending"
                    }`}
                  >
                    {order.status || "Pending"}
                  </p>
                </div>

                {/* =========================
                    BUTTONS
                ========================= */}

                <div className="order-buttons">
                  {/* CONFIRM */}

                  <button
                    className="confirm-order-btn"
                    onClick={() => handleConfirmOrder(order.orderId)}
                  >
                    Confirm
                  </button>

                  {/* CANCEL */}

                  <button
                    className="cancel-order-btn"
                    onClick={() => handleCancelOrder(order.orderId)}
                  >
                    Cancel
                  </button>

                  {/* REMOVE */}

                  <button
                    className="remove-order-btn"
                    onClick={() => handleRemoveOrder(order.orderId)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* =========================
                  ITEMS
              ========================= */}

              <ul className="order-items">
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="order-item-card">
                    {/* IMAGE */}

                    <div className="image-wrapper">
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
                    </div>

                    {/* INFO */}

                    <div className="order-item-info">
                      <h3>{item.name}</h3>

                      <p>
                        Price :<span> ₹{item.price}</span>
                      </p>

                      <p>
                        Quantity :<span> {item.quantity}</span>
                      </p>

                      <p className="item-total">
                        Total :
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* =========================
                  FOOTER
              ========================= */}

              <div className="order-footer">
                <p className="order-total">
                  Total Amount :
                  <span>
                    ₹
                    {order.totalPrice
                      ? Number(order.totalPrice).toFixed(2)
                      : "0.00"}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="empty-orders-container">
          <div className="empty-animation">🛒</div>

          <h2 className="empty-orders">No Orders Found</h2>

          <p className="empty-text">Your ordered products will appear here</p>
        </div>
      )}
    </div>
  );
}

export default Order;
