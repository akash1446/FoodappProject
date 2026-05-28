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

  // ================= SEARCH FUNCTION =================
  const handleSearch = () => {
    if (search.trim() === "") return;

    const value = search.toLowerCase();

    // ================= HOME =================
    if (value.includes("home")) {
      navigate("/");
    }

    // ================= VEG ITEMS =================
    else if (
      value.includes("veg") ||
      value.includes("paneer") ||
      value.includes("pizza") ||
      value.includes("burger") ||
      value.includes("salad") ||
      value.includes("fried rice")
    ) {
      navigate("/veg");
    }

    // ================= NONVEG ITEMS =================
    else if (
      value.includes("nonveg") ||
      value.includes("chicken") ||
      value.includes("biryani") ||
      value.includes("fish") ||
      value.includes("mutton")
    ) {
      navigate("/nonveg");
    }

    // ================= MILK ITEMS =================
    else if (
      value.includes("milk") ||
      value.includes("coffee") ||
      value.includes("shake") ||
      value.includes("lassi")
    ) {
      navigate("/milk");
    }

    // ================= CHOCOLATE ITEMS =================
    else if (
      value.includes("chocolate") ||
      value.includes("cake") ||
      value.includes("oreo") ||
      value.includes("ice cream")
    ) {
      navigate("/chocolate");
    }

    // ================= OTHER PAGES =================
    else if (value.includes("cart")) {
      navigate("/cart");
    } else if (value.includes("order")) {
      navigate("/order");
    } else if (value.includes("about")) {
      navigate("/about");
    } else if (value.includes("contact")) {
      navigate("/contact");
    } else if (value.includes("login")) {
      navigate("/login");
    } else if (value.includes("register")) {
      navigate("/register");
    }

    // ================= NOT FOUND =================
    else {
      alert("Item not found");
    }

    setSearch("");
  };

  // ================= REDUX =================
  const cartItems = useSelector((state) => state.cart) || [];

  // ================= CART QUANTITY =================
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
        {/* ================= LOGO ================= */}
        <h2 className="logo">
          <i className="fa-solid fa-utensils"></i>
          FOODIE<span>ZONE</span>
        </h2>

        {/* ================= NAV LINKS ================= */}
        <div className="nav-links">
          <Link to="/">
            <i className="fa-solid fa-house"></i>
            Home
          </Link>

          <Link to="/veg">
            <i className="fa-solid fa-carrot"></i>
            Veg
          </Link>

          <Link to="/nonveg">
            <i className="fa-solid fa-drumstick-bite"></i>
            NonVeg
          </Link>

          <Link to="/milk">
            <i className="fa-solid fa-blender"></i>
            Milk
          </Link>

          <Link to="/chocolate">
            <i className="fa-solid fa-cookie"></i>
            Chocolate
          </Link>

          <Link to="/order">
            <i className="fa-solid fa-bacon"></i>
            Orders
          </Link>

          <Link to="/about">
            <i className="fa-solid fa-circle-info"></i>
            About
          </Link>

          <Link to="/contact">
            <i className="fa-solid fa-address-book"></i>
            Contact
          </Link>

          {/* ================= CART ================= */}
          <Link to="/cart" className="cart-link">
            <i className="fa-solid fa-cart-arrow-down"></i>
            Cart
            {cartQuantity > 0 && (
              <span className="cart-badge">{cartQuantity}</span>
            )}
          </Link>

          {/* ================= SEARCH BAR ================= */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <i
              className="fa-solid fa-magnifying-glass"
              onClick={handleSearch}
            ></i>
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
              <Link to="/login" className="login-btn">
                <i className="fa-solid fa-key"></i>
                Login
              </Link>
            )}

            <Link to="/register" className="register-btn">
              <i className="fa-solid fa-user"></i>
              Register
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
