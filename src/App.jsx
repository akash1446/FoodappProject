import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

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

// ================= APP CONTENT =================

function AppContent() {
  // ================= REDUX CART =================

  const cartItems = useSelector((state) => state.cart?.items || []);

  // ================= CART TOTAL QUANTITY =================

  const cartQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  // ================= GET USER =================

  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  // ================= NAVIGATE =================

  const navigate = useNavigate();

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

          {/* ================= CART ================= */}

          <Link to="/cart" className="cart-link">
            <i className="fa-solid fa-cart-shopping"></i>
            Cart
            {cartQuantity > 0 && (
              <span className="cart-badge">{cartQuantity}</span>
            )}
          </Link>

          {/* ================= AUTH ================= */}

          <div className="auth-buttons">
            {user ? (
              <>
                <span className="welcome-text">Welcome, {user.name}!</span>

                <button className="logout-btn" onClick={Logout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="login-btn">
                  <i className="fa-solid fa-right-to-bracket"></i>
                  Login
                </Link>

                <Link to="/register" className="register-btn">
                  <i className="fa-solid fa-user-plus"></i>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ================= MAIN CONTENT ================= */}

      <div className="layout">
        <main className="content">
          <Routes>
            {/* ================= ROUTES ================= */}

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

            {/* ================= DEFAULT ROUTE ================= */}

            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

// ================= MAIN APP =================

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
