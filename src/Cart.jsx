import React, { useState, useMemo } from "react";
import "./Cart.css";

import { useDispatch, useSelector } from "react-redux";

import {
  removeCart,
  clearCart,
  incrementQty,
  decrementQty,
} from "./redux/cartSlice";

import { applyCoupon, resetCoupon } from "./redux/cuponSlice";

import { addToOrders } from "./redux/orderSlice";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { QRCode } from "react-qr-code";

import Swal from "sweetalert2";

import emailjs from "@emailjs/browser";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart || []);

  const couponDetails = useSelector((state) => state.couponDetails || {});

  const discount = couponDetails.discount || 0;

  const [discountPercent, setDiscountPercent] = useState(0);

  const [coupon, setCoupon] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");

  const [customerEmail, setCustomerEmail] = useState("");

  const [showEmailInput, setShowEmailInput] = useState(false);

  // CARD DETAILS
  const [cardName, setCardName] = useState("");

  const [cardNumber, setCardNumber] = useState("");

  const [expiry, setExpiry] = useState("");

  const [cvv, setCvv] = useState("");

  /* =========================
     CALCULATIONS
  ========================= */

  const totalAmount = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + Number(item.price || 0) * Number(item.quantity || 0),
      0,
    );
  }, [cartItems]);

  const finalDiscount = discountPercent + discount;

  const couponDiscountAmount = (totalAmount * finalDiscount) / 100;

  const afterDiscount = totalAmount - couponDiscountAmount;

  const taxAmount = (afterDiscount * 18) / 100;

  const netAmount = afterDiscount + taxAmount;

  /* =========================
     APPLY COUPON
  ========================= */

  const handleApplyCoupon = () => {
    if (!coupon.trim()) {
      toast.warning("Please enter coupon code");

      return;
    }

    const validCoupons = [
      "SAVE10",
      "SAVE20",
      "SAVE30",
      "WELCOME5",
      "WELCOME20",
      "WELCOME30",
      "Festive25",
    ];

    if (!validCoupons.includes(coupon.toUpperCase())) {
      Swal.fire({
        icon: "error",
        title: "Invalid Coupon ❌",
        text: `${coupon} is not a valid coupon code`,
        confirmButtonColor: "#ff4b4b",
      });

      toast.error("Invalid coupon code");

      return;
    }

    dispatch(applyCoupon(coupon.toUpperCase()));

    Swal.fire({
      icon: "success",
      title: "Coupon Applied 🎉",
      text: `${coupon.toUpperCase()} applied successfully`,
      timer: 1500,
      showConfirmButton: false,
    });

    toast.success(`Coupon ${coupon.toUpperCase()} applied`);
  };

  /* =========================
     REMOVE ITEM
  ========================= */

  const handleRemoveItem = (item) => {
    Swal.fire({
      title: "Remove Item?",
      text: `Remove ${item.name} from cart?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeCart(item.id));

        toast.error(`${item.name} removed`);

        if (cartItems.length <= 1) {
          dispatch(resetCoupon());

          setCoupon("");

          setDiscountPercent(0);

          setPaymentMethod("");
        }
      }
    });
  };

  /* =========================
     CLEAR CART
  ========================= */

  const handleClearCart = () => {
    Swal.fire({
      title: "Clear Cart?",
      text: "All items will be removed",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());

        dispatch(resetCoupon());

        setCoupon("");

        setDiscountPercent(0);

        setPaymentMethod("");

        toast.error("Cart cleared");
      }
    });
  };

  /* =========================
     PAYMENT
  ========================= */

  const handlePayment = () => {
    if (paymentMethod === "card") {
      if (!cardName || !cardNumber || !expiry || !cvv) {
        Swal.fire({
          icon: "warning",
          title: "Incomplete Card Details",
          text: "Please fill all card details",
        });

        return;
      }
    }

    Swal.fire({
      icon: "success",
      title: "Payment Successful 🎉",
      text: `₹${netAmount.toFixed(2)} paid successfully`,
      timer: 2000,
      showConfirmButton: false,
    });

    toast.success("Payment Successful");
  };

  /* =========================
     EMAIL TEMPLATE
  ========================= */

  const templateParams = {
    logo:  "https://foodapp-project-umber.vercel.app/logo.png",

    order_id: `ORDER-${Date.now()}`,

    orders: cartItems.map((item) => ({
      item: item.imageUrl,

      name: item.name,

      price: (item.price * item.quantity).toFixed(2),

      units: item.quantity,
    })),

    cost: {
    shipping: 50,
    tax: taxAmount.toFixed(2),
    total: netAmount.toFixed(2),
    couponAmount: couponDiscountAmount.toFixed(2),
    },

    email: customerEmail,
  };

  /* =========================
     CHECKOUT
  ========================= */

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Cart Empty",
        text: "Please add items to cart",
      });

      return;
    }

    if (!customerEmail) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email",
      });

      return;
    }

    Swal.fire({
      title: "Sending Email...",
      text: "Please wait",
      allowOutsideClick: false,

      didOpen: () => {
        Swal.showLoading();
      },
    });

    emailjs
      .send(
        "service_akash123",
        "template_1c0dr5x",
        templateParams,
        "hv8bYVtgRnp1EFM51",
      )

      .then(() => {
        let purchaseDetails = {
          orderId: "ORD-" + Math.floor(Math.random() * 1000000000),

          date: new Date().toLocaleString(),

          items: [...cartItems],

          totalPrice: Number(netAmount),
        };

        dispatch(addToOrders(purchaseDetails));

        Swal.fire({
          icon: "success",
          title: "Order Confirmed 🎉",

          html: `<p>Email sent successfully</p><br/><b>${customerEmail}</b>`,

          confirmButtonColor: "#00b894",
        });

        toast.success("Order confirmation sent");

        dispatch(clearCart());

        dispatch(resetCoupon());

        setCoupon("");

        setDiscountPercent(0);

        setPaymentMethod("");

        setCustomerEmail("");
      })

      .catch((error) => {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Email Failed ❌",
          text: "Unable to send email",
          confirmButtonColor: "#ff4b4b",
        });

        toast.error("Failed to send email");
      });
  };

  return (
    <div className="cart-page">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="cart-container">
        {/* LEFT SIDE */}

        <div className="cart-left">
          <h2>Your Cart ({cartItems.length} items)</h2>

          {cartItems.length === 0 ? (
            <div className="empty-cart-container">
              <p className="empty-msg">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-row" key={item.id}>
                <img
                  src={
                    item.imageUrl ||
                    "https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                  }
                  alt={item.name}
                />

                <div className="cart-info">
                  <h3>{item.name}</h3>

                  <div className="qty-box">
                    <button onClick={() => dispatch(decrementQty(item.id))}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => dispatch(incrementQty(item.id))}>
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-price">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item)}
                >
                  Remove
                </button>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <button className="clear-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
          )}
        </div>

        {/* RIGHT SIDE */}

        {cartItems.length > 0 && (
          <div className="order-summary-sidebar">
            <div className="summary-box">
              <h2>Bill Summary</h2>

              <hr />

              <div className="summary-row">
                <span>Subtotal:</span>

                <span>₹{totalAmount.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Sales Tax (18%):</span>

                <span>₹{taxAmount.toFixed(2)}</span>
              </div>

              <div className="summary-row discount-text">
                <span>Manual Discount:</span>

                <span>
                  - ₹{((totalAmount * discountPercent) / 100).toFixed(2)}
                </span>
              </div>

              <div className="summary-row discount-text">
                <span>Coupon Discount:</span>

                <span>- ₹{((totalAmount * discount) / 100).toFixed(2)}</span>
              </div>

              <hr />

              <div className="summary-row grand-total">
                <span>Grand Total:</span>

                <span>₹{netAmount.toFixed(2)}</span>
              </div>

              {/* DISCOUNT */}

              <div className="manual-discounts-section">
                <label>Manual Discounts</label>

                <div className="discount-buttons">
                  <button
                    className={discountPercent === 10 ? "active" : ""}
                    onClick={() => setDiscountPercent(10)}
                  >
                    10%
                  </button>

                  <button
                    className={discountPercent === 20 ? "active" : ""}
                    onClick={() => setDiscountPercent(20)}
                  >
                    20%
                  </button>

                  <button
                    className={discountPercent === 30 ? "active" : ""}
                    onClick={() => setDiscountPercent(30)}
                  >
                    30%
                  </button>
                </div>
              </div>

              {/* COUPON */}

              <div className="coupon-box">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon code"
                />

                <button onClick={handleApplyCoupon}>Apply</button>
              </div>

              {/* EMAIL */}

              <div className="email-section">
                <div className="email-toggle">
                  <span>Email for Confirmation</span>

                  <button
                    className="show-link"
                    onClick={() => setShowEmailInput(!showEmailInput)}
                  >
                    {showEmailInput ? "Hide" : "Show"}
                  </button>
                </div>

                {showEmailInput && (
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="email-input"
                  />
                )}
              </div>

              {/* PAYMENT */}

              <div className="payment-method-section">
                <label>Select Payment Method</label>

                <div className="payment-buttons">
                  <button
                    className={paymentMethod === "qr" ? "active" : ""}
                    onClick={() => setPaymentMethod("qr")}
                  >
                    QR Code
                  </button>

                  <button
                    className={paymentMethod === "card" ? "active" : ""}
                    onClick={() => setPaymentMethod("card")}
                  >
                    Card
                  </button>
                </div>

                {/* QR */}

                {paymentMethod === "qr" && (
                  <div className="qr-container">
                    <QRCode
                      size={150}
                      value={`upi://pay?pa=guduriakash9-2@okaxis&pn=TastyBites&am=${netAmount.toFixed(
                        2,
                      )}&cu=INR`}
                    />

                    <p>Scan to Pay ₹{netAmount.toFixed(2)}</p>

                    <button className="pay-btn" onClick={handlePayment}>
                      Verify & Pay
                    </button>
                  </div>
                )}

                {/* CARD PAYMENT */}

                {paymentMethod === "card" && (
                  <div className="card-payment-container">
                    <input
                      type="text"
                      placeholder="Card Holder Name"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="card-input"
                    />

                    <input
                      type="text"
                      placeholder="Card Number"
                      maxLength="16"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="card-input"
                    />

                    <div className="card-row">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength="5"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="card-input"
                      />

                      <input
                        type="password"
                        placeholder="CVV"
                        maxLength="3"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="card-input"
                      />
                    </div>

                    <button className="pay-btn" onClick={handlePayment}>
                      Pay ₹{netAmount.toFixed(2)}
                    </button>
                  </div>
                )}
              </div>

              {/* CHECKOUT */}

              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout & Send Email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
