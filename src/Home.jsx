import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

/* ================= FOOD ITEMS DATA ================= */

const items = [
  /* VEG ITEMS */

  { img: "/Images/VegItems/masla.jpg", name: "Masala Dosa" },

  { img: "/Images/VegItems/burger.jpg", name: "Gourmet Burger" },

  { img: "/Images/VegItems/Pasta.jpg", name: "Italian Pasta" },

  { img: "/Images/VegItems/juice.jpg", name: "Fresh Juice" },

  { img: "/Images/VegItems/Banana.jpg", name: "Organic Banana" },

  /* NON VEG ITEMS */

  {
    img: "/Images/NonVegItems/ChickenBiryani.jpg",
    name: "Chicken Biryani",
  },

  {
    img: "/Images/NonVegItems/FishFry.jpg",
    name: "Crispy Fish",
  },

  /* MILK ITEMS */

  {
    img: "/Images/MilkItems/shake.jpg",
    name: "Classic Shake",
  },

  /* CHOCOLATE ITEMS */

  {
    img: "/Images/Chocolate/dairymilk.jpg",
    name: "Dairy Milk",
  },
];

function Home() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const [search, setSearch] = useState("");

  /* ================= SEARCH FILTER ================= */

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  /* ================= OPEN MENU ALERT ================= */

  const handleExploreClick = () => {
    Swal.fire({
      title: "🍽️ Welcome To FoodieZone",

      html: `
        <p style="font-size:16px; margin: 0;">
          Discover fresh and delicious meals crafted specially for you.
        </p>

        <p style="margin-top:12px; margin-bottom: 0; color:#27ae60; font-weight:600;">
          Choose your favorite category and start ordering.
        </p>
      `,

      icon: "success",

      showCancelButton: true,

      confirmButtonColor: "#27ae60",

      cancelButtonColor: "#e74c3c",

      confirmButtonText: "Explore Now",

      cancelButtonText: "Maybe Later",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowMenu(true);

        toast.success("Menu Opened Successfully 🍔");
      } else {
        toast.info("See You Again 👋");
      }
    });
  };

  return (
    <div className="main-wrapper">
      {/* ================= TOAST ================= */}

      <ToastContainer position="top-right" autoClose={2500} />

      {/* ================= HERO SECTION ================= */}

      <section className="hero-viewport">
        {/* ================= VIDEO BACKGROUND ================= */}

        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
          poster="/Images/VegItems/burger.jpg"
        >
          <source src="/Images/Videos/animation.mp4" type="video/mp4" />
        </video>

        {/* ================= OVERLAY ================= */}

        <div className="hero-overlay">
          {/* ================= NAVBAR ================= */}

          <nav className="top-nav">
            {/* ================= LOGO ================= */}

            <div
              className="logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              FOODIE<span>ZONE</span>
            </div>

            {/* ================= SEARCH + BUTTON ================= */}

            <div className="nav-right">
              <input
                type="text"
                placeholder="Search delicious food..."
                className="search-box"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button className="menu-trigger" onClick={handleExploreClick}>
                Explore Menu
              </button>
            </div>
          </nav>

          {/* ================= HERO CONTENT ================= */}

          <div className="hero-center-content">
            <div className="hero-badge">
              🍔 Fresh Food • Fast Delivery • Premium Quality
            </div>

            <h1 className="main-title">
              Delicious Food <br />
              <span>Delivered Fast.</span>
            </h1>

            <p className="sub-caption">
              Experience restaurant-quality meals made with fresh ingredients
              and delivered straight to your doorstep with speed, freshness, and
              unforgettable taste.
            </p>

            {/* ================= TEXT ANIMATION ================= */}

            <div className="food-text-animation">
              <span>🍔 Food is Tasty</span>

              <span>🥗 Food is Healthy</span>

              <span>🍕 Fresh & Delicious</span>

              <span>🥤 Feel the Real Taste</span>

              <span>🍱 Premium Quality Meals</span>

              <span>🔥 Taste That Makes You Happy</span>

              <span>🚀 Fast Delivery Fresh Food</span>
            </div>

            {/* ================= BUTTONS ================= */}

            <div className="hero-actions">
              <button className="cta-main" onClick={handleExploreClick}>
                Order Now
              </button>

              <button
                className="secondary-btn"
                onClick={() => navigate("/about")}
              >
                Learn More
              </button>
            </div>

            {/* ================= STATS ================= */}

            <div className="hero-stats">
              <div className="stat-card">
                <h2>24/7</h2>

                <p>Fast Delivery Service</p>
              </div>
            </div>
          </div>

          {/* ================= FOOD SCROLL ================= */}

          <div className="marquee-wrapper">
            {filteredItems.length > 0 ? (
              <div className="food-scroll-wrapper">
                <div className="food-scroll-track">
                  {[...filteredItems, ...filteredItems].map((item, i) => (
                    <div
                      className="food-circle-card"
                      key={`${item.name}-${i}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        /* VEG PAGE */

                        if (
                          item.name === "Masala Dosa" ||
                          item.name === "Gourmet Burger" ||
                          item.name === "Italian Pasta" ||
                          item.name === "Fresh Juice" ||
                          item.name === "Organic Banana"
                        ) {
                          navigate("/veg");
                        } else if (

                        /* NON VEG PAGE */
                          item.name === "Chicken Biryani" ||
                          item.name === "Crispy Fish"
                        ) {
                          navigate("/nonveg");
                        } else if (item.name === "Classic Shake") {

                        /* MILK PAGE */
                          navigate("/milk");
                        } else if (item.name === "Dairy Milk") {

                        /* CHOCOLATE PAGE */
                          navigate("/chocolate");
                        }
                      }}
                    >
                      <img src={item.img} alt={item.name} />

                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h2 className="no-food">No Food Found 🍔</h2>
            )}
          </div>
        </div>
      </section>

      {/* ================= POPUP MENU ================= */}

      {showMenu && (
        <div className="full-screen-menu" onClick={() => setShowMenu(false)}>
          <div className="menu-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-x" onClick={() => setShowMenu(false)}>
              &times;
            </button>

            <h2 className="popup-title">Select Food Category</h2>

            <p className="popup-subtitle">
              Explore delicious categories crafted for every taste.
            </p>

            <div className="cat-options">
              <div className="option" onClick={() => navigate("/veg")}>
                <div className="icon">🥦</div>

                <h3>Vegetarian</h3>
              </div>

              <div className="option" onClick={() => navigate("/nonveg")}>
                <div className="icon">🍗</div>

                <h3>Non-Veg</h3>
              </div>

              <div className="option" onClick={() => navigate("/milk")}>
                <div className="icon">🥛</div>

                <h3>Dairy & Milk</h3>
              </div>

              <div className="option" onClick={() => navigate("/chocolate")}>
                <div className="icon">🍫</div>

                <h3>Chocolates</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}

      <footer className="premium-footer">
        <div className="footer-grid">
          {/* ================= FOOTER LOGO ================= */}

          <div className="footer-box">
            <h2 className="footer-logo">
              FOODIE<span>ZONE</span>
            </h2>

            <p>
              Premium food delivery experience with freshness, taste, hygiene,
              and lightning-fast service.
            </p>
          </div>

          {/* ================= CONTACT ================= */}

          <div className="footer-box">
            <h3>Contact</h3>

            <p>👤 Akash Guduri</p>

            <p>📞 +91 8125561511</p>

            <p>📧 akashguduri2@gmail.com</p>

            <p>📍 Hyderabad, Telangana, India</p>
          </div>

          {/* ================= CATEGORIES ================= */}

          <div className="footer-box">
            <h3>Categories</h3>

            <p style={{ cursor: "pointer" }} onClick={() => navigate("/veg")}>
              🥦 Veg Specials
            </p>

            <p
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/nonveg")}
            >
              🍗 Non-Veg Delights
            </p>

            <p style={{ cursor: "pointer" }} onClick={() => navigate("/milk")}>
              🥛 Dairy Products
            </p>

            <p
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/chocolate")}
            >
              🍫 Chocolates
            </p>
          </div>

          {/* ================= QUICK LINKS ================= */}

          <div className="footer-box">
            <h3>Quick Links</h3>

            <p style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              🏠 Home
            </p>

            <p style={{ cursor: "pointer" }} onClick={() => navigate("/cart")}>
              🛒 Cart
            </p>

            <p style={{ cursor: "pointer" }} onClick={() => navigate("/order")}>
              📦 Orders
            </p>

            <p
              style={{ cursor: "pointer" }}
              onClick={() => handleExploreClick()}
            >
              ⭐ Popular Foods
            </p>
          </div>
        </div>

        {/* ================= COPYRIGHT ================= */}

        <div className="footer-bottom">
          &copy; 2026 FOODIEZONE • Designed By Akash Guduri
        </div>
      </footer>
    </div>
  );
}

export default Home;
