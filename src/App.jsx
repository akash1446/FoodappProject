import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";

import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import Milk from "./Milk";
import Chocolate from "./Chocolate";
import Cart from "./Cart";
import Login from "./Login";
import Register from "./Register";
import Order from "./Order";
import Aboutus from "./Aboutus";
import Contactus from "./Contactus";

import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  // ================= NAVIGATION =================
  const navigate = useNavigate();

  // ================= SEARCH STATE =================
  const [search, setSearch] = useState("");

  // ================= REDUX =================
  const cartItems = useSelector((state) => state.cart?.items) || [];

  const cartQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  // ================= USER =================
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  // ================= LOGOUT =================
  const Logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <h2 className="logo">
          <i className="fa-solid fa-utensils"></i>
          FOODIE<span>ZONE</span>
        </h2>

        <div className="nav-links">
          <Link to="/">
            <i class="fa-solid fa-house"></i>Home
          </Link>

          <Link to="/veg">
            <i class="fa-solid fa-carrot"></i>Veg
          </Link>

          <Link to="/nonveg">
            <i class="fa-solid fa-drumstick-bite"></i>NonVeg
          </Link>

          <Link to="/milk">
            <i class="fa-solid fa-blender"></i>Milk
          </Link>

          <Link to="/chocolate">
            <i class="fa-solid fa-cookie"></i>Chocolate
          </Link>

          <Link to="/order">
            <i class="fa-solid fa-bacon"></i>Orders
          </Link>

          <Link to="/about">
            <i class="fa-solid fa-circle-info"></i>About
          </Link>

          <Link to="/contact">
            <i class="fa-solid fa-address-book"></i>Contact
          </Link>

          <Link to="/cart" className="cart-link">
            <i class="fa-solid fa-cart-arrow-down"></i> Cart
            {cartQuantity > 0 && (
              <span className="cart-badge">{cartQuantity}</span>
            )}
          </Link>

          {/* ================= SEARCH BAR ADDED ================= */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          {/* ================= AUTH ================= */}
          <div className="auth-buttons">
            {user ? (
              <>
                <span className="welcome-text">Welcome, {user.name}</span>

                <button className="logout-btn" onClick={Logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <i class="fa-solid fa-key"></i>Login
                </Link>
              </>
            )}

            <Link to="/register">
              <i class="fa-solid fa-user"></i>Register
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= ROUTES ================= */}
      <div className="layout">
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/veg" element={<Veg />} />
            <Route path="/nonveg" element={<NonVeg />} />
            <Route path="/milk" element={<Milk />} />
            <Route path="/chocolate" element={<Chocolate />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/order" element={<Order />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
