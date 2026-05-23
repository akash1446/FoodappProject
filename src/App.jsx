import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

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

import { useSelector } from "react-redux";

import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  // REDUX CART

  const cartItems = useSelector((state) => state.cart || []);

  // TOTAL QUANTITY

  const cartQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );
let user = JSON.parse(localStorage.getItem("loggedInUser"));
  let Logout = ()=>{
    localStorage.removeItem("loggedInUser");
    
    window.location.reload();
  }

  return (
    <BrowserRouter>
      {/* ================= NAVBAR ================= */}

      <nav className="navbar">
        {/* LOGO */}

        <h2 className="logo">
          <i className="fa-solid fa-utensils"></i>
          FOODIE<span>ZONE</span>
        </h2>

        {/* NAVIGATION */}

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
            <i className="fa-solid fa-cookie-bite"></i>
            Chocolate
          </Link>

          <Link to="/order">
            <i className="fa-solid fa-list"></i>
            Orders
          </Link>

          <Link to="/about">
            <i className="fa-solid fa-circle-info"></i>
            About
          </Link>

          <Link to="/contact">
            <i className="fa-solid fa-phone"></i>
            Contact
          </Link>

          {/* CART */}

          <Link to="/cart" className="cart-link">
            <i className="fa-solid fa-cart-shopping"></i>
            Cart
            {cartQuantity > 0 && (
              <span className="cart-badge">{cartQuantity}</span>
            )}
          </Link>

          {/* AUTH BUTTONS */}

          <div className="auth-buttons">
            {user ? (
              <>
                <span style={{color: "white"}}>Welcome, {user.name}!</span>
                <button onClick={Logout}>Logout</button>
              </>
            ) : (
              <Link to="/login" className="login-btn">
                <i className="fa-solid fa-right-to-bracket"></i>
                Login
              </Link>
            )}

            <Link to="/register" className="register-btn">
              <i className="fa-solid fa-user-plus"></i>
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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
