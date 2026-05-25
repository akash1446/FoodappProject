import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

/* ================= FOOD ITEMS DATA ================= */

const items = [
  {
    img: "/Images/VegItems/masla.jpg",
    name: "Masala Dosa",
  },

  {
    img: "/Images/NonVegItems/ChickenBiryani.jpg",
    name: "Chicken Biryani",
  },

  {
    img: "/Images/MilkItems/butter.jpg",
    name: "Butter",
  },

  {
    img: "/Images/Chocolate/diamond.jpg",
    name: "diamond",
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

  /* ================= ALERT ================= */

  const handleExploreClick = () => {
    Swal.fire({
      title: "🍔 Welcome To FoodieZone",

      text: "Explore Delicious Foods",

      icon: "success",

      confirmButtonText: "Explore Now",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowMenu(true);

        toast.success("Menu Opened Successfully 🍔");
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
          poster="/Images/VegItems/masla.jpg"
        >
          <source src="/Images/Videos/animation.mp4" type="video/mp4" />
        </video>

        {/* ================= OVERLAY ================= */}

        <div className="hero-overlay">
          {/* ================= NAVBAR ================= */}

          <nav className="top-nav">
            <div
              className="logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              FOODIE<span>ZONE</span>
            </div>

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
              Experience restaurant-quality meals delivered to your doorstep.
            </p>

            {/* ================= ANIMATION TEXT ================= */}

            <div className="food-text-animation">
              <span>🍔 Food is Tasty</span>

              <span>🥗 Healthy Food</span>

              <span>🍕 Fresh & Delicious</span>

              <span>🚀 Fast Delivery</span>
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
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        /* ================= VEG PAGE ================= */

                        if (item.name === "Masala Dosa") {
                          navigate("/veg");
                        } else if (item.name === "Chicken Biryani") {

                        /* ================= NON VEG PAGE ================= */
                          navigate("/nonveg");
                        } else if (item.name === "Butter") {

                        /* ================= MILK PAGE ================= */
                          navigate("/milk");
                        } else if (item.name === "diamond") {

                        /* ================= CHOCOLATE PAGE ================= */
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
          <div className="footer-box">
            <h2 className="footer-logo">
              FOODIE<span>ZONE</span>
            </h2>

            <p>Premium food delivery experience with freshness and taste.</p>
          </div>

          <div className="footer-box">
            <h3>Contact</h3>

            <p>👤 Akash Guduri</p>

            <p>📞 +91 8125561511</p>

            <p>📧 akashguduri2@gmail.com</p>

            <p>📍 Hyderabad, Telangana, India</p>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; 2026 FOODIEZONE • Designed By Akash Guduri
        </div>
      </footer>
    </div>
  );
}

export default Home;
