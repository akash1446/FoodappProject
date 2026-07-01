import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addToCart } from "./redux/cartSlice";
import { addToOrders } from "./redux/orderSlice";

// Notifications & Effects
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";
import confetti from "canvas-confetti";

// Styling
import "./NonVeg.css";

const NonVegItems = [
  {
    id: 25,
    name: "Chicken Curry Cut",
    price: 220,
    imageUrl: "Images/NonVegItems/chicken.jpg",
    description: "Fresh curry cut chicken pieces.",
  },
  {
    id: 26,
    name: "Mutton",
    price: 650,
    imageUrl: "Images/NonVegItems/Mutton.jpg",
    description: "Premium goat meat.",
  },
  {
    id: 27,
    name: "Fresh Fish",
    price: 180,
    imageUrl: "Images/NonVegItems/fish.jpg",
    description: "Rich protein fresh fish.",
  },
  {
    id: 28,
    name: "Prawns",
    price: 400,
    imageUrl: "Images/NonVegItems/prawns.jpg",
    description: "Fresh juicy prawns.",
  },
  {
    id: 29,
    name: "Eggs (12 pack)",
    price: 50,
    imageUrl: "Images/NonVegItems/Eggs.jpg",
    description: "Farm fresh eggs.",
  },
  {
    id: 30,
    name: "Chicken Wings",
    price: 150,
    imageUrl: "Images/NonVegItems/chicken-wings.jpg",
    description: "Spicy wings cut.",
  },
  {
    id: 31,
    name: "Chicken Breast",
    price: 120,
    imageUrl: "Images/NonVegItems/chickenbreast.jpg",
    description: "Lean protein chicken breast.",
  },
  {
    id: 32,
    name: "Chicken Legs",
    price: 150,
    imageUrl: "Images/NonVegItems/chicken-legs.jpg",
    description: "Juicy chicken legs.",
  },
  {
    id: 33,
    name: "Crab",
    price: 250,
    imageUrl: "Images/NonVegItems/crab.jpg",
    description: "Seafood crab fresh.",
  },
  {
    id: 34,
    name: "Turkey",
    price: 350,
    imageUrl: "Images/NonVegItems/turkey.jpg",
    description: "Premium turkey meat.",
  },
  {
    id: 35,
    name: "Chicken Biryani Cut",
    price: 200,
    imageUrl: "Images/NonVegItems/ChickenBiryani.jpg",
    description: "Perfect biryani chicken pieces.",
  },
  {
    id: 36,
    name: "Salmon Fish",
    price: 450,
    imageUrl: "Images/NonVegItems/salmon-fish.jpg",
    description: "Omega-3 rich salmon.",
  },
  {
    id: 37,
    name: "Tuna Fish",
    price: 150,
    imageUrl: "Images/NonVegItems/tuna-fish.jpg",
    description: "Healthy tuna fish.",
  },
  {
    id: 38,
    name: "Chicken Sausage",
    price: 200,
    imageUrl: "Images/NonVegItems/chicken-sausage.jpg",
    description: "Smoky chicken sausage.",
  },
  {
    id: 39,
    name: "Chicken Nuggets",
    price: 180,
    imageUrl: "Images/NonVegItems/nuggets.jpg",
    description: "Crispy nuggets.",
  },
  {
    id: 40,
    name: "Mutton Biryani Cut",
    price: 300,
    imageUrl: "Images/NonVegItems/muttonBiryani.jpg",
    description: "Soft mutton biryani pieces.",
  },
  {
    id: 41,
    name: "Squid",
    price: 300,
    imageUrl: "Images/NonVegItems/squid.jpg",
    description: "Fresh squid seafood.",
  },
  {
    id: 42,
    name: "Chicken Liver",
    price: 150,
    imageUrl: "Images/NonVegItems/liver.jpg",
    description: "Iron rich chicken liver.",
  },
  {
    id: 43,
    name: "Chicken Keema",
    price: 280,
    imageUrl: "Images/NonVegItems/keema.jpg",
    description: "Minced chicken meat.",
  },
  {
    id: 44,
    name: "Pork",
    price: 450,
    imageUrl: "Images/NonVegItems/pork.jpg",
    description: "Fresh pork meat.",
  },
];

function NonVeg() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  // =========================
  // PRICE FILTER SLIDER 💰
  // =========================
  const highestPrice = Math.max(...NonVegItems.map((item) => item.price));
  const [maxPrice, setMaxPrice] = useState(highestPrice);

  const itemsPerPage = 6;

  // =========================
  // ⭐ RATING (ADDED)
  // =========================
  const getRating = (id) => {
    const rating = Math.min(3 + (id % 3) + Math.random(), 5);
    return Math.round(rating);
  };

  const renderStars = (rating) => {
    return "★★★★★☆☆☆☆☆".slice(5 - rating, 10 - rating);
  };

  // =========================
  // CONFETTI EFFECT
  // =========================
  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#e74c3c", "#f1c40f", "#ffffff"],
    });
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = (item) => {
    Swal.fire({
      title: "Add to Cart?",
      text: `Add ${item.name} for ₹${item.price}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#95a5a6",
      confirmButtonText: "Yes, add it!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(addToCart(item));
        dispatch(addToOrders(item));

        fireConfetti();

        toast.success(`🍗 ${item.name} added!`);

        Swal.fire({
          title: "Added!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    });
  };

  // =========================
  // FILTER BY PRICE
  // =========================
  const filteredItems = NonVegItems.filter((item) => item.price <= maxPrice);

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (n) => {
    setCurrentPage(n);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // PRICE CHANGE
  // =========================
  const handlePriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
    setCurrentPage(1); // reset to page 1 whenever the filter changes
  };

  return (
    <div className="store-wrapper">
      <ToastContainer position="top-right" autoClose={1500} theme="colored" />

      {/* VIDEO */}
      <video autoPlay muted loop playsInline className="background-video">
        <source src="Images/Videos/animation.mp4" type="video/mp4" />
      </video>

      <div className="video-overlay"></div>

      {/* HEADER */}
      <div className="header-section">
        <h2>🍗 Premium Non-Veg</h2>
      </div>

      {/* PRICE FILTER SLIDER */}
      <div className="price-filter">
        <p className="price-filter-label">Max Price: ₹{maxPrice}</p>
        <input
          type="range"
          min="0"
          max={highestPrice}
          step="10"
          value={maxPrice}
          onChange={handlePriceChange}
          className="price-slider"
        />
      </div>

      {/* GRID */}
      <div className="grid-container">
        {currentItems.map((item) => (
          <div key={item.id} className="grid-card">
            <div className="img-box">
              <img src={item.imageUrl} alt={item.name} />
            </div>

            <div className="card-info">
              <h3>{item.name}</h3>

              {/* ⭐ STAR RATING (ONE LINE) */}
              <p className="rating">{renderStars(getRating(item.id))}</p>

              <p className="price">₹{item.price}</p>
              <p className="desc">{item.description}</p>

              <button
                className="cart-btn"
                onClick={() => handleAddToCart(item)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}

        {currentItems.length === 0 && (
          <p className="no-results">No items match this price range.</p>
        )}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            className={currentPage === n ? "active" : ""}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </button>
        ))}

        <button
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default NonVeg;
